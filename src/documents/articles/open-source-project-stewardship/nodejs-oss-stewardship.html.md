---
layout: post
title: NodeJs Open Source Project Stewardship
date: 2015-03-31 20:05
comments: true
tags: oss, software, steward, maintainer, lint, test, coverage, nodejs, github, travis, coveralls
---

## Linting in NodeJs

Run the following commands in the terminal to
install dependencies for JsHint,
and to create the various configuration files required.

```bash
npm install --save-dev jshint jshint-stylish
touch .gitignore .jshintrc .jshintignore .travis.yml
```

In **package.json**, add a `lint` command to the `scripts` section.

```javascript
    "lint": "./node_modules/jshint/bin/jshint --verbose --reporter ./node_modules/jshint-stylish ."
```

In **.travis.yml**, we set it up to build a NodeJs application,
and then run `npm run lint`:

```yaml
language: node_js
node_js:
  - "0.10"
  - "0.11"
  - "0.12"
  - "iojs"
  - "iojs-v1.0.4"
script:
  - npm run lint
```

The lint task above runs JsHint,
which will look for a **.jshintrc** file, and a **.jshintignore** file,
if present.

Use [this sample **.jshintrc** file](https://github.com/jshint/jshint/blob/master/examples/.jshintrc)
as a starting point,
and modify it to change that value of `"node"`,
under the `Environments` section, to `true`.

Use this **.jshintignore** file to prevent JsHint from linting your dependencies.

```text
/node_modules
```

In **.gitignore**, do the same thing,
this time, to ensure that `node_modules` do not get checked in.

```text
/node_modules
```

Note that the `node_modules` directory is ignored by default,
but this is just the starting point,
and will be building up from here.

Now run the lint command in the terminal:

```bash
npm run lint
```

You should see the expected output -
either no errors when there are none;
or errors output to the console when they are present.
Also check that when there are no errors,
the process exit code should be zero;
and when there are errors,
the process exit code should be non-zero.
In a bash terminal, you can do this using the following command:

```bash
echo $?
```

At this point, commit and push these changes to the Github remote,
and Travis should automatically queue a build for it.
The intent is for the build to fail if there are any JsHint errors.

Verify that this is the case by committing something with an innocuous Javascript
error, such as an extraneous semicolon character (`;`),
just to see Travis fail the build,
and then commit again without the error,
to fix the build.

That is all that we need to do,
to make a project use continuous integration,
and have linting.

## Testing in NodeJs

In the terminal, run the following commands to install the test runner, `jasmine-node`,
and set up the directory for the tests:

```bash
npm install --save-dev jasmine-node
touch .npmignore
mkdir test
```

Add the following `test` command to **package.json**,
to execute tests using the `jasmine-node` test runner.

```javascript
    "test": "node ./node_modules/jasmine-node/bin/jasmine-node test"
```

We edit **.npmignore** to be the same as **.gitignore**,
except that we exclude the folder containing the tests.
Other projects depending on this project should not have to run its tests,
only this project should need to run its own tests.

```text
/node_modules
/.travis.yml
/test
```

Unlike linting,
which works out of the box using only configuration files,
testing needs a lot of additional work to be done:
Writing the tests.

Unfortunately, writing tests is out of the scope of this article
Refer to the following documentation:

- [jasmine](http://jasmine.github.io/2.2/introduction.html)
- [jasmine-node](https://github.com/mhevery/jasmine-node)

Now, once you have written some tests,
place the test files into the `tests` directory,
and you should be able to run `npm run test`.

You should see the test results.
As with linting,
introduce a bug in your source code that is intended to fail the tests,
and run the tests again, to make sure a failure does indeed get captured.
Also test that the process exits with the expected exit codes.

After verifying these, it is time to add these tests to Travis.
Simply add `npm run test` to **.travis.yml**, like so:

```yaml
language: node_js
node_js:
  - "0.10"
  - "0.11"
  - "0.12"
  - "iojs"
  - "iojs-v1.0.4"
script:
  - npm run lint
  - npm run test
```

As before, commit and push your changes,
with and without intentional test failures,
to check that Travis fails the continuous build,
and then passes it again.

Pat yourself on the back,
because adding tests is the hardest task in this process.
The remainder are relatively easy to do.

## Coverage in NodeJs

In the terminal, install `istanbul`,
which is the code coverage tool that we will be using:

```bash
npm install --save-dev istanbul
```

Now, add a `cover` task to the `scripts` section in **package.json**:

```javascript
    "cover": "node ./node_modules/istanbul/lib/cli cover ./node_modules/jasmine-node/bin/jasmine-node test"
```

The `cover` command is a little more complex than the `lint` command
and the `test` command.
Here, we are running the `istanbul` tool,
and passing it in the path of the script that runs `jasmine-node`
and all of its parameters.
`istanbul` is smart enough to augment `jasmine-node`'s test runner,
for its code coverage purposes,
without `jasmine-node` even knowing what is happening to it.
Think of `istanbul` as the test runner runner.

`istanbul`, like any other code coverage tool,
parses the Javascript code being tested by the test runner,
and "instruments" it with its own code that hooks into various counters used to
keep track of sections of code that have been executed.
This is why `istanbul` needs to run `jasmine-node`.

To test that it works, run `npm run cover`.
You should see the same output as there was previously when running `npm run test`,
but then followed by some output that shows you test coverage,
which should look similar to this.

```text
=============================================================================
Writing coverage object [/code/plugin-registry/coverage/coverage.json]
Writing coverage reports at [/code/plugin-registry/coverage]
=============================================================================

=============================== Coverage summary ===============================
Statements   : 100% ( 97/97 ), 2 ignored
Branches     : 100% ( 50/50 ), 2 ignored
Functions    : 100% ( 13/13 )
Lines        : 100% ( 97/97 )
================================================================================
```

The output merely shows you the headline statistics,
and the detailed output lies in the reports,
which can be found in the `coverage` folder.

To see the HTML report, run this command (any browser of your choice will do):

```bash
firefox coverage/lcov-report/index.html &
```

This is the human-readable report.

There is another report however,
which is output to `coverage/lcov.info`,
and this is the file which other code coverage tools,
such as Coveralls, will need to analyse.

To verify that the coverage runs correctly,
simply add an empty function that does not do anything and check to see if the coverage percentage decreases from its previous count.
Next enter many of such useless functions,
to the point that `istanbul` fails the build.
Then get rid of all the excess functions,
and run the command again to verify that that `istanbul` passes the build once more,
and that the code coverage percentages go right back up.
While doing this, ensure that the process exit codes match accordingly.

Let us install `coveralls` by entering the following command in the terminal:

```bash
npm install --save-dev coveralls
touch .coveralls.yml
```

Add the Coveralls repository token,
which you can get from the Coveralls website, to **.coveralls.yml**:

```text
repo_token: COVERALLS_REPO_TOKEN
```

Next, we add a `coveralls` task to the `scripts` section in **package.json**:

```javascript
    "coveralls": "npm run cover && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js"
```

Coveralls does not actually do its own builds,
so Travis has to do the build,
and selected coverage related artefacts from the build need to be sent to Coveralls.
This is what the `coveralls` module is responsible for:
reading in a coverage report, in `lcov` format,
and communicating that report into Coveralls.
The `coveralls` command which we just defined runs the `cover` command,
and then pipes the `lcov` file output by `istanbul` to `coveralls`.

We are now almost ready for Coveralls,
but first we need to tell Travis to run the `coveralls` command,
instead of `test` as it was doing previously.
It is not necessary to do both `test` and `coveralls`,
because that will mean that `test` runs twice!

Edit **.travis.yml** to add `npm run coveralls`:

```yaml
language: node_js
node_js:
  - "0.10"
  - "0.11"
  - "0.12"
  - "iojs"
  - "iojs-v1.0.4"
script:
  - npm run lint
  - npm run coveralls
```

Lastly, we have to do some house keeping,
ensuring that the coverage related files are ignored.

Edit **.gitignore** to ignore `coverage` output and `.coveralls.yml`.
The Coveralls repository ID is supposed to be kept private.

```text
/node_modules
/coverage
/.coveralls.yml
```

Edit **.npmignore** to do the same.

```text
/node_modules
/coverage
/.travis.yml
/.coveralls.yml
/test
```

Edit **.jshintignore** to do the same too.

```text
/node_modules
/coverage
/test
```

Now, when you commit and push these changes,
you should see Travis build the project.
In the mean time, you should see Coveralls idle.
Once the Travis build succeeds,
the Coveralls build should trigger,
and you should see a code coverage report.

## Badges for NodeJs

Add the following to **README.md**,
preferably immediately after the title:

```markdown
[![NPM](https://nodei.co/npm/MODULE_NAME.png)](https://github.com/GITHUB_NAME/MODULE_NAME/)

[![Build Status](https://travis-ci.org/GITHUB_NAME/MODULE_NAME.svg?branch=master)](https://travis-ci.org/GITHUB_NAME/MODULE_NAME)
[![Coverage Status](https://coveralls.io/repos/GITHUB_NAME/MODULE_NAME/badge.svg?branch=master)](https://coveralls.io/r/GITHUB_NAME/MODULE_NAME?branch=master)
```

Which should render like this:

[![NPM](https://nodei.co/npm/plugin-registry.png)](https://github.com/bguiz/plugin-registry/)

[![Build Status](https://travis-ci.org/bguiz/plugin-registry.svg?branch=master)](https://travis-ci.org/bguiz/plugin-registry)
[![Coverage Status](https://coveralls.io/repos/bguiz/plugin-registry/badge.svg?branch=master)](https://coveralls.io/r/bguiz/plugin-registry?branch=master)

The main difference for NodeJs is that there is an additional badge.
The nodei.co service generates nice badges using information from
the npm registry.

## NodeJs cheat sheet

An assembly all the steps above in one spot.

In the terminal:

```bash
npm install --save-dev jshint jshint-stylish jasmine-node istanbul coveralls
touch .gitignore .npmignore .jshintrc .jshintignore .travis.yml .coveralls.yml
mkdir test
```

**package.json**

```javascript
{
  "scripts": {
    "test": "node ./node_modules/jasmine-node/bin/jasmine-node test",
    "lint": "./node_modules/jshint/bin/jshint --verbose --reporter ./node_modules/jshint-stylish .",
    "cover": "node ./node_modules/istanbul/lib/cli cover ./node_modules/jasmine-node/bin/jasmine-node test",
    "coveralls": "npm run cover && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js"
  }
}
```

**README.md**

```markdown
[![NPM](https://nodei.co/npm/MODULE_NAME.png)](https://github.com/GITHUB_NAME/MODULE_NAME/)

[![Build Status](https://travis-ci.org/GITHUB_NAME/MODULE_NAME.svg?branch=master)](https://travis-ci.org/GITHUB_NAME/MODULE_NAME)
[![Coverage Status](https://coveralls.io/repos/GITHUB_NAME/MODULE_NAME/badge.svg?branch=master)](https://coveralls.io/r/GITHUB_NAME/MODULE_NAME?branch=master)

...

## Contributing

This repository uses the
[**git flow** ](http://nvie.com/posts/a-successful-git-branching-model/)
branching strategy.
If you wish to contribute, please branch from the **develop** branch -
pull requests will only be requested if they request merging into the develop branch.
```

**.gitignore**

```text
/node_modules
/coverage
/.coveralls.yml
```

**.npmignore**

```text
/node_modules
/coverage
/.travis.yml
/.coveralls.yml
/test
```

**.jshintrc**

//TODO

**.jshintignore**

```text
/node_modules
/coverage
/test
```

**.travis.yml**

```yaml
language: node_js
node_js:
  - "0.10"
  - "0.11"
  - "0.12"
  - "iojs"
  - "iojs-v1.0.4"
script:
  - npm run lint
  - npm run coveralls
```

**.coveralls.yml**

```text
repo_token: COVERALLS_REPO_TOKEN
```

Then:

- Write the tests in the `tests` folder
- For each of the commands `lint`, `test`, `cover`:
   - Run them and inspect the expected output and the exit codes,
   - For both the pass and fail scenarios
- Commit and push
  - Inspect Travis build output
  - Inspect Coveralls report
- Publicise!

## Fin
