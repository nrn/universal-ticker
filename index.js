export default function ticker (fn, minMS=1000) {
  let id = 0

  const tickerApi = {
    stop,
    start
  }

  return tickerApi

  function stop () {
    id += 1
  }

  async function run (myId) {
    if (id > myId) return

    const minTickBuffer = new Promise((r) => setTimeout(r, minMS))

    await fn(tickerApi)

    await minTickBuffer

    return run(myId)
  }

  async function start () {
    stop()
    return run(id)
  }
}