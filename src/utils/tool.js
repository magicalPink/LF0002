// 判断数组是否存在
export function arrayExistence(arr) {
  return arr && arr.length > 0
}

//节流函数
export function throttle(fn, delay, call = function () {}) {
  let lastTime = 0

  return function () {
    // 获取当前时间戳
    let now = new Date().getTime()

    // 如果当前时间减去上次时间大于限制时间时才执行
    if (now - lastTime > delay) {
      lastTime = now
      fn.apply(this, arguments)
    } else {
      call()
    }
  }
}
