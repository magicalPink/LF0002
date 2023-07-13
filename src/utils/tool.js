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

/**
 * 表格时间格式化
 */
export function formatDate(cellValue) {
  if (cellValue == null || cellValue == "") return "";
  var date = new Date(cellValue)
  var year = date.getFullYear()
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
}
