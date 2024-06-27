<template>
  <a-menu
    v-model:openKeys="menuState.openKeys"
    v-model:selectedKeys="menuState.selectedKeys"
    class="h-100% w-230px"
    mode="inline"
    theme="dark"
    @click="handleClickMenu"
  >
    <!-- logo图 -->
    <div class="logo">
      <img src="@/assets/images/logo1.png" alt />
      <span>&nbsp;&nbsp;六捷C3超时管理系统</span>
    </div>
    <MenuItem :routes="routes" v-if="routes" />
  </a-menu>
</template>

<script setup lang="ts">
import { MenuProps } from 'ant-design-vue/es';
import MenuItem from './menuItem.vue';
import { useRoute, useRouter } from "vue-router";
import { reactive, ref, toRaw, unref, computed, onMounted, watchEffect } from 'vue';

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
  router.push({ path: menuInfo.key as string });
};
watchEffect(() => {
  console.log('menuState:', menuState)
  menuState.selectedKeys = [route.path];
  const keyList: any = route.path.slice(1).split('/');
  if (keyList.length === 1 || props.isCollapse) {
    menuState.openKeys = [''];
    return;
  }
  for (let index = 0; index < route.path.length; index++) {
    if (route.path[index] === '/') {
      menuState.openKeys.push(route.path.substr(0, index));
    }
  }
  menuState.openKeys.shift();

});
</script>

<style lang="scss" scoped>
  .logo {
    width: 120%;
    height: 64px;
    line-height: 64px;
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    img {
      width: 36px;
      vertical-align: inherit;
    }
    span {
      font-size: 19px;
      font-weight: bold;
    }
  }
</style>
