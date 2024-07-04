import type { UserInfo } from '#/store';
import type { ErrorMessageMode } from '#/axios';
import { defineStore } from 'pinia';
import { store } from '@/store';
import { RoleEnum } from '@/enums/roleEnum';
import { PageEnum } from '@/enums/pageEnum';
import { ROLES_KEY, TOKEN_KEY, REF_TOKEN_KEY, USER_INFO_KEY, BUREAU_INFO_KEY, BUREAUTREE_INFO_KEY } from '@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '@/utils/auth/index';
import { GetUserInfoModel, LoginParams } from '@/api/sys/model/userModel';
import { get_bureauList, get_currentUserBureauTree } from '@/api/sys/config/bureau';
import { doLogout, loginApi } from '@/api/sys/user';
import { get_allMenuList } from '@/api/sys/menu';
import { useI18n } from '@/hooks/web/useI18n';
import { useMessage } from '@/hooks/web/useMessage';
import { router } from '@/router';
import { usePermissionStore } from '@/store/modules/permission';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic';
import { isArray } from '@/utils/is';
import { h } from 'vue';
import { createLocalStorage } from '@/utils/cache';
const ls = createLocalStorage();
interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  reftoken?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
  bureauList: undefined;
  userBureauTreeList: undefined
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // reftoken
    reftoken: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
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
      return state.reftoken || getAuthCache<string>(REF_TOKEN_KEY);
    },
    getRoleList(state): RoleEnum[] {
      return state.roleList.length > 0 ? state.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getSessionTimeout(state): boolean {
      return !!state.sessionTimeout;
    },
    getLastUpdateTime(state): number {
      return state.lastUpdateTime;
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
      setAuthCache(REF_TOKEN_KEY, info);
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
      this.sessionTimeout = false;
    },
    async getBureauInfo(){
      const bureauInfo = await get_bureauList()
      this.bureauList = bureauInfo
      setAuthCache(BUREAU_INFO_KEY, bureauInfo)
    },
    async getBureauTreeInfo(){
      const bureauInfo = await get_currentUserBureauTree()
      this.userBureauTreeList = bureauInfo
      setAuthCache(BUREAUTREE_INFO_KEY, bureauInfo)
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginApi(loginParams, mode);
        const token = data.Authorization

        // save token
        this.setToken(token);
        this.setRefToken(data.reftoken);
        
        this.getUserInfoAction(data.loginUserInfo);
        return this.afterLoginAction(goHome)
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      this.getBureauInfo()
      this.getBureauTreeInfo()
      // get user info
      const MenuList = '';
      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        const permissionStore = usePermissionStore();
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction();
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
          permissionStore.setDynamicAddedRoute(false);
        }
        goHome && (await router.replace(MenuList?.homePath || PageEnum.BASE_HOME));
      }
      return MenuList;
    },
    async getUserInfoAction(userInfo: any): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      userInfo.roles = [
        {
          roleName: "Super Admin",
          value: "super"
        }
      ]
      if (isArray(userInfo.roles)) {
        const roleList = userInfo.roles.map((item: { value: any; }) => item.value) as RoleEnum[];
        
        this.setRoleList(roleList);
      } else {
        userInfo.roles = [];
        this.setRoleList([]);
      }
      this.setUserInfo(userInfo);
      return userInfo;
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          // await doLogout({userId: this.userInfo.user.dataNum});
        } catch {
          console.log('注销Token失败');
        }
      }
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },

    async refreshInterface(){

    }
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
function roles(roles: any) {
  throw new Error('Function not implemented.');
}

