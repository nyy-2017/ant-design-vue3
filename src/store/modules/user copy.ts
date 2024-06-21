import { defineStore } from 'pinia'
/**
* 1.定义并导出名称为main的store容器
* 参数1：store容器的id，必须唯一,将来 Pinia会把所有的容器挂载到这个根容器下
* 参数2：选项对象state、getters、actions
*/
export const useMainStore = defineStore('main',{
    /**
    * state 类似于 vue中的 data,用来存储全局状态的
    */
    state: ()=> {
        return {
            username: '',
            token: '',
            c3UserGroups: [],
            role: []
        }
    },
    /**
    * getters：类似于computed，用来封装计算属性,有缓存的功能
    */
    getters:{

    },
    /**
    * actions：类似于组件的 methods,封装业务逻辑，修改state中的属性值
    */
    actions:{

    }
})
