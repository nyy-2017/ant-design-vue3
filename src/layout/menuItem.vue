<template>
  <template v-for="item in routes" :key="item.path">
    <a-menu-item
      :key="item.path"
      v-if="!item.children || item.children.length === 0"
    >
      <template #icon>
        <!-- <svg-icon
          class="text-14px mr-4px"
          v-if="item.meta && item.meta.icon"
          :name="item.meta.icon as string"
        /> -->
        <i class="text-14px mr-4px" v-if="item.meta && item.meta.icon" :class="'iconfont icon-' + item.meta.icon"></i>

      </template>
      <span>{{ item.meta?.title }}</span>
    </a-menu-item>
    <template v-else>
      <a-sub-menu :key="item.path">
        <template #icon>
          <!-- <svg-icon
            class="text-14px mr-4px"
            v-if="item.meta && item.meta.icon"
            :name="item.meta.icon as string"
          /> -->
          <i class="text-14px mr-4px" v-if="item.meta && item.meta.icon" :class="'iconfont icon-' + item.meta.icon"></i>
        </template>
        <template #title>
          <span>{{ item.meta?.title }}</span>
        </template>
        <menuItem :routes="item.children" />
      </a-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router';

defineOptions({
  name: 'menuItem',
});
defineProps<{ routes: Array<RouteRecordRaw> }>();
</script>
