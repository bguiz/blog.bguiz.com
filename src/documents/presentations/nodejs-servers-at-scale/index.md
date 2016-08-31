![](img/qr-code-nodejs-servers-at-scale-presentation.png)

=SLIDE=

# Deploying NodeJs Servers at Scale

## Top 7 Things Learnt

Brendan Graetz

@bguiz

=SLIDE=

# 2016 Olympics

- 3.x million users (5 min interval)
- 1.x million users (1 min interval)
- 2 to 8 AWS micro instances for API requests

=SLIDE=

# Server Lifetime

- Always up vs reboot at will
- Always up servers push all resource intensive tasks to reboot at will servers
- Pushing of tasks goes through queues
  - EC2 (au) -> SQS -> SNS -> EC2 (r@w)

=SLIDE=

# 3rd party APIs

- Always plan for them to fail
- Set up notification alerts for these
  - Learning point for us during the environment

=SLIDE=

# NodeJs Excels at async IO

- Leverage this by being as quick as possible
  - Make everything non-blocking -> non-slow
- Understand Javascript's event loop
  - Find the shortest path to move stuff back into the event loop
- Fail fast

=SLIDE=

# Asynchronous Javascript

- Low loads: Promises & callbacks had same performance
- High loads: Callbacks outperformed promises
  - Small but perceptible difference

=SLIDE=

## Rule of 3

- Rule of 3
  - No more than 3 nested functions
    1. Main function (route handler)
    2. Callbacks
    3. Nested callbacks
  - Any more than this:
    - Function is too complex, refactor/ rewrite, OR
    - `yield` callbacks

=SLIDE=

## Why 3?

- Each async action has at minimum 1 fail and 1 pass state
- 1 callback -> 2 states
- 2 callbacks -> 4 states
- 3 callbacks -> 8 states

=SLIDE=

## Koa philosophy

- Stole some ideas from Koa routes and middleware
- Generator functions as the primary async mechanism
- Applied them to express
- *But*, without `co`, without `Promise`

=SLIDE=

## `yield`ing promises

```javascript
co(function* () {
  let result = yield myPromise;
  // do something with result
})
.catch((err) => {
  // handle error
});
```

=SLIDE=

## `yield`ing callbacks

```javascript
righto.iterate(function* (reject) {
  let [err, result] = yield righto.surely(myCallback, param);
  if (err) { reject(err); return; }
  // do something with result
})((err, result) => { /* ... */ });
```

=SLIDE=

# **Hot** code

- Identify it from biz rules
- Live monitoring in production
- Optimise it heavily

=SLIDE=

## **Hot** code optimisations

- Deflect work *elastically*
- Multiple levels of caching

=SLIDE=

## Elastic Deflect (TM)

- For things that run very frequently
  - e.g. token cycling
- Stretch the interval based on volume
- Serve the same number of users with less resources
- When the volume goes back to normal,
  the interval goes back to normal too

=SLIDE=

## Multiple levels of caching

- Cache everything
- Internally within the server:
  - In memory LRU cache
- On the clients (web + native mobile apps)
  - HTTP response header `Cache-Control`
- On the CDN
  - Configure to read from `Cache-Control`
- Even cache your error responses
  - (use a lower `max-age`)

=SLIDE=

## Optimisations summary

> The fastest API request/ response times that you will ever get
> are the ones which you never need to make

=SLIDE=

# Blue-green deployments

- Always have two production servers running
- DNS level switch (Route53)
  - No down time
  - Smoke test in production *before* users get to it
  - Easy to roll back
- Deploy to production on day 2!

=SLIDE=

# Testing

- 93% code coverage
- Really gives you confidence in deploying
  - Confidence is necessary if deploying after going live
- When something breaks, narrow down fault definitively
  - Useful when 3rd party vendors are problematic
- Smoke test -> Unit test + integration test

=SLIDE=

# Fin

- Very few fancy things
- A lot of getting the basic stuff right

=SLIDE=

# Questions?

![](img/qr-code-nodejs-servers-at-scale-presentation.png)
