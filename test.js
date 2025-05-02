import ticker from './index.js'

test()

async function test () {
  await test1()
  await test2()
}

async function test2 () {
  //allow messing with minMS
  return ticker((a) => {
    console.log(a.timeSinceLastTick)
    a.minMS = a.ticksSoFar * 200
  }, 100, 5)
}

async function test1 () {
  return ticker((outer) => {
    console.log(`outer count: ${outer.ticksSoFar}, ${outer.timeSinceLastTick}`)
    return ticker((inner) => {
      if (outer.ticksSoFar === 5 && inner.ticksSoFar === 2) outer.stop()
      console.log(`inner count: ${inner.ticksSoFar}, ${inner.timeSinceLastTick}`)
    }, 400, 2)
  }, 500)
}

function log (a) { console.log(a); return a }

function assert (fn) {
  var a = fn()
  if (!a) {
    throw new Error(`Assertion failed got ${a} from ${fn.toString()}`)
  }
}
