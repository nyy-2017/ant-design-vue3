import axios from "axios";
import { message } from "ant-design-vue";
import qs from 'qs'
// axios配置
const request = axios.create({
    // baseURL: import.meta.env['VITE_APP_BASE_API'],
    withCredentials: true, // 跨域请求要想带上cookie
    // 防止post请求，后端无法接收参数问题
    /*transformRequest: [
    function(data) {
    return qs.stringify(data)
    }
    ],*/
    timeout: 5000
})
// 请求拦截器配置
request.interceptors.request.use(
    config => {
        // @ts-ignore
        const token = sessionStorage.getItem('token');
        if (token) {
            // config.headers['Authorization'] = 'bearer' + token
            config.headers['Authorization'] = 'Bearer' + token
        }
        // console.log("config:", config, token)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器配置
request.interceptors.response.use(
    response => {
        if (response.status === 200) {
            const { code } = response.data
            if (code === 403) {
                message.error('认证失败，请重新登录')
            } else if (code === 400) {
                message.error('认证失败')
            }
        } else if (response.status === 404) {
            message.error('请求未找到')
        } else {
            return Promise.reject("网络请求错误")
        }
        return response
    }, error => {
        const { code } = error
        if ('ERR_BAD_RESPONSE' === code) {
            message.error("网络请求异常");
        } else {
            message.error("服务器异常");
        }
        // Do something with response error
        return Promise.reject(error)
    }
)
// 1. GET 请求封装,注意get请求传递参数的属性为params,如果写成data:data,则springboot后端的@getMapping映射不到
export const getMapping = (url: string, data: any, responseType: string) => {
    if (responseType == 'blob') {
        return request.get(url, {
            params: data,
            responseType: 'blob',
            // headers: {'Content-Type': 'application/json'} // 设置header信息
        })
    } else {
        return request.get(url, {
            params: data
            // headers: {'Content-Type': 'application/json'} // 设置header信息
        })
    }
}
// 2. POST 请求
export const postMapping = (url: string, data: any) => {
    return request({
        method: 'post',
        url: url,
        data: qs.stringify(data),
        // options: {
        //     headers: {
        //       'Content-Type': 'application/x-www-form-urlencoded'
        //     }
        // }
    })
}
// 3. POST2 请求
export const requestMapping = (url: string, data: any) => {
    return request({
        method: 'post',
        url: url,
        data: data
    })
}


// 4.put请求
export const putMapping = (url: string, data: any) => {
    return request({
        method: 'put',
        url: url,
        data: data
    })
}
// 5.delete 请求
export const deleteMapping = (url: string, data: any) => {
    return request({
        method: 'delete',
        url: url,
        data: data
    })
}

// 导出request供其他组件使用
export default request
