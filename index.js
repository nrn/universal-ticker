let max = Number.MAX_SAFE_INTEGER

export default function makeTicker (fn, minMS=1000, remainingTicks=max) {
  let hardstop = false
  let lastTickTime = Date.now()
  let api = {
    stop,
    remainingTicks,
    minMS,
    ticksSoFar: 0,
    timeSinceLastTick: 0
  }
  let r = run()
  r.api = api
  return r

  function stop () {
    hardstop = true
  }

  async function run () {
    if (hardstop || api.remainingTicks < 1) return
    api.remainingTicks -= 1
    api.ticksSoFar += 1
    api.timeSinceLastTick = Date.now() - lastTickTime
    lastTickTime = Date.now()

    const minTickBuffer = new Promise((resolve) => setTimeout(resolve, minMS))

    await fn(api)

    await minTickBuffer

    return run()
  }
}