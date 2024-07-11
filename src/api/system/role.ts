import request from '@/request/http'
// 查询所有角色
export function get_roleInfo() { 
    return request({
        url: '/api/system/role/list',
        method: 'get'
    })
}

// 条件查询角色
export function get_role_condition(data: any) { 
    return request({
        url: '/api/system/role/page', 
        method: 'get',
        params: data
    })
}

// 根据userId查询角色
export function get_roleByuserId(userId: any) { 
    return request({
        url: '/api/system/role/user-role', 
        method: 'get',
        params: userId
    })
}

//保存角色
export function add_roleInfo(data: any) {
    return request({
        url: '/api/system/role/save',
        method: 'post',
        data: data,
        options: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}

// 修改角色
export function edit_roleInfo(data: any) {
    return request({
        url: '/api/system/role/update',
        method: 'put',
        data: data,
        options: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}

// 删除角色
export function delete_roleInfo(id: any) {
    return request({
        url: '/api/system/role/delete',
        method: 'DELETE',
        params: id,
        options: {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    })
}

// 更新角色菜单
export function update_roleMenuInfo(data: any) {
    return request({
        url: '/api/system/role/menu',
        method: 'put',
        data: data,
        options: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}
