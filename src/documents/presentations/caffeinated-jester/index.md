![](img/qr-code-caffeinated-jester-presentation.png)

[Brendan Graetz](http://bguiz.com)

[@bguiz](https://twitter.com/bguiz)

=SLIDE=

# The Caffeinated Jester

## Migrating from Mocha to Jest

[Brendan Graetz](http://bguiz.com)

[@bguiz](https://twitter.com/bguiz)

=SLIDE=

![](img/caffeinated-jester.png)

[Brendan Graetz](http://bguiz.com)

[@bguiz](https://twitter.com/bguiz)

=SLIDE=

# Things

- Library vs framework
- Automated tools
- Gotchas
- Mocks
- Time warps
- Watch
- Config in files
- Snapshots
- Resources
- Is Jest worth it?

=SLIDE=

# Library vs framework

=SLIDE=

# Automated tools

- Automated: Jest Codemods
- Semi-automated:  `sed`

=SLIDE=

## Automated

```bash
yarn global add jest-codemods
```

=SLIDE=

## Semi-automated

- Use `sed` or some other regex replacement tool
- [Gist](https://gist.github.com/bguiz/0f19d0e56f32ee32ddec557022104585)
- Requires a manual step to "clean up" after

=SLIDE=

# Gotchas

- File level sandbox
- `done(err)`
- `stdout`/ `stderr` truncation

=SLIDE=

## Serial vs parallel

- Mocha: Serial by default
- Jest: Parallel by default

=SLIDE=

## File level sandbox

- In mocha, side effects from one test can run over into another
- In Jest, all in-memory effects are undone
  - Any persisted effects (e.g. DB) should be reversed

=SLIDE=

## `done(err)`

- In Mocha, if the first parameter is set on `done()`, test fails
- In Jest, this does not matter

=SLIDE=

## `stdout`/ `stderr` truncation

- All test output and application output are proxied by Jest
- However, the output from Jest is truncated by length per test
- Minimise output!

=SLIDE=

# Mocks

- Basic mocks
- Mocking Chained APIs
- Spies

=SLIDE=

## Basic mocks (1)

```javascript
myModule.foo = jest.fn().mockImplementation(myTestImpl);
```

=SLIDE=

## Basic mocks (2)

```javascript
expect(myModule.foo.calls[0]).toEqual(['bar', 123]);
```

=SLIDE=

## Mocking Chained APIs

- E.g. `express` response: `res.status(200).json({ foo: 'bar' });`
- Achieve this by splitting `jest.fn()` from `.mockImplementation(myTestImpl)`
- [Detailed explainer](http://blog.bguiz.com/2017/mocking-chained-apis-jest)

=SLIDE=

## Spies

- Jest spies are limited: Cannot access `.mock.calls` array as you can with mocks
- Use mocks instead of spies, for the moment

=SLIDE=

# Time warps

- Time manipulation basics
- `Date`
- Macro tasks & micro tasks

=SLIDE=

## Time manipulation basics

- When the application under test uses the system time as input
  - (Quite common)
- Need to fake the time in order to get repeatable tests
- In JS, also involves the event loop stack

=SLIDE=

## `Date`

- Jest does *not* provide a means to mock `Date`
- In mocha, the default approach would be to use `lolex` from `sinon`
- H/w `lolex` doesn't play well with Jest
- Used `mockdate` instead

=SLIDE=

## Macro tasks & micro tasks

- Set up:
  - `jest.useFakeTimers();`
- Macro tasks: `setImmediate()`, `setTimeout()`, `setInterval()`, etc.
  - `jest.runTimersToTime(ms)```
- Micro tasks: `new Promise()`, `process.nextTick()`
  - `jest.runAllTicks();`

=SLIDE=

# Watch

- Filter to changes in `git diff`
- Filter to a pattern
- With coverage

=SLIDE=

## Filter to changes in `git diff`

- Run `jest --watch`
- This is the (very handy) default behaviour
- Rerun: Save either a test or application file

=SLIDE=

## Filter to a pattern

- While in `--watch` mode, hit `p` (for pattern)
- Type a regular expression to match a test file name
- Only these test files will run

=SLIDE=

## With coverage

- Run `jest --watch --coverage`
- Generates code coverage reports via `istanbul`
- Out of the box - no config necessary!

=SLIDE=

# Configuring Jest

- CLI config
- File based config

=SLIDE=

## CLI config

- Use CLI flags such as `--watch`
- Once you figure out the right flags, put them in `package.json`

=SLIDE=

## File based config

- Use the `--config` CLI flag
- Create a JSON file within the project
- Can be quite powerful for running tests in different environments

=SLIDE=

# Snapshots

- Basic snapshots
- Robust Snapshots
- DRY vs DAMP
- Write your own snapshot serialiser

=SLIDE=

## Basic snapshots (1)

- A mechanism in which the test runner creates expectations automatically
- Achieved via a serialiser
- Collections of these generated mechanisms are saved to disk
- When a test is run for which a snapshot already exists:
  - When update flagged, overwrite expectations with actual
  - Otherwise, diff actual against expectations

=SLIDE=

## Basic snapshots (2)

- `expect(result).toMatchSnapshot();`
- When running `foo.test.js`
- Snapshots saved into `__snapshots__/foo.test.js.snap`
- In `--watch` mode, hit `u` to update filtered set of snapshots
- In a regular test mode, use `--update` to update all snapshots

=SLIDE=

## Robust Snapshots

- Don't use a result object directly in a snapshot
- Instead transform the result object with a filtered set of properties
- Also, add any additional meta-data to the result object
- Think: "What would I want to `console.log()` here when debugging?"

=SLIDE=

## DRY vs DAMP

- General software engineering principle: DRY
- "Don't repeat yourself" is valid in application code
- H/w in test code, DAMP is considered best practice
  - Test cases should be fully descriptive of themselves
- Snapshots provide a means to remove some of the repetition in test cases
  - DRY -> DAMP -> DRY!!

=SLIDE=

## Write your own snapshot serialiser

- You only need to [implement 2 functions](https://github.com/bguiz/jest-object/blob/develop/serialise-js-object.js)
  - Unless you're doing something very fancy, it is straightforward

```json
"snapshotSerializers": [
  "jest-object/serialise-js-object.js"
]
```

=SLIDE=

# Resources

- [Official docs](https://facebook.github.io/jest/docs/getting-started.html)
- [Cheat sheet](https://dmitriiabramov.github.io/jest-cheatsheet/index.html)
- [Self promo](http://blog.bguiz.com/tags/jest)

=SLIDE=

#  Is Jest worth it?

- Starting new projects
  - YES!
- Existing simple projects
  - YES!
- Existing complex projects
  - Maybe

=SLIDE=

# Fin

- Very few fancy things
- A lot of getting the basic stuff right

=SLIDE=

# Questions?

![](img/qr-code-caffeinated-jester-presentation.png)

[Brendan Graetz](http://bguiz.com)

[@bguiz](https://twitter.com/bguiz)
