import request from '@/request/http'
// 查询所有机构
export function get_organInfo() { 
    return request({
        url: '/api/system/org/tree',
        method: 'get'
    })
}


// 保存机构
export function add_organInfo(data: any) {
    return request({
        url: '/api/system/org/save',
        method: 'post',
        data: data,
        options: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}

// 修改机构
export function edit_organInfo(data: any) {
    return request({
        url: '/api/system/org/update',
        method: 'put',
        data: data,
        options: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}


//删除机构
export function delete_organInfo(id: any) {
    return request({
        url: '/api/system/org/delete',
        method: 'DELETE',
        params: id,
        options: {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    })
}