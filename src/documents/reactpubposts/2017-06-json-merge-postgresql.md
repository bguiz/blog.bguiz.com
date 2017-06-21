---
title: JSON merge in PostgreSql
date: 2017-06-19 21:11
tags: postgres, sql, json, document
image: /images/posts/json-merge-postgresql.png
---

PostgreSql is a relational database
which adheres to [ACID principles](https://en.wikipedia.org/wiki/ACID) -
atomicity, consistency, isolation, durability -
and supports server-side joins between multiple entities (tables).
Interestingly, in addition to this,
it also supports a JSON data type natively,
and provides a [rich set of functions and operators](https://www.postgresql.org/docs/9.6/static/functions-json.html)
to work with its `json` and `jsonb` types.

The support for relational and document database paradigms is a potent combination,
as it is feasible to use PostgreSql as a
[document database](https://en.wikipedia.org/wiki/Document-oriented_database) -
one of the main categories of [NoSql databases](https://en.wikipedia.org/wiki/NoSQL).
A pattern for doing this is to create tables with just two columns:

- an `id` column that is the (indexed) primary key for the document, and
- a `body` column that is the document, and is of type `jsonb`

However, operations on such documents can be quite tricky
in the context of relational database queries (SQL).
One of these is that most operations are *upserts* (update-insert),
and these operations are not very common in relational databases,
which subscribe to the CRUD paradigm - create, read, update, delete.
*Upsert* is a two-in-one combination of both create and update operations.
I have previously written about
[*upserts* in PostgreSql](http://blog.bguiz.com/2017/postgresql-upsert-knex#post-content-location-document-pattern-postgres),
so check that out for a detailed example.

## Modifying a document

Another piece of the puzzle is working out
what the updated copy of a document should be.

Say you have a document that looks like this:

```javascript
const original = {
	id: 123,
	body: {
		title: 'JSON merge in PostgreSql',
		stats: {
			name: 'Brendan',
		},
	},
};
```

... and specify a delta like this:

```javascript
const delta = {
	body: {
		author: {
			name: 'Brendan Graetz',
		},
	},
};
```

... and we wish to change it to become this:

```javascript
const modified = {
	id: 123,
	body: {
		title: 'JSON merge in PostgreSql',
		author: {
			name: 'Brendan Graetz',
		},
	},
};
```

If you have used a document database before,
you might recognise this pattern immediately.
For example, in MongoDb, you could accomplish this using
[`collection.update()`](https://docs.mongodb.com/manual/reference/method/db.collection.update/):

```javascript
db.collection.update({ _id: original.id }, delta, { upsert: true });
```

When using PostgreSql, in a table with an `id` primary key column,
and a `body` document column,
how would we go about accomplishing the same thing?

## Application server 💻 modifies document: ❌ approach

The first approach which comes to mind
might be to use your application server to modify the document.
The steps might look something like this:

- Server reads document from database
- Server modifies the document
- Server writes the modified document to the database

This would work fine if there was only ever one user using the system at a time,
and only one instance of this application server running.
However, in reality, no system has the luxury of running under such assumptions.
The problems with the above approach include:

- There are 2 round trips between the server
- Disk I/O needs to happen twice
- When multiple operations occur on the same document concurrently, the last one overwrites the first one

The first two are somewhat forgivable,
as they are potential performance problems.
However, the last one means that you have potentially wrong data being written to your database,
due to some sort of race condition occurring.
This is somewhat similar to the
[cliched bank transaction processing scenarios](https://en.wikipedia.org/wiki/Transaction_processing#Description).
This description of
[lost update scenarios](https://vladmihalcea.com/2014/09/14/a-beginners-guide-to-database-locking-and-the-lost-update-phenomena/)
is a rather detailed guide to this particular problem.
Recall that right at the beginning, the ACID principles of relational databases were mentioned.
Let us next attempt to tackle this, *while* still adhering to ACID principles -
after all, just because we are working with documents, we should not need to sacrifice these principles.

## Database 💾 modifies document: ✔️ approach

All of the problems identified above are rooted in having the application server
perform the modification of the document.
Thankfully PostgreSql has a sufficiently full-featured set of operators that allows one to update JSON documents,
plus the ability to define and execute [functions](https://www.postgresql.org/docs/9.6/static/sql-createfunction.html)
on the database itself.
Since these functions run within the database,
the database manages the context of its execution.
Therefore it is able to continue providing its ACID principle guarantees.

In addition to fixing the problems identified earlier,
it also has a few other benefits:

- More efficient by being compiled ahead of time
- As functions are defined in a central place,
  this lessens the chance of errors stemming from
  varied statements in different parts of the application server.

Next, we shall take a look at defining such a function
that is used to deep merge one JSON document into another.

## Recursive merge

We start by defining a PostgreSql function.
It is named `jsonb_merge_recurse`, and takes in two parameters.
Both of the parameters are of type
[`jsonb`](https://www.postgresql.org/docs/9.6/static/datatype-json.html),
where the left one is the `original` document,
and the right one is the `delta` document,
and its return value is the `modified` document.

We set the language to `sql`,
as it is possible to do do this purely using PostgreSql
[JSON functions](https://www.postgresql.org/docs/9.6/static/functions-json.html).
We have the option of using a user-defined procedural language -
for example, Javascript via [PLv8](https://github.com/plv8/plv8/blob/master/doc/plv8.md) -
if we wanted to.
However, that is an exercise for another time!

```sql
create or replace function jsonb_merge_recurse(orig jsonb, delta jsonb)
returns jsonb language sql as $$
	/* ... */
$$;
```

Between the pair of `$$` delimiting the start and end of the function -
as we are using the `sql` language -
we use a `select` statement.
The result obtained from this select statement will be the return value of this function.
The `from` and `full join` clauses of the select statement here
have the effect of iterating through the outermost level of keys of the JSON object,
and joining on them when these keys are the same - `on keyOrig = keyDelta`.
The values corresponding to these keys are extracted as well - `jsonb_each()`.

```sql
select
	/* ... */
from jsonb_each(orig) e1(keyOrig, valOrig)
full join jsonb_each(delta) e2(keyDelta, valDelta) on keyOrig = keyDelta
```

Next, we use the following functions:

- [`coalesce()`](https://www.postgresql.org/docs/9.6/static/functions-conditional.html#FUNCTIONS-COALESCE-NVL-IFNULL)
  returns the *first* of its arguments that is not `null`, or `null` when all arguments are `null`.
- [`jsonb_object_agg()`](https://www.postgresql.org/docs/9.6/static/functions-aggregate.html#FUNCTIONS-AGGREGATE-TABLE)
  aggregates key-value pairs as a JSON object

Here `coalesce()` is used to use `keyOrig` when present, otherwise `keyDelta` is used,
and then `jsonb_object_agg` is used to create a `jsonb` object
whose key is either `keyOrig` or `keyDelta` (as obtained from `coalesce()`),
and whose value comes from the result of the `case` statement.

Since this function needs to employ recursion,
we will also define the recursive case.
This will occur when both values are themselves objects,
and therefore we need to drill down one level deeper.

```sql
jsonb_object_agg(
	coalesce(keyOrig, keyDelta),
	case
		/* ... */
		else jsonb_merge_recurse(valOrig, valDelta)
	end
)
```

Next, we have the non-recursive cases.
When either value is `null`, we use the other one.
Otherwise, when either value is *not* an object,
we use the delta value -
as the intent is for the original values to be
overridden by the delta values.

```sql
when valOrig isnull then valDelta
when valDelta isnull then valOrig
when (jsonb_typeof(valOrig) <> 'object' or jsonb_typeof(valDelta) <> 'object') then valDelta
```

The `case` statement can be summarised with the following table:


| condition                                     | valOrig             | valDelta            | result     |
|-----------------------------------------------|---------------------|---------------------|------------|
| `valOrig` is null                             | null                | primitive or object | `valDelta` |
| `valDelta` is null                            | primitive or object | null                | `valOrig`  |
| either `valOrig` or `valDelta` are primitives | primitive or object | primitive or object | `valDelta` |
| both `valOrig` and `valDelta` are objects     | object              | object              | (recur)    |


Assembling the above snippets together,
we have the full function:

```sql
create or replace function jsonb_merge_recurse(orig jsonb, delta jsonb)
returns jsonb language sql as $$
	select
		jsonb_object_agg(
			coalesce(keyOrig, keyDelta),
			case
				when valOrig isnull then valDelta
				when valDelta isnull then valOrig
				when (jsonb_typeof(valOrig) <> 'object' or jsonb_typeof(valDelta) <> 'object') then valDelta
				else jsonb_merge_recurse(valOrig, valDelta)
			end
		)
	from jsonb_each(orig) e1(keyOrig, valOrig)
	full join jsonb_each(delta) e2(keyDelta, valDelta) on keyOrig = keyDelta
$$;
```

## Limitations

Note that this will allow deep merging of any object into any other object,
so long as we treat arrays as primitives.
Of course, in some cases, we would want to do some special things with arrays.
For example if the first value is an array, and the second is a primitive,
we could append the primitive to the end of the array.
However these cases can be quite varied,
and these use cases would be better suited to having separate functions
specific to array manipulation.
