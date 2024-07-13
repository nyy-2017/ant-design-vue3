<template>
  <a-menu
    v-model:openKeys="menuState.openKeys"
    v-model:selectedKeys="menuState.selectedKeys"
    class="h-100% w-232px"
    mode="inline"
    theme="dark"
    :inline-collapsed="props.isCollapse"
    @click="handleClickMenu"
  >
    <!-- logo图-->
    <div class="logo">
      <img src="@/assets/images/logo1.png" />
      <span v-if="!props.isCollapse">&nbsp;六捷C3超时管理系统</span>
    </div>

    <MenuItem :routes="routes" v-if="routes"></MenuItem>
  </a-menu>
</template>

<script setup lang="ts">
import { MenuProps } from 'ant-design-vue/es';
import MenuItem from './menuItem.vue';
import { RouteRecordRaw, useRoute, useRouter } from "vue-router";
import { reactive, computed, onMounted, watch, watchEffect } from 'vue';

const props = defineProps<{ isCollapse?: boolean }>();
const route = useRoute();
const router = useRouter();

const routes = computed(() => {
  function _noHidden(_routes: RouteRecordRaw[]) {
    const filterRoute: RouteRecordRaw[] = [];
    _routes.forEach((_route) => {
      if (!_route?.meta?.isHidden) {
        if (!_route.children || _route.children.length === 0) {
          filterRoute.push(_route);
        } else {
          filterRoute.push({
            ..._route,
            children: _noHidden(_route.children)! || [],
          });
        }
      }
    });
    return filterRoute;
  }
  return _noHidden(
    router.getRoutes().find((item) => item.name === 'layout')!.children
  );
});
const menuState = reactive<{ selectedKeys: string[]; openKeys: string[] }>({
  selectedKeys: [],
  openKeys: [],
});
const handleClickMenu: MenuProps['onClick'] = (menuInfo) => {
  // console.log('menuInfo:', menuInfo)
  router.push({ path: menuInfo.key as string });
  menuState.selectedKeys = [menuInfo.key]
  localStorage.setItem('menuState', JSON.stringify(menuState) ) 
};

watch(() => menuState.openKeys,
  val => {
    console.log('openKeys:', val, menuState);
    localStorage.setItem('menuState', JSON.stringify(menuState) ) 
  }
);
onMounted(() => { 
  console.log("页面装载了", route, localStorage.getItem('menuState'))
  if(localStorage.getItem('menuState')){
    menuState.selectedKeys =  localStorage.getItem('menuState')? JSON.parse(localStorage.getItem('menuState')).selectedKeys  : [] 
    menuState.openKeys =  localStorage.getItem('menuState')? JSON.parse(localStorage.getItem('menuState')).openKeys :[] 

  }else {

    menuState.selectedKeys = [route.path]
  }
});
watchEffect(() => {
  // menuState.selectedKeys = [route.path];
  // const keyList: any = route.path.slice(1).split('/');
  // if (keyList.length === 1 || props.isCollapse) {
  //   menuState.openKeys = [''];
  //   return;
  // }
  // for (let index = 0; index < route.path.length; index++) {
  //   if (route.path[index] === '/') {
  //     menuState.openKeys.push(route.path.substr(0, index));
  //   }
  // }
  // menuState.openKeys.shift();
});
</script>

<style lang="scss" scoped>
  .logo {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #001529;
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    img {
      width: 36px;
      height: 36px;
      vertical-align: middle;
      margin-left: 10px;
    }
    span {
      font-size: 19px;
      font-weight: bold;
    }
  }
</style>
