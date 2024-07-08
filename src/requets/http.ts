import axios, { InternalAxiosRequestConfig } from "axios";
import router from '../router/index';
import { message, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { ref, createVNode } from 'vue';
import { refreshToken } from '@/api/login';
// import qs from 'qs'

import { useUserStore } from '@/store/modules/user';
// const userStore = useUserStore();

let messageFlag = ref(true);

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
*/
let toLogin = () => {
    sessionStorage.remove('token') // 移除 token 的值
    sessionStorage.remove('reftoken') // 移除 reftoken 的值
    router.push({
        path: '/login'
    })
}

let isRefreshing = false // 是否正在刷新的标记
let requests = ref([]) // 重试队列，每一项将是一个待执行的函数形式

// axios配置
const request = axios.create({
    withCredentials: true, // 跨域请求要想带上cookie
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
            // 说明token过期了,获取新的token
            if (code === 11015) {
                console.log('11015')
                const config = response.config
                // 判断一下状态
                if (!isRefreshing) {
                    // 修改状态，进入更新token阶段
                    isRefreshing = true
                    const reftoken = sessionStorage.getItem('reftoken');
                    // 获取当前的请求
                    return refreshToken({ reftoken: `${reftoken}` }).then(res => {
                        if (res.status === 200) {
                            console.log('reauestApi-token过期')
                            if (res.data.code === 0) {
                                const userStore = useUserStore();
                                // 刷新token成功，将最新的token更新到header中，同时保存在sessionStorage中
                                const { token, reftoken } = res.data.data
                                sessionStorage.setItem('token', token)
                                sessionStorage.setItem('reftoken', reftoken)

                                // 更新store数据
                                userStore.setToken(token);
                                userStore.setRefToken(reftoken);

                                // 重置失败请求的配置
                                config.headers['Authorization'] = token
                                config.baseURL = ''

                                // 已经刷新了token，将所有队列中的请求进行重试
                                requests.value.forEach((cb: any) => cb(token))
                                // 重试完了别忘了清空这个队列
                                requests.value = []
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
                        // @ts-ignore
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
                return Promise.resolve(response)
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
            const userStore = useUserStore();
            Modal.confirm({
                title: '温馨提示:',
                icon: createVNode(ExclamationCircleOutlined),
                content: '身份验证已过期，请重新登录！',
                onOk() {
                    return new Promise((resolve, reject) => {
                        messageFlag.value = true
                        // store 里面的退出登录方法
                        userStore.userLogOut();
                        setTimeout(() => {
                            router.push('/login')
                        }, 300)
                    }).catch(() => {
                        console.log('Oops errors!')
                    });
                },
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onCancel() {
                    // store 里面的退出登录方法
                    userStore.userLogOut();
                    setTimeout(() => {
                        router.push('/login')
                    }, 300)
                },
            });
            messageFlag.value = false
        }
    }
}


// 导出request供其他组件使用
export default request
function service(config: InternalAxiosRequestConfig<any>): any {
    throw new Error("Function not implemented.");
}

