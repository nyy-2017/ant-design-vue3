/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
 export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
  }
  
  /**
   * @param {string} str
   * @returns {Boolean}
   */
  export function validUsername(str) {
    const valid_map = ['admin', 'editor']
    return valid_map.indexOf(str.trim()) >= 0
  }
  
  /**
   *邮箱验证
   */
  export function validEmail(email) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(email)
  }
  
  /**
   * 手机号验证
   */
  export function validPhone(phone) {
    const reg = /^1([38][0-9]|4[014-9]|[59][0-35-9]|6[2567]|7[0-8])\d{8}$/
    // /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: "请输入合法手机号/电话号",
    return reg.test(phone)
  }
  
  /**
   * 身份证号码
   */
  export function validIdNumber(idNumber) {
    const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
    return reg.test(idNumber)
  }
  
  /**
   * 只能全是中文
   */
  export function validName(name) {
    // const reg = /^[\u4e00-\u9fa5]+$/
    const reg = /[^\u4e00-\u9fa5]/
    return reg.test(name)
  }
  
  /**
   * 数字
   */
  export function validNumber(number) {
    const reg = /^[0-9]*$/
    return reg.test(number)
  }
  
  // 经纬度正则验证 可输入整数和小数，并且小数保留6位
  // 经度正则-180 ~ 180
  export function validLng(lng) {
    const isTrue = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/
    return isTrue.test(lng)
  }
  // 纬度正则 -90 ~ 90
  export function validLat(lat) {
    const isTrue = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/
    return isTrue.test(lat)
  }
  
  /**
   * 东经  [0, -180]
   */
  export function validEastLng(lng) {
    const reg = /^(((\d|[1-9]\d|1[0-7]\d|0)\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/
    return reg.test(lng)
  }
  
  /**
   * 西经 [-180, 0]
   */
  export function validWestLng(lng) {
    const reg = /^-(((\d|[1-9]\d|1[0-7]\d|0)\.\d{6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{6}|180)$/
    return reg.test(lng)
  }
  
  /**
   * 北纬 [0, 90]
   */
  export function validNorthLat(lat) {
    const reg = /^([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/
    return reg.test(lat)
  }
  
  /**
   * 南纬 [-90, 0]
   */
  export function validSouthLat(lat) {
    const reg = /^-([0-8]?\d{1}\.\d{6}|90\.0{6})$/
    return reg.test(lat)
  }
  
  /**
   * 密码 隐藏
  */
  export function validPassword(val, password, formPassword) {
    const reg = /[0-9a-zA-Z]/g // 只允许输入字母和数字
    const nDot = /[^●]/g // 非圆点字符
    let index = -1 // 新输入的字符位置
    let lastChar = void 0 // 新输入的字符
    const realArr = password.split('') // 真实密码数组
    const coverArr = val.split('') // 文本框显示密码数组
    const coverLen = val.length // 文本框字符串长度
    const realLen = password.length // 真实密码长度
    // 找到新输入的字符及位置
    coverArr.forEach((el, idx) => {
      if (nDot.test(el)) {
        index = idx
        lastChar = el
      }
    })
    // 判断输入的字符是否符合规范，不符合的话去掉该字符
    if (lastChar && !reg.test(lastChar)) {
      coverArr.splice(index, 1)
      formPassword = coverArr.join('')
      return
    }
    if (realLen < coverLen) {
      // 新增字符
      realArr.splice(index, 0, lastChar)
    } else if (coverLen <= realLen && index !== -1) {
      // 替换字符（选取一个或多个字符直接替换）
      realArr.splice(index, realLen - (coverLen - 1), lastChar)
    } else {
      // 删除字符，因为 val 全是 ● ，没有办法匹配，不知道是从末尾还是中间删除的字符，删除了几个，不好对 password 处理，所以可以通过光标的位置和 val 的长度来判断
      const pos = document.getElementById('pwd').selectionEnd // 获取光标位置
      realArr.splice(pos, realLen - coverLen)
    }
    // 将 pwdCover 替换成 ●
    formPassword = val.replace(/\S/g, '●')
    password = realArr.join('')
  
    const result = {
      formPassword: formPassword,
      password: password
    }
    return result
  }
  