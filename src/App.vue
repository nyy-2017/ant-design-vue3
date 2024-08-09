<template>
  <a-config-provider :locale="zhCN" :component-size="componentSize">
    <!--配置路由-->
    <router-view></router-view>
    <!-- <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view> -->
  </a-config-provider>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import 'dayjs/locale/zh-cn';
  const componentSize = ref<SizeType>('middle');
</script>

