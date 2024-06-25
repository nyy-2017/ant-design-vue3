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