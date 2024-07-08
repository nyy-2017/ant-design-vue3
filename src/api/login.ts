import request from '@/api/request'
import qs from 'qs'

// 获取图片验证码
export function getCode(code: number){
  return request({
    url: '/api/open/code',
    method: 'get',
    responseType: 'blob',
    params: code
  })
}

// 登录
export function checkLogin(data: any) { 
  return request({
    url: '/api/login',
    method: 'post',
    data: qs.stringify(data),
    options: {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  })
}

// 刷新token
export function refreshToken(data) {
  return request({
    url: '/api/reftoken',
    method: 'get',
    params: data
  })
}

// 登出
export function loginOut(data) {
  return request({
    url: '/api/logout/success',
    method: 'get',
    params: data
  })
}