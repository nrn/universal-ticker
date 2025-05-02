# Universal Ticker

An async/await forward way to periodically run a function.

```javascript
import ticker from 'universal-ticker'

let minMs = 1000

let maxTimes = 10

await ticker((info) => {
  console.log(info.ticksSoFar)
}, minMs, maxTimes)

// you arrive down here after your function has ticked 10 times 1s each

```

## ticker(handler[, minMs = 1000, maxTimes = Number.MAX_SAFE_INTEGER])

Ticker returns a promise that resolves when it has finished ticking.

If your handler returns a promise it will race with the minimumMS time, the
next tick will happen after both are resolved.
