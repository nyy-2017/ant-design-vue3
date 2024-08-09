import request from '@/request/http'
// 查询所有用户
export function get_userInfo() { 
    return request({
        url: '/api/system/user/list',
        method: 'get'
    })
}

// 条件查询用户
export function get_user_condition(data: any) { 
    return request({
        url: '/api/system/user/page', 
        method: 'get',
        params: data
    })
}


// 根据用户名 查询用户信息
export function get_userInfo_userName(userName) { 
    return request({
        url: '/api/system/user/' + userName, 
        method: 'get'
    })
}

// 保存用户
export function add_userInfo(data: any) {
    return request({
        url: '/api/system/user',
        method: 'post',
        data: data,
        options: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}

// 修改用户
export function edit_userInfo(data: any) {
    return request({
        url: '/api/system/user',
        method: 'put',
        data: data,
        options: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}

//删除用户
export function delete_userInfo(id: any) {
    return request({
        url: '/api/system/user/delete',
        method: 'DELETE',
        params: id,
        options: {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    })
}

// 修改启用停用标志
export function update_userStatus(data: any) {
    return request({
        url: '/api/system/user/status',
        method: 'put',
        params: data,
        options: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}


// 密码重置
export function get_resetUserPwd(userId: any) { 
    return request({
        url: '/api/system/user/reset', 
        method: 'get',
        params: userId
    })
}

// 个人设置 修改个人信息 
export function update_userInfo(data: any) {
    return request({
        url: '/api/system/user/edit',
        method: 'put',
        data: data,
        options: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}

// 微信解绑 
export function get_wxUnbound(userId: any) { 
    return request({
        url: '/api/open/wxUser/noBindOpenId', 
        method: 'DELETE',
        params: userId,
        options: {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    })
}

// 获取当前登录用户的 绑定状态
export function get_currentUserUnboundStatus() { 
    return request({
        url: '/api/system/user/getOpenId', 
        method: 'get'
    })
}