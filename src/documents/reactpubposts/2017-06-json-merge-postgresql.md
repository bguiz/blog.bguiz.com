---
title: JSON merge in PostgreSql
date: 2017-06-19 21:11
tags: postgres, sql, json, document
image: /images/posts/json-merge-postgresql.png
---

PostgreSql is a relational database
and therefore adheres to [ACID principles](https://en.wikipedia.org/wiki/ACID) -
atomicity, consistency, isolation, durability -
and supports server-side joins between multiple entities (tables).
Interestingly, in addition to this,
it also supports a JSON data type natively,
and provides a [rich set of functions and operators](https://www.postgresql.org/docs/9.6/static/functions-json.html)
to work with its `json` and `jsonb` types.

As such, it is actually feasible to use PostgreSql as a
[document database](https://en.wikipedia.org/wiki/Document-oriented_database),
one of the main types of [NoSql databases](https://en.wikipedia.org/wiki/NoSQL).
One pattern for doing this is to create tables with just two columns:

- an `id` column that is the (indexed) primary key for the document, and
- a `body` column that is the document, and is of type `jsonb`

However, operations on such documents can be quite tricky to pull off,
in the context of relational database queries (SQL).
One of these is that most operations are *upserts* (update-insert),
and these operations are not very common in relational databases,
which subscribe to the CRUD - create, read, update, delete - paradigm
*Upsert* can be thought of as a two-in-combination of the create and update operations.
I have previously written about
[*upserts* in PostgreSql](http://blog.bguiz.com/2017/postgresql-upsert-knex#post-content-location-document-pattern-postgres).

Another piece of the puzzle is working out
what the updated copy of a document should be.

Say you have a document that looks like this:

```javascript
{
	post: {
		title: 'JSON merge in PostgreSql',
		stats: {
			name: 'Brendan',
		},
	},
}
```

... and we wish to change it to become this:

```javascript
{
	post: {
		title: 'JSON merge in PostgreSql',
		author: {
			name: 'Brendan Graetz',
		},
	},
}
```

How should we actually go about making this update to the document?

## Application server 💻 modifies document: ❌ approach

The first approach which comes to mind
might be to use your application server to modifies the document.
The steps might look something like this:

- Server reads document from database
- Server modifies the document
- Server writes the modified document to the database

This would work fine if there was only ever one user using the system at a time,
and only one instance of this application server running.
However, in reality, no system has the luxury of running with such a simplistic set up.
The problems with the above:

- There are 2 round trips between the server
- Disk I/O needs to happen twice
- When multiple operations occur on the same document concurrently, the last one overwrites the first one

The first two are somewhat forgive-able,
as they are potential performance problems.
However, the last one means that you have potentially wrong data being written to your database,
due to some sort of race condition occurring.
Recall that right at the beginning, the ACID principles of relational databases were mentioned.
Now, just because we are working with documents,
we should no need to sacrifice these principles.

## Database 💾 modifies document: ✔️ approach

All of the 3 problems identified above are rooted in making the application server
perform the modification of the document.
Thankfully PostgreSql has a sufficiently full featured set of operators that allows one to update JSON documents,
plus the ability to define and execute [functions](https://www.postgresql.org/docs/9.6/static/sql-createfunction.html)
on the database itself.
Since these functions run within the database,
the database manages the context of its execution,
and therefore is able to continue providing its ACID principle guarantees.

In addition to fixing the problems identified earlier,
it also has a few other benefits:

- More efficient by being compiled ahead of time
- As functions are defined in a central place,
  this lessens the chance of errors stemming from
  different statements in different parts of the code base.

Next we shall take a look at defining such a function,
which can be used to deep merge one JSON document into another.

## Recursive merge

We start by defining a PostgreSql function.
It is named `jsonb_merge_recurse`, and takes in two parameters.
Both of the parameters are of type
[`jsonb`](https://www.postgresql.org/docs/9.6/static/datatype-json.html),
where the first one is the "current" one,
and the second one is the "delta".

We set the language to `sql`,
as it is possible to do do this purely using PostgreSql
[JSON functions](https://www.postgresql.org/docs/9.6/static/functions-json.html).
We have the option of using a user-defined procedural language -
for example Javascript via [PLv8](https://github.com/plv8/plv8/blob/master/doc/plv8.md) -
if we wanted to, however that is an exercise for another time!

```sql
create or replace function jsonb_merge_recurse(a jsonb, b jsonb)
returns jsonb language sql as $$
		/* ... */
$$;
```

Between the pair of `$$` delimiting the start and end of the function,
since we are using the `sql` language,
we use a `select` statement.
The result obtained from this select statement will be the return value of this function.
The `from` and `full join` clauses of the select statement here
have the effect of iterating through the outermost level of keys of each JSON parameter,
and joining them when these keys are the same (`on keya = keyb`).
The values corresponding to these keys are extracted as well (`jsonb_each()`)

```sql
select
	/* ... */
from jsonb_each(a) e1(keya, vala)
full join jsonb_each(b) e2(keyb, valb) on keya = keyb
```

Here `coalesce()` is used to use `keya` when present, otherwise `keyb` is used,
and then `jsonb_object_agg` is used to create a `jsonb` object
whose key is either `keya` or `keyb` (as obtained from `coalesce()`),
and whose value comes from the result of the `case` statement.

PostgreSql documentation for these functions:

- [`coalesce()`](https://www.postgresql.org/docs/9.6/static/functions-conditional.html#FUNCTIONS-COALESCE-NVL-IFNULL) returns the first of its arguments that is not `null`, or `null` when all arguments are `null`.
- [`jsonb_object_agg()`](https://www.postgresql.org/docs/9.6/static/functions-aggregate.html#FUNCTIONS-AGGREGATE-TABLE) aggregates name - value pairs as a JSON object

Since this function is recursive,
we will also define the recursion case.
This will occur when both values are themselves objects,
and therefore we need to drill down one level deeper.

```sql
jsonb_object_agg(
	coalesce(keya, keyb),
	case
		/* ... */
		else jsonb_merge_recurse(vala, valb)
	end
)
```

Next we have the non-recursive cases -
when either value is `null`, we use the other one.
Otherwise, when either value is *not* an object,
we use the second  value -
as the intent is for the first values to be
overridden by the second values.

```sql
when vala isnull then valb
when valb isnull then vala
when (jsonb_typeof(vala) <> 'object' or jsonb_typeof(valb) <> 'object') then valb
```

The `case` statement can be summarised with the following table:


| condition                              | vala                | valb                | result    |
|----------------------------------------|---------------------|---------------------|-----------|
| `vala` is null                         | null                | primitive or object | `valb`    |
| `valb` is null                         | primitive or object | null                | `vala`    |
| either `vala` or `valb` are primitives | primitive or object | primitive or object | `valb`    |
| both `vala` and `valb` are objects     | object              | object              | recursion |


Putting it all together, we have the full function:

```sql
create or replace function jsonb_merge_recurse(a jsonb, b jsonb)
returns jsonb language sql as $$
	select
		jsonb_object_agg(
			coalesce(keya, keyb),
			case
				when vala isnull then valb
				when valb isnull then vala
				when (jsonb_typeof(vala) <> 'object' or jsonb_typeof(valb) <> 'object') then valb
				else jsonb_merge_recurse(vala, valb)
			end
		)
	from jsonb_each(a) e1(keya, vala)
	full join jsonb_each(b) e2(keyb, valb) on keya = keyb
$$;
```

## Limitations

Note that this will allow deep merging of any object into any other object,
so long as we treat arrays as primitives.
Of course, in some cases, we would want to do some special things with from arrays,
for example if the first value is an array, and the second is a primitive,
we could append the primitive to the end of the array.
However these cases can be quite varied,
and these use cases would be better suited to having separate functions
specific to array manipulation.
