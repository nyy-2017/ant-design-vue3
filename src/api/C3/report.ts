import request from '@/request/http'

// 获取登录用户的待办事项
export function get_loginUserList() { 
    return request({
        url: '/api/c3/report/backlog/list',
        method: 'get'
    })
}

//根据动车组号 和 拆连时间 获取列表数据
export function get_reviewListByEmnnumTime(data: any) { 
    return request({
        url: '/api/c3/report/create/check', 
        method: 'post',
        data: data,
        options: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}

// 获取全部C3审查报告
export function get_reportList() { 
    return request({
        url: '/api/c3/report/review/list',
        method: 'get'
    })
}

//回显 获取C3审查报告内容
export function get_reviewDataById(timeoutId: string ) { 
    return request({
        url: '/api/c3/report/review/'+timeoutId, 
        method: 'get'
    })
}

// 锁定接口
export function get_lockById(timeoutId: string) { 
    return request({
        url: '/api/c3/report/lock/'+timeoutId, 
        method: 'get'
    })
}

// 解锁接口
export function get_unlockById(timeoutId: string) { 
    return request({
        url: '/api/c3/report/unlock/'+timeoutId, 
        method: 'post',
        options: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}

// 获取历史审批记录
export function get_historyById(timeoutId: string) { 
    return request({
        url: '/api/c3/report/history/'+timeoutId, 
        method: 'get'
    })
}


// 下载文件
export function get_download(uuid: string, filename: string) { 
    return request({
        url: '/api/download/'+ uuid + '/' + filename, 
        method: 'get',
        responseType: 'blob'
    })
}

// 保存C3分析报告信息
export function add_reportInfo(formAddData: any) {
    return request({
        url: '/api/c3/report/create',
        method: 'post',
        data: formAddData,
        options: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}

// 修改C3分析报告信息
export function edit_reportInfo(editdData: any) {
    return request({
        url: '/api/c3/report/update',
        method: 'put',
        data: editdData,
        options: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}

// 删除上传的文件
export function delet_file(data: any) { 
    return request({
        url: '/api/delete/file',
        method: 'DELETE',
        data: data,
        options: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}

// 撤回 
export function back_reportInfo(timeoutId: string) {
    return request({
        url: '/api/c3/report/retract/'+timeoutId, 
        method: 'put',
        options: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}

// 全部审查记录 下载
export function get_archiveReportDownload() { 
    return request({
        url: '/api/excel/exportC3TimeoutInfoExcel',
        method: 'get',
        responseType: 'blob'
    })
}

// 待审查记录 下载
export function get_reviewReportDownload() { 
    return request({
        url: '/api/excel/exportC3ReviewReportExcel',
        method: 'get',
        responseType: 'blob'
    })
}

// 待复核  C3分析报告完成时的附加选项  
export function check_reportStatus(formAddData: any) {
    return request({
        url: '/api/c3/report/complete',
        method: 'post',
        data: formAddData,
        options: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
}