import ticker from './index.js'

test()

async function test () {
  let count = 0
  let t = ticker((a) => {
    log(count++)
    // return new Promise((r) => setTimeout(r, count * 1000))
  })
  let sTime = Date.now()
  setTimeout(() => t.stop(), 10000)
  await t.start()
  let totalTime = Date.now() - sTime
  log(totalTime)
  assert(() => totalTime > 10000)
  assert(() => totalTime < 10100)

  t.start()
  t.stop()
}

function log (a) { console.log(a); return a }

function assert (fn) {
  var a = fn()
  if (!a) {
    throw new Error(`Assertion failed got ${a} from ${fn.toString()}`)
  }
}
