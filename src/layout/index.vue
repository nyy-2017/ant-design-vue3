<template>
  <a-layout class="h-100vh">
    <a-layout-sider theme="light" :collapsed="isCollapse">
      <side-bar :isCollapse="isCollapse" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="bg-#fff! px-20px!">
        <Header v-model:isCollapse="isCollapse" />
      </a-layout-header>
      <a-layout-content class="p-20px bg-#fff overflow-auto!">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Header from './header.vue';
  import sideBar from './sideBar.vue';
  const isCollapse = ref(false);
</script>

<style lang="scss" scoped>
:where(.css-dev-only-do-not-override-19iuou).ant-layout .ant-layout-sider {
  max-width: 230px !important;
  flex: 0 0 230px !important;
  width: 230px !important;
}

.ant-layout-header {
  border-bottom: 1px solid #ccc;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 24%);
}
</style>
