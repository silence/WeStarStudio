export function throttle(func, delay) {
  var last = 0
  return function(...args) {
    var curr = +new Date()
    if (curr - last > delay) {
      func.apply(this, args)
      last = curr
    }
  }
}
