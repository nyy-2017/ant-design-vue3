// 根据id递归查找所有上级id
// 递归查找上级
const findParent = (list, id, arr) => {
  for (let item of list) {
    if (item.id=== id) {
      arr.push(item.id) // 要id就push item.id, 要对象就push item
      return true
    }
    if (item.children&& item.children.length > 0) {
      let isFind = findParent(item.children, id, arr)
      if (isFind) {
        arr.push(item.id) // 要id就push item.id, 要对象就push item
        return true
      }
    }
  }
  return false
} 
//   // 比如这个是需要调用的函数
//   const getList = () => {
//     let arr = []
//     findParent(state.lists, id, arr) //（数组，目标id, 定义的数组）
//     console.log(arr) //这个数组就是你要的id集合
//   }


// 递归查询父级的name
const findParentName = (list: any, row: any) => {
  let parentName: any
  if (row.children == null) {
    for (let item of list) {
      if (row.parentId === item.dataNum) {
        return parentName = item.orgName
      } else {
        if (item.children && item.children.length > 0) {
          let isFind = findParentName(item.children, row)
          if (isFind) {
            // console.log('isFind:', isFind)
            return parentName = isFind
          }
        }
      }
    } 
  } else {
    parentName = row.orgName
  }
  return parentName
}

export {
  findParent,
  findParentName
}
