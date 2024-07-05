import axios from "axios";
import router from '../router/index'
import { message } from "ant-design-vue";
// import qs from 'qs'


/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
let toLogin = () => {
    sessionStorage.remove('token') // 移除 token 的值
    sessionStorage.remove('reftoken') // 移除 reftoken 的值
    router.push({
        path: '/login',
        // query: {
        //     redirect: router.currentRoute.fullPath
        // }
    })
}

let isRefreshing = false // 是否正在刷新的标记
let requests = [] // 重试队列，每一项将是一个待执行的函数形式

let pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken; // 初始化取消请求的构造函数
// 取消上一次请求
let removePending = (ever) => {
    for (let p in pending) {
        if (pending[p].u === ever.url + '&' + ever.method) { // 当前请求在数组中存在时执行函数体
            pending[p].f(); // 执行取消操作
            pending.splice(p, 1); // 把这条记录从数组中移除
        }
    }
}

// axios配置
const request = axios.create({
    // baseURL: import.meta.env['VITE_APP_BASE_API'],
    withCredentials: true, // 跨域请求要想带上cookie
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
        const reftoken = sessionStorage.getItem('reftoken');
        if (token) {
            // config.headers['Authorization'] = 'bearer' 'Bearer' + token
            config.headers.Authorization = token
            config.headers.reftoken =  reftoken
        }
        // console.log("config:", config, token)
        removePending(config); // 在一个ajax发送前执行一下取消操作
        config.cancelToken = new cancelToken((c) => {
            // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
            pending.push({
                u: config.url + '&' + config.method,
                f: c
            });
        });

        return config
    },
    error => {
        return Promise.reject(error)
    }
)

/**
 * 请求失败后的错误统一处理
 * status 请求失败的状态码
*/

// 后台沟通状态码规范
let errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        // 400: 客户端请求的语法错误，服务器无法理解
        case 400:
            message({
                message: '400客户端请求的语法错误，服务器无法理解',
                type: 'error'
            })
            break
        case 401:
            message({
                message: '登录过期，请重新登录',
                type: 'error'
            })
            setTimeout(() => {
                toLogin() // 跳转到登录
            }, 3000)
            break
            // 404请求不存在
        case 404:
            message({
                message: '请求的资源不存在，请稍后再试',
                type: 'error'
            })
            break
        case 408:
            message({
                message: '网络延时，请稍后',
                type: 'error'
            })
            setTimeout(() => {
                toLogin() // 跳转到登录
            }, 30000)
            break
            // 413 Request Entity Too Large
        case 413:
            message({
                message: '上传失败, 原因: 413 Request Entity Too Large',
                type: 'error'
            })
            break
            // 500
        // case 500:
        //     message({
        //         message: '网站后台请求错误，请检查后端接口',
        //         type: 'error'
        //     })
        //     break
        default:
            console.log(other)
    }
}



// 响应拦截器配置
request.interceptors.response.use(
    response => {
        if (response.status === 200) {
            const { code } = response.data
            // 说明token过期了,获取新的token
            if (code === 11015) {
                const config = response.config
                // 判断一下状态
                if (!isRefreshing) {
                    // 修改状态，进入更新token阶段
                    isRefreshing = true
                    // 获取当前的请求
                    return refreshToken({ reftoken: `${store.state.user.reftoken}` }).then(res => {
                        if (res.status === 200) {
                            console.log('reauestApi-token过期')
                            if (res.data.code === 0) {

                                // 刷新token成功，将最新的token更新到header中，同时保存在Cookies中
                                const { token, reftoken } = res.data.data
                                Cookies.set('token', token)
                                Cookies.set('reftoken', reftoken)
                                store.state.user.token = token
                                store.state.user.reftoken = reftoken

                                // 重置失败请求的配置
                                config.headers['Authorization'] = token
                                config.baseURL = ''

                                // 已经刷新了token，将所有队列中的请求进行重试
                                requests.forEach(cb => cb(token))
                                // 重试完了别忘了清空这个队列
                                requests = []
                                return service(config)
                            }
                        }
                    }).catch((error) => {
                        console.log('error:', error)
                        // 重新请求token失败，跳转到登录页
                        // window.location.href = '/login'
                    }).finally(() => {
                        //完成之后在关闭状态
                        isRefreshing = false
                    })
                } else {
                    // 正在刷新token，返回一个未执行resolve的promise
                    return new Promise((resolve) => {
                        // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
                        requests.push((token) => {
                            config.baseURL = ''
                            config.headers['Authorization'] = token
                            resolve(service(config))
                        })
                    })
                }

            } else if (code === 11021) {
                // 刷新Token已过期
                resetLogin()
                return Promise.resolve(reason)
            } 



            // if (code === 403) {
            //     message.error('认证失败，请重新登录')
            // } else if (code === 400) {
            //     message.error('认证失败')
            // }
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

// 重新登录
const resetLogin = () => {
    if  (window.location.href.indexOf('/login') === -1) {
        if (messageFlag) {
            MessageBox.confirm('身份验证已过期，请重新登录！', '温馨提示:', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                showCancelButton: false,
                type: 'warning'
            }).then(() => {
                messageFlag = true
                MessageBox.close()
                store.dispatch('user/FedLogOut').then(() => {
                    setTimeout(() => {
                        router.push('/login')
                    }, 300)
                    // store.dispatch('tagsView/delAllViews', null, { root: true })
                }).catch((err) => {
                    message.error(err)
                })
            }).catch(() => {
                MessageBox.close()
                store.dispatch('user/FedLogOut').then(() => {
                    setTimeout(() => {
                        router.push('/login')
                    }, 300)
                    // store.dispatch('tagsView/delAllViews', null, { root: true })
                }).catch((err) => {
                    message.error(err)
                }) 
            });
            messageFlag = false
        }
    }
}




// 导出request供其他组件使用
export default request
