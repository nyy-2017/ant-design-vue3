import { defineStore } from 'pinia'
import type { UserInfo } from '#/store';
import { getAuthCache, setAuthCache } from '@/utils/auth/index';
import { ROLES_KEY, TOKEN_KEY, REFTOKEN_KEY, USER_INFO_KEY, BUREAU_INFO_KEY, BUREAUTREE_INFO_KEY } from '@/enums/cacheEnum';
import { get_bureauList } from '@/api/system/bureau';
import { RoleEnum } from '@/enums/roleEnum';
import { type Nullable } from '@/utils/types/utils'
import { store } from '@/store';
interface UserState {
    userInfo: Nullable<UserInfo>;
    token?: string;
    reftoken?: string;
    roleList: RoleEnum[];
    // lastUpdateTime: number;
    bureauList: undefined;
    userBureauTreeList: undefined
}

export const useUserStore = defineStore({
    id: 'app-user',
    state: (): UserState => ({
        // user info
        userInfo: null,
        // token
        token: '',
        // reftoken
        reftoken: '',
        // roleList
        roleList: [],
        bureauList: undefined,
        userBureauTreeList: undefined
    }),
    getters: {
        getUserInfo(state): UserInfo {
            return state.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
        },
        getToken(state): string {
            return state.token || getAuthCache<string>(TOKEN_KEY);
        },
        getRefToken(state): string {
            return state.reftoken || getAuthCache<string>(REFTOKEN_KEY);
        },
        getRoleList(state): RoleEnum[] {
            return state.roleList.length > 0 ? state.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
        },
        getBureauList(state) {
            return state.bureauList || getAuthCache(BUREAU_INFO_KEY);
        },
        getBureauTreeList(state) {
            return state.userBureauTreeList || getAuthCache(BUREAUTREE_INFO_KEY);
        }
    },
    actions: {
        setToken(info: string | undefined) {
            this.token = info ? info : ''; // for null or undefined value
            setAuthCache(TOKEN_KEY, info);
        },
        setRefToken(info: string | undefined) {
            this.reftoken = info ? info : ''; // for null or undefined value
            setAuthCache(REFTOKEN_KEY, info);
        },
        setRoleList(roleList: RoleEnum[]) {
            this.roleList = roleList;
            setAuthCache(ROLES_KEY, roleList);
        },
        setUserInfo(info: UserInfo | null) {
            // console.log('info222:', info)
            this.userInfo = info;
            setAuthCache(USER_INFO_KEY, info);
        },
        resetState() {
            this.userInfo = null;
            this.token = '';
            this.roleList = []
        },
        async getBureauInfo(){
            const bureauInfo = await get_bureauList()
            // this.bureauList = bureauInfo
            setAuthCache(BUREAU_INFO_KEY, bureauInfo)
        },
        // async getBureauTreeInfo(){
        //     const bureauInfo = await get_currentUserBureauTree()
        //     this.userBureauTreeList = bureauInfo
        //     setAuthCache(BUREAUTREE_INFO_KEY, bureauInfo)
        // },

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
            this.setToken(undefined);
            this.setRefToken(undefined);
            this.setUserInfo(null);
            // return new Promise(resolve => {
            // reset visited views and cached views
            // dispatch('tagsView/delAllViews', null, { root: true })
            // resolve()
            //   })
        }
    },


});

// Need to be used outside the setup
export function useUserStoreWithOut() {
    return useUserStore(store);
}
