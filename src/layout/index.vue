<template>
  <a-layout class="h-100vh">
    <a-layout-sider theme="light" :collapsed="isCollapse"> 
      <side-bar :isCollapse="isCollapse" />
    </a-layout-sider>

    <a-layout>
      <a-layout-header class="h-60px! bg-#fff! px-20px!" style="line-height: 60px!important;">
        <Header v-model:isCollapse="isCollapse" />
      </a-layout-header>
      <a-layout-content class="p-20px bg-#f5f7fa overflow-auto!">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import Header from './header.vue';
  import sideBar from './sideBar.vue';
  const isCollapse = ref(false);
  watch(()=> isCollapse.value,
    val => {
      console.log('isCollapse:', val);
    }
  );
</script>

<style lang="scss" scoped>
.ant-layout-header {
  border-bottom: 1px solid #ccc;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 24%);
}
.ant-layout-sider:not(.ant-layout-sider-collapsed) {
  min-width: 232px !important;
  flex: 0 0 232px!important;
  max-width: 232px!important;
  width: 232px!important;
}
</style>
