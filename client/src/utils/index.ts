function throttle(func: Function, wait: number) {
  let ctx, rtn, timeoutID
  let last = 0

  return function(...args: any[]) {
    ctx = this
    var delta = new Date().getTime() - last
    if (!timeoutID) {
      if (delta >= wait) call(args)
      else timeoutID = setTimeout(call, wait - delta)
    }
    return rtn
  }

  function call(args) {
    timeoutID = 0
    last = new Date().getTime()
    rtn = func.apply(ctx, args)
    ctx = null
    args = null
  }
}

export { throttle }
