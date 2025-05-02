export default function ticker (fn, minMS=1000) {
  let id = 1
  let running = null
  let stopped = null

  const tickerApi = {
    stop,
    start
  }

  return tickerApi

  function stop () {
    if (running) {
      if (stopped) throw new Error('should not be a stopped promise and a running')
      stopped = running
      running = null
    }
    id += 1
  }

  async function run (myId, oldRun) {
    if (oldRun) {
      await oldRun
    }

    if (id > myId) return

    const minTickBuffer = new Promise((r) => setTimeout(r, minMS))

    await fn(tickerApi)

    await minTickBuffer

    return run(myId)
  }

  async function start () {
    if (running) return running
    running = run(id, stopped)
    stopped = null
    return running
  }
}