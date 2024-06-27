// state数据初始化
const getDefaultState = () => {
    return {
        logoTitle: '六捷C3超时管理系统',
        token: '',        
        c3UserGroups: [],          
        roles: [],            
        nickName: '',
        username: '',
        userId: null 
    }
}
const state = getDefaultState()

const mutations = {
    setToken(state: any, token: string) {
        state.token = token
    },
    setC3UserGroups(state: any, c3UserGroups: any) {
        state.c3UserGroups = c3UserGroups
    },
    setRoles(state: any, roles: any) {
        state.roles = roles
    },
    setNickName(state: any, nickName: string) {
        state.nickName = nickName
    },
    setUsername(state: any, username: string) {
        state.username = username
    },
    setUserId(state: any, userId: Number) {
        state.userId = userId
    },
    resetState: (state: any) => {
        Object.assign(state, getDefaultState())
    }
}
const actions = {
    // 用户登录
    userLogin({ commit }, resultData: any) {
        console.log('+++++++++++++', resultData)
        // 获取数据, 更新state中的数据
        commit('setToken', resultData.Authorization)
        sessionStorage.setItem('token', resultData.Authorization)
        commit('setUserId', resultData.loginUserInfo.user.dataNum)
        commit('setNickName', resultData.loginUserInfo.user.nickName)
        commit('setUsername', resultData.loginUserInfo.user.username)
        commit('setC3UserGroups', resultData.loginUserInfo.c3UserGroups)
        commit('setRoles', resultData.loginUserInfo.roles)
    },
    // 前端 登出
    userLogOut({ commit }) { 
        sessionStorage.clear() // 清空sessionStorage数据
        commit('resetState')  // 清除 store数据
        // return new Promise(resolve => {
        // reset visited views and cached views
        // dispatch('tagsView/delAllViews', null, { root: true })
        // resolve()
        //   })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
