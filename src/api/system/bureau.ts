// import request from '@/api/request'
import request from '@/requets/http'

// 查询所有路局
export function get_bureauList() { 
    return request({
        url: '/api/common/bureau/list',
        method: 'get'
    })
}

// 条件查询路局
export function get_bureau_condition(data: any) { 
    return request({
        url: '/api/common/bureau/page', 
        method: 'get',
        params: data
    })
}

// 根据路局id查询路局
export function get_bureauById(id: any) { 
    return request({
        url: '/api/common/bureau', 
        method: 'get',
        params: id
    })
}

// 保存路局
export function add_bureauInfo(data: any) {
    return request({
        url: '/api/common/bureau/save',
        method: 'post',
        data: data,
        options: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}

// 修改路局
export function edit_bureauInfo(data: any) {
    return request({
        url: '/api/common/bureau/update',
        method: 'put',
        data: data,
        options: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}

//删除路局
export function delete_bureauInfo(id: string) {
    return request({
        url: '/api/common/bureau/delete',
        method: 'DELETE',
        params: id,
        options: {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    })
}

//批量删除路局
export function delete_bureauList(bureauIdArry: any) {
    return request({
        url: '/api/common/bureau/delete/list',
        method: 'DELETE',
        data: bureauIdArry,
        options: {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    })
}
