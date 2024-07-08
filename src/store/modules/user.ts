import { defineStore } from 'pinia'
import { get_bureauList } from '@/api/system/bureau';

// 定义一个泛型接口
interface UserState {
    userInfo: object;
    token: string;
    reftoken: string;
    roleList: any[];
    bureauList: any[];
    userBureauTreeList: any[]
}

export const useUserStore = defineStore({
    id: 'user',
    state: (): UserState => ({
        userInfo: {},
        token: '',
        reftoken: '',
        roleList: [],
        bureauList: [],
        userBureauTreeList: []
    }),
    getters: {
        getUserInfo(state): object {
            return state.userInfo;
        },
        getToken(state): string {
            return state.token;
        },
        getRefToken(state): string {
            return state.reftoken;
        },
        getRoleList(state): any[] {
            return state.roleList.length > 0 ? state.roleList : [];
        },
        getBureauList(state) {
            return state.bureauList;
        },
        getBureauTreeList(state) {
            return state.userBureauTreeList;
        }
    },
    actions: {
        setToken(info: string) {
            this.token = info; 
        },
        setRefToken(info: string) {
            this.reftoken = info; 
        },
        setRoleList(roleList: any[]) {
            this.roleList = roleList;
        },
        setUserInfo(info: object) {
            this.userInfo = info;
        },
        resetState() {
            this.userInfo = {};
            this.token = '';
            this.roleList = []
        },
        async getBureauInfo(){
            const response  = await get_bureauList() 
            const { data } = response.data
            if (data) {
                // console.log('bureauInfo:', data)
                this.bureauList = data
            }
        },
        /**
         * @description: // 用户登录
        */
        userLogin(params: any) {
            // console.log('res:', params)
            const { Authorization, reftoken, loginUserInfo }  = params.data

            // console.log('result:', Authorization, reftoken, loginUserInfo)
            // 保存/更新 token
            this.setToken(Authorization);
            this.setRefToken(reftoken);
            // 更新用户信息
            this.setUserInfo(loginUserInfo);
            return this.afterLoginAction()
        },
        async afterLoginAction() {
            if (!this.getToken) return null;
            this.getBureauInfo()
        },
        // 前端 登出
        userLogOut() { 
            localStorage.clear()
            sessionStorage.clear() // 清空sessionStorage数据
            this.setToken('');
            this.setRefToken('');
            this.setUserInfo({});
            // return new Promise(resolve => {
            // reset visited views and cached views
            // dispatch('tagsView/delAllViews', null, { root: true })
            // resolve()
            //   })
        }
    },
    // 使用该插件，开启数据缓存
    persist: {
        enabled: true,
        strategies: [
            {
                // key的名称
                key: 'userInfo',
                // 可更改为localStorage ，如果不设置，默认存储为sessionStorage 
                storage: localStorage,
                // 可以选择哪些进入local存储，这样就不用全部都进去存储了， 默认是全部进去存储
                // paths: ['token']
            }
        ]
    }
});
