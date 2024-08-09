// 审批状态
export function optTypeName(optType: number) {
    let optTypeData = [
        { id: -1, name: '临时保存' },
        { id: 0, name: '提交审批' },
        { id: 1, name: '审核' },
        { id: 2, name: '复核' },
        { id: 3, name: '归档' },
        { id: 4, name: '重新启动分析' },
        { id: 5, name: '撤回' },
        { id: 6, name: '修订' }
    ]
    let typeName = ''
    if (optType) {
        optTypeData.map(v => {
            if (optType == v.id) {
                typeName = v.name
            }
        })
    }
    return typeName
}

// 要在JavaScript中给字符串中所有换行段落添加缩进，可以使用正则表达式来匹配换行符，并在匹配后添加两个em单位的空格
export function indentTexts(str: string) {
    // 使用正则表达式匹配所有换行符（包括\r\n、\n、\r）
    const regex = /\r\n|\n|\r/;
    // 使用split分割字符串，并对每个段落添加缩进
    return str.split(regex).map((paragraph: string) => {
      // 判断如果段落为空，则不添加缩进
      if (paragraph.trim() === '') {
        return paragraph;
      }
      // 如果段落不为空，则添加两个em单位的缩进
      return '  '+ '  ' + '  '+ '  ' + paragraph;
    }).join('\n')
}

// 格式化 综合分析文本内容
export function formatAnalysisContent(data: string) {
    var result = ""
    if (data) {
        var result1 = data.replace(/\ /g,"")
        // str.replace(/\s+/g,"") 去除全部空格
        // console.log('result1:', result1)
        // 所有字符串的最前面 缩进2em
        result1 = '  '+ '  ' + '  '+ '  ' + result1
        // 所有换行段落前面 缩进2em
        result = result1.replace(/[\n]/g,"\n" + '  '+ '  ' + '  '+ '  ')
        // 去除所有引号
        // result = result.replace(/\"/g, "")
    }
    return result
}

// 时间 去除微秒
export function getTimeFormate(str: string) {
    // let str = '2023-11-27 19:08:34.733'
    let index = str.lastIndexOf(".")
    if (index > -1) {
        str = str.substring(0, index)
    }
    // console.log(str) // 2023-11-27 19:08:34
    return str
}

// 获取 创建报告类型 的状态
export function get_createReportType(reportFileUUID: any, dataFileUUID: any, reportFileName: any) {
    // 0 手动录入
    // 1 离线导入
    // 2 手动录入和离线导入
    let type = 0
    if (reportFileUUID && dataFileUUID) {
        type = 0 
    }
    if (reportFileName) {
        type = 1
    }
    if (reportFileUUID && dataFileUUID && reportFileName) {
        type = 2
    }
    return type
}

// 离线导入的数据类型 映射 c3超时表单 的数据类型
export function offlineDataFilter(offlineNameArr: any[]) {
    // offlineNameArr = ["PRI", "A", "Abis", "Igsm-r", "Um_AMS"]
    // c3 
    let c3DataList = [
      {value: 1, label: "Um_AMS"},
      {value: 2, label: "BMS"},
      {value: 3, label: "PRI、A、Abis"},
      {value: 4, label: "RBC业务监测"},
      {value: 5, label: "ATP日志"},
      {value: 6, label: "Igsm-r"},
      {value: 7, label: "C3业务监测"}
    ]
    let arr = []
    if (offlineNameArr) {
      c3DataList.map(k => {
        offlineNameArr.map((v: string) => {
            if (v === 'PRI' ||  v === 'A' || v === 'Abis') {
                arr.push(3)
            }
            if (k.label === v) {
                arr.push(k.value)
            }
        })
        // if (offlineNameArr.includes(k.label)) {
        //   arr.push(k.value)
        // }
      })
      arr = Array.from(new Set(arr))
    }
    // 数据类型 多选下拉框
    // console.log('arr:', arr)
    return arr
}

// 获取数据组合 根据name 获取id
export function get_dataCombinationIds(dataCombinations: any[]) {
    // let dataCombinations = ["PRI", "A", "Abis", "Igsm-r", "Um_AMS"]
    let dataCombinationArry = [
        {value: 1, label: 'PRI、A、Abis', disabled: false },
        {value: 2, label: 'Igsm-r', disabled: false },
        {value: 3, label: 'Um_AMS', disabled: false },
        {value: 4, label: 'Um_BMS', disabled: false },
        {value: 5, label: 'C3业务监测', disabled: false },
        {value: 6, label: 'RBC业务监测', disabled: false }
    ]
    let resultArr = []
    // 数据组合 哪些选项可以选
    if (dataCombinations) {
        dataCombinationArry.map(k => {
            dataCombinations.map((v: string) => {
                if (v === 'PRI' ||  v === 'A' || v === 'Abis') {
                    resultArr.push(1)
                } 
                if (k.label === v) {
                    resultArr.push(k.value)
                }
                // if (k.label.indexOf(v.replace(/,/g, "、")) != -1) {
                //     resultArr.push(k.value)
                // }
            })
        })
        resultArr = Array.from(new Set(resultArr))
    }
    // 数字类型的 数组id
    // console.log('resultArr:', resultArr)
    return resultArr.sort()
}


// 格式化 数据组合 显示 name
export function formatterDataTypeName(arr: any[], dataCombinationArry: { value: any; label: any }[]) {
    let resultArr = []
    arr.map((v: any) => {
        dataCombinationArry.map((item: { value: any; label: any }) =>{
            if (v == item.value) {
                resultArr.push(item.label)  
            }
        })
    })
    return resultArr.join('、')
}

// 判断一个变量是否是字符串
export function isString(value: any) {
    return typeof value === 'string'
}
