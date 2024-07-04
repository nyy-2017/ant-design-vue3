// stores/counter.js
import { defineStore } from 'pinia'
import { useOtherStore } from './other-store'
 
export const useCounterStore = defineStore('counter', {
  // 1. store.count++ 访问
  // 2. store.$reset() 重置
  // 3. store.$patch() 更新
  //  3.1 接收对象
  //    store.$patch({
  //      count: store.count + 1,
  //      age: 120,
  //      name: 'DIO',
  //    })
  //  3.2 接收函数
  //    store.$patch((state) => {
  //      state.items.push({ name: 'shoes', quantity: 1 })
  //      state.hasChanged = true
  //    })
  // 4. someStore.$subscribe 订阅 patch后只触发一次
  //  4.1 const someStore = useSomeStore()
  //    // 此订阅器即便在组件卸载之后仍会被保留
  //     someStore.$subscribe(callback, { detached: true })
  state: () => {
    return {
      count: 0 as number,
      userData: {},
      users: [] as { id: string }[]
    }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  getters: {
    doubleCount: state => state.count * 2,
    // ts中 返回类型**必须**明确设置
    doublePlusOne(): number {
      // 整个 store 的 自动补全和类型标注 ✨
      return this.doubleCount + 1
    },
    // 接收一个函数
    getUserById: state => {
      // getter 将不再被缓存
      return (userId: string) => state.users.find(user => user.id === userId)
    },
    // 访问其他getter
    otherGetter: (): number => {
      return this.doubleCount
    },
    // 访问其他store
    otherStore(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    }
  },
  actions: {
    increment() {
      this.count++
    },
    // 异步
    async registerUser(login: string, password: string) {
      try {
        this.userData = await api.post({ login, password })
        showTooltip(`Welcome back ${this.userData.name}!`)
      } catch (error) {
        // 访问其他store
        const otherStore = useOtherStore()
        otherStore.isAuthenticated(error)
        // 让表单组件显示错误
        return error
      }
    }
  },
  persist: true  // 开启持久化
})