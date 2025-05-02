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
   t.start()
   await t.start()
   let totalTime = Date.now() - sTime
   log(totalTime)
   assert(() => totalTime > 10000)
   assert(() => totalTime < 10100)

   t.start()
   t.stop()

   let c2 = 0
   let time = Date.now()
   let t2 = ticker((a) => {
     log(`second: ${c2++} time: ${Date.now() - time}`)
   }, 2000)
   setTimeout(() => t2.stop(), 100)
   await t2.start()
   setTimeout(() => t2.stop(), 100)
   t2.start()
   t2.stop()
   t2.start()
   t2.start()
   t2.stop()
   t2.stop()
   await t2.start()
   setTimeout(() => t2.stop(), 100)
   await t2.start()
  

}

function log (a) { console.log(a); return a }

function assert (fn) {
  var a = fn()
  if (!a) {
    throw new Error(`Assertion failed got ${a} from ${fn.toString()}`)
  }
}
