export function FromDates() {
  const timeStamp = new Date()
  const year = (new Date(timeStamp).getFullYear()).toString()
  const month = (new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1).toString()
  const date = (new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()).toString()
  const hh = (new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours()).toString()
  const mm = (new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()).toString()
  const ss = (new Date(timeStamp).getSeconds() < 10 ? '0' + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds()).toString()
  const nowTime = year + month + date + hh + mm + ss
  return nowTime
}

// 现在的参数 + 24小时
export function add24HoursAndFormat(dateStr: string | number | Date) {
  const date = new Date(dateStr) // 将字符串转换为Date对象
  date.setHours(date.getHours() + 24) // 在当前时间基础上加24小时
  // 格式化日期时间为字符串
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // 月份是从0开始的
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  // add24HoursAndFormat(k.startTime) + '.000000' 
}

export function FromTimes(timeStamp: string | number | Date) { // 时间转换
  const year = new Date(timeStamp).getFullYear()
  const month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1
  const date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()
  const hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours()
  const mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()
  const ss = new Date(timeStamp).getSeconds() < 10 ? '0' + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds()
  const nowTime = year + '-' + month + '-' + date + ' ' + hh + ':' + mm + ':' + ss
  return nowTime
}

export function FromTimeDate(timeStamp: string | number | Date) { // 日期转换 
  const year = new Date(timeStamp).getFullYear()
  const month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1
  const date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()
  // const hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours()
  // const mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()
  // const ss = new Date(timeStamp).getSeconds() < 10 ? '0' + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds()
  const nowTime = year + '-' + month + '-' + date
  return nowTime
}

export function DownLoadFromTime(timeStamp: string | number | Date) { // 下载时间格式转换:   20210528_115019
  const year = new Date(timeStamp).getFullYear()
  const month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1
  const date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()
  const hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours()
  const mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()
  const ss = new Date(timeStamp).getSeconds() < 10 ? '0' + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds()
  const nowTime = year + '' + month + '' + date + '_' + hh + '' + mm + '' + ss
  return nowTime
}

export function nationTimes(timeStamp: string | number | Date) { // 转化为年月日时间
  const year = new Date(timeStamp).getFullYear()
  const month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1
  const date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()
  const nowTime = year + '年' + month + '月' + date + '日'
  return nowTime
}

export function tenseTimes(timeStamp: string | number | Date) { // 时间转换(时分秒)
  const hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours()
  const mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()
  const ss = new Date(timeStamp).getSeconds() < 10 ? '0' + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds()
  const nowTime = hh + ':' + mm + ':' + ss
  return nowTime
}

export function nowHhMmSs() { // 当前时间的时分秒
  const time = new Date(+new Date(new Date().toJSON()) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  return time.split(' ')[1]
}

export function nowTime() { // 当前时间
  return new Date(+new Date(new Date().toJSON()) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}
export function nowDate(p0?: Date) { // 当前日期 2021-08-25
  const time = new Date(+new Date(new Date().toJSON()) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  return time.split(' ')[0]
}

export function DownLoadTime() { // 下载时间格式
  const timeStamp = new Date()
  const year = (new Date(timeStamp).getFullYear()).toString().substring(2)
  const month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1
  const date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()
  const hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours()
  const mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()
  const ss = new Date(timeStamp).getSeconds() < 10 ? '0' + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds()
  const nowTime = '_' + year + month + date + '-' + hh + mm + ss
  return nowTime
}

export function DownLoadTime1() { // 下载时间格式
  const timeStamp = new Date()
  const year = (new Date(timeStamp).getFullYear()).toString().substring(2)
  const month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1
  const date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()
  const hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours()
  const mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()
  const ss = new Date(timeStamp).getSeconds() < 10 ? '0' + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds()
  const nowTime = year + month + date + '_' + hh + mm + ss
  return nowTime
}

export function nowDateStartTime() { // 当前日期开始时间  2021-08-25 00:00:00
  const time = new Date(+new Date(new Date().toJSON()) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  return time.split(' ')[0] + ' ' + '00:00:00'
}
export function nowDateEndTime() { // 当前日期结束时间  2021-08-25 59:59:59
  const time = new Date(+new Date(new Date().toJSON()) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  return time.split(' ')[0] + ' ' + '59:59:59'
}

export function yesterdaTime() { //  昨日 00:00:00
  const time = new Date(+new Date(new Date().toJSON()) + 8 * 3600 * 1000 -24*60*60*1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  return time.split(' ')[0] + ' ' + '00:00:00'
}

export function formerTime(n: number) { // 三天前时间
  // eslint-disable-next-line no-redeclare
  var n = n
  const d = new Date()
  let year = d.getFullYear()
  let mon = d.getMonth() + 1
  let day = d.getDate()
  const hh = d.getHours()
  const mm = d.getMinutes()
  const ss = d.getSeconds()
  if (day <= n) {
    if (mon > 1) {
      mon = mon - 1
    } else {
      year = year - 1
      mon = 12
    }
  }
  d.setDate(d.getDate() - n)
  year = d.getFullYear()
  mon = d.getMonth() + 1
  day = d.getDate()
  const s = year + '-' + (mon < 10 ? ('0' + mon) : mon) + '-' + (day < 10 ? ('0' + day) : day) + ' ' + (hh < 10 ? ('0' + hh) : hh) + ':' + (mm < 10 ? ('0' + mm) : mm) + ':' + (ss < 10 ? ('0' + ss) : ss)
  return s
}

export function upMonthDate() { // 上个月1号时间
  const d = new Date()
  let year = d.getFullYear()
  let mon = d.getMonth() + 1
  const day = '01'
  if (mon > 1) {
    mon = mon - 1
  } else {
    year = year - 1
    mon = 12
  }
  const s = year + '-' + (mon < 10 ? ('0' + mon) : mon) + '-' + day + ' ' + '00' + ':' + '00' + ':' + '00'
  return s
}

export function getThisMonth() { // 上个月26号 到 本月25号
  var startStop = new Array()
  // 获得当前月份0-11
  const d = new Date()
  var currentMonth = d.getMonth()
  // 获得当前年份4位年
  var currentYear = d.getFullYear()

  // 获取今天号
  var day = d.getDate()
  var start = ''
  var end = ''
  var startYear = currentYear
  var startMon = currentMonth
  var endYear = currentYear
  var endMon = currentMonth

  // 当前日是否 小于等于 25号
  if(day < 25){
    // 2021-09-01
    //  8-26 - 9-25
    // 如果本月 为1月 则--开始月为上年的12月
    if (currentMonth == 0) {
      startYear--
      startMon = 12
    }
    // 开始日期为  上月26号
    start = startYear + "-" + (startMon -1) + "-" + '26'
    //结束日期为 本年本月的 25号
    end = endYear + "-" + endMon + "-" + '25'
  } else{
    // 25号以后 2021-09-26 
    // 8-26 - 9-25
    //如果本月 是12月 则--结束月为明年的1月
    if (currentMonth == 11) {
      endYear++
      endMon = 1
    }
    // 开始日期为本年本月的26号
    start = startYear + "-" + startMon + "-" + '26'
    // 结束日期为上个月的25号
    end = endYear + "-" + (endMon + 1) + "-" + '25'
  }
  // console.log("26:", start, '25:', end)
  startStop.push(start)
  startStop.push(end)
  // 返回
  return startStop
}

export function getThisMonthDate() { // 上个月20号 到 本月21号
  var startStop = new Array()
  // 获得当前月份 0-11
  const d = new Date()
  var currentMonth = d.getMonth()
  // 获得当前年份4位年
  var currentYear = d.getFullYear()

  // 获取今天号
  var day = d.getDate()
  var start = ''
  var end = ''
  var startYear = currentYear
  var startMon = currentMonth
  var endYear = currentYear
  var endMon = currentMonth

  // 当前日是否 小于等于 21号
  if(day < 21){
    // 2021-09-01
    //  8-20 - 9-21
    // 如果本月 为1月 则--开始月为上年的12月
    if (currentMonth == 0) {
      startYear--
      startMon = 12
    }
    // 开始日期为本年 上月 20号
    start = startYear + "-" + startMon + "-" + '20'
    //结束日期为本年 本月的 21号
    // end = endYear + "-" + endMon + "-" + '21'
    // 结束日期为本年 本月的当前日期
    end = endYear + "-" + (endMon + 1) + "-" + day
  } else {
    // 21号以及以后 2021-09-21 
    // console.log('21号以及以后:')
    // 8-20 - 9-21
    //如果本月 是12月 则--结束月为明年的1月
    if (currentMonth == 11) {
      endYear++
      endMon = 1
    }
    // 开始日期为本年 上个月的 20号  
    start = startYear + "-" + startMon + "-" + '20'
    // 结束日期为 本月的 21号 
    end = endYear + "-" + (endMon + 1) + "-" + '21'
  }
  // console.log("20:", start, '21:', end)
  startStop.push(start)
  startStop.push(end)
  // 返回
  return startStop
}

// 上个月20号 到 本月21号 带时分秒
// 本月不到21号，取当前日期。
export function getThisMonthDateTimes() {
  var startStop = new Array()
  // 获得当前月份 0-11
  const d = new Date()
  var currentMonth = d.getMonth()
  // 获得当前年份4位年
  var currentYear = d.getFullYear()

  // 获取今天号
  var day = d.getDate()
  var start = ''
  var end = ''
  var startYear = currentYear
  var startMon = currentMonth
  var endYear = currentYear
  var endMon = currentMonth

  // 当前日是否 小于等于 21号
  if (day < 21) {
    // 2021-09-01
    //  8-20 - 9-21
    // console.log('20号以及以前:', day)
    // 如果本月 为1月 则--开始月为上年的12月
    if (currentMonth == 0) {
      startYear--
      startMon = 12
    }
    // 开始日期为本年 上上月 20号
    // startMon = (startMon -1) < 10 ? '0' + (startMon -1) : (startMon -1)
    // 开始日期为本年 上个月 20号
    startMon = startMon < 10 ? '0' + startMon : startMon
    start = startYear + "-" + startMon  + "-" + '20'
    // 结束日期为本年 上个月的 21号
    // endMon = endMon < 10 ? '0' + endMon : endMon
    // 结束日期为本年 本月当前时间
    endMon = (endMon + 1) < 10 ? '0' + (endMon + 1) : (endMon + 1)
    let day1 = day < 10 ? '0' + day : day
    end = endYear + "-" + endMon + "-" + day1
    // console.log('?????', start, end)
  } else {
    // 21号以及以后 2021-09-21 
    // console.log('21号以及以后:', day)
    // 8-20 - 9-21
    // 如果本月 为1月 则--开始月为上年的12月
    if (currentMonth == 0) {
      startYear--
      startMon = 12
    }
    //如果本月 是12月 则--结束月为明年的1月
    if (currentMonth == 11) {
      endYear++
      endMon = 1
    }
    // 开始日期为本年 上个月的 20号
    startMon = startMon < 10 ? '0' + startMon : startMon
    // console.log('startMon:', startMon)
    start = startYear + "-" + startMon + "-" + '20'
    // 结束日期为 本月的 21号 
    endMon = (endMon + 1) < 10 ? '0' + (endMon + 1) : (endMon + 1)
    end = endYear + "-" + endMon + "-" + '21'
  }
  start = start + ' ' + '00:00:00'
  end = end + ' ' + '00:00:00'
  // console.log("20:", start, '21:', end)
  startStop.push(start)
  startStop.push(end)
  // 返回
  return startStop
}


export function defaultTime() { // 默认时间
  return '2021-01-01 01:01:01'
}

export function broadcastEndTime(startTime: { getTime: () => number }, sec: number) { // 播表模板录入结束时间
  const n = new Date(startTime.getTime() + sec * 1000)
  const year = new Date(n).getFullYear()
  const month = new Date(n).getMonth() + 1 < 10 ? '0' + (new Date(n).getMonth() + 1) : new Date(n).getMonth() + 1
  const date = new Date(n).getDate() < 10 ? '0' + new Date(n).getDate() : new Date(n).getDate()
  const hh = new Date(n).getHours() < 10 ? '0' + new Date(n).getHours() : new Date(n).getHours()
  const mm = new Date(n).getMinutes() < 10 ? '0' + new Date(n).getMinutes() : new Date(n).getMinutes()
  const ss = new Date(n).getSeconds() < 10 ? '0' + new Date(n).getSeconds() : new Date(n).getSeconds()
  const nowTime = year + '-' + month + '-' + date + ' ' + hh + ':' + mm + ':' + ss
  return nowTime
}

export function startRecTime(timeStamp: string | number | Date) { // 播表查询开始时间
  // eslint-disable-next-line eqeqeq
  if (timeStamp == '') {
    return ''
  } else {
    const year = new Date(timeStamp).getFullYear()
    const month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1
    const date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()
    const nowTime = year + '-' + month + '-' + date + ' ' + '00:00:00'
    return nowTime
  }
}

export function endRecTime(timeStamp: string | number | Date) { // 播表查询结束时间
  // eslint-disable-next-line eqeqeq
  if (timeStamp == '') {
    return ''
  } else {
    const year = new Date(timeStamp).getFullYear()
    const month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1
    const date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()
    const nowTime = year + '-' + month + '-' + date + ' ' + '23:59:59'
    return nowTime
  }
}

export function makeDurationToSeconds(time: any) { // 将时分秒转化为秒
  var str = time
  var arr = str.split(':')
  var hs = parseInt(arr[0] * 3600)
  var ms = parseInt(arr[1] * 60)
  var ss = parseInt(arr[2])
  var seconds = hs + ms + ss
  return seconds
}

export function formatSeconds(value: string) { // 将秒转化为时分秒
  let result = parseInt(value)
  const h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
  const m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
  const s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
  let result2 = `${h}:${m}:${s}`
  return result2
}

export function startRecTime1(timeStamp: string | number | Date) { // 播表查询开始时间
  // eslint-disable-next-line eqeqeq
  if (timeStamp == '') {
    return ''
  } else {
    const year = new Date(timeStamp).getFullYear()
    const month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1
    const date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()
    const nowTime = year + '-' + month + '-' + date
    return nowTime
  }
}

export function filtrate(information: string | any[]) { // lineName线路过滤
  const stationNameArr = []
  for (let i = 0; i < information.length; i++) {
    stationNameArr.push(information[i].lineName)
  }
  const array = Array.from(new Set(stationNameArr))
  const variable = []
  for (let j = 0; j < array.length; j++) {
    let vari = {}
    vari.label = array[j]
    vari.value = j + 1
    variable.push(vari)
  }
  return variable
}

export function filtrateType(information: string | any[]) { // 播放状态线路过滤
  const stationNameArr = []
  for (let i = 0; i < information.length; i++) {
    stationNameArr.push(information[i].broadcastRecordSubareaInfo.lineName)
  }
  const array = Array.from(new Set(stationNameArr))
  const variable = []
  for (let j = 0; j < array.length; j++) {
    const vari = {}
    vari.label = array[j]
    vari.value = j + 1
    variable.push(vari)
  }
  return variable
}

export function FormateCheck(str: string) { // 验证 HH:mm:ss格式
  var re = /^(?:[01]\d|2[0-3])(?::[0-5]\d){2}$/
  var result = re.test(str)
  return result
}

export function isDateTimePart(str: string) { // 验证YYYY-mm-DD HH:mm:ss格式
  var re = /^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s((([0-1][0-9])|(2?[0-3]))\:([0-5]?[0-9])((\s)|(\:([0-5]?[0-9])))))?$/
  var result = re.test(str)
  return result
}

export function yesterday() { // 昨天yyyy-MM-dd
  var day1 = new Date()
  day1.setDate(day1.getDate() - 1)
  return day1.format('yyyy-MM-dd')
}
// eslint-disable-next-line no-extend-native
Date.prototype.format = function(fmt: string) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

export function uploadDates(timeStamp: string | number | Date) {
  const year = (new Date(timeStamp).getFullYear()).toString()
  const month = (new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1).toString()
  const date = (new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()).toString()
  const hh = (new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours()).toString()
  const mm = (new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()).toString()
  const ss = (new Date(timeStamp).getSeconds() < 10 ? '0' + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds()).toString()
  const nowTime = year + month + date + hh + mm + ss
  return nowTime
}
