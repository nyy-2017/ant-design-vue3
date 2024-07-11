<template>
  <div class="header-container h-100%">
    <div class="flex justify-center items-center" style="min-width: 100px;">
      <span class="cursor-pointer mr-14px text-20px flex justify-center items-center">
        <a-button type="primary" @click="emits('update:isCollapse', !isCollapse)">
          <MenuUnfoldOutlined v-if="isCollapse" />
          <MenuFoldOutlined v-else />
        </a-button>
      </span>

      <!-- <i-ep:fold v-if="!isCollapse" />
      <i-ep:expand v-else /> -->

      <!-- 面包屑 -->
      <a-breadcrumb separator="/">
        <template v-for="(item, index) in breadcrumbs" :key="item.path">
          <a-breadcrumb-item
            :to="{ path: item.path }"
            v-if="index !== breadcrumbs.length - 1"
          >
            {{ item.title }}
          </a-breadcrumb-item>
          <a-breadcrumb-item v-else>{{ item.title }}</a-breadcrumb-item>
        </template>
      </a-breadcrumb>
    </div>
    <!-- 右侧部分内容 -->
    <div class="flex justify-center items-center">
      <!-- 新版旧版 审核分析报告 -->
      <span class="report_css">
        <a-tooltip class="item" v-if="activePath === '/c3analysis'" title="新版待审核分析报告" placement="bottom">
          <i class="iconfont icon-fenxibaogao" style="font-size:18px;" @click="newReporRouter(activePath)">
            <span> 切换新版 </span>
          </i>
        </a-tooltip>
  
        <a-tooltip class="item" v-else-if="activePath === '/newReport'" title="旧版待审核分析报告" placement="bottom">
          <i class="iconfont icon-fenxibaogao1" style="font-size:18px" @click="newReporRouter(activePath)">
            <span> 切换旧版 </span>
          </i>
        </a-tooltip>
      </span>
      <!-- 全屏 -->
      <span @click="toggleFullScreen" class="fullScreen_css">
        <a-tooltip class="item" :title="!isFullScreen ? '全屏':'退出全屏'" placement="bottom">
          <i :class="!isFullScreen ? 'iconfont icon-quanping2':'iconfont icon-quanping1'" 
            style="font-size:22px"></i>
        </a-tooltip>
      </span>
      <!-- 退出登录 -->
      <a-dropdown>
        <span class="flex justify-center items-center outline-none logout_css">
          <img src="@/assets/images/header.png" class="w-25px h-25px b-rd-50%" />
          <span class="ml-4px" style="font-size:18px"> 
            {{ getUserInfo.user.nickName }}
            <DownOutlined />
          </span>
        </span>
        <template #overlay>
          <a-menu @click="handleLogout">
            <a-menu-item key="logout">
              <i class="iconfont icon-dengchu" style="margin-right: 5px;"></i>
              <!-- <i-ep:switch-button class="mr-4px vertical-mid mt--5px" /> -->
              登出
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MenuProps } from 'ant-design-vue/es';
import { DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined, } from '@ant-design/icons-vue';
import { RouteRecordRaw, useRoute, useRouter } from "vue-router";
// import { reactive, ref, toRaw, unref, computed, onMounted, watchEffect, watch } from 'vue';
import { ref, computed, watch } from 'vue';
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore();
const activePath = ref(''); // header 新旧版路由切换变量

// 获取用户名
const getUserInfo = computed(() => {
  const { user = '' } = userStore.getUserInfo || {};
  return { user };
});

// console.log('getUserInfo:', getUserInfo, userStore.userInfo)

// 退出全屏方法
const isFullScreen = ref(false);
const toggleFullScreen = () => {
  if (!document.fullscreenElement && !isFullScreen.value) {
    // 进入全屏
    document.documentElement.requestFullscreen().then(() => {
      isFullScreen.value = true;
    });
  } else {
    // 退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        isFullScreen.value = false;
      });
    }
  }
};

defineProps<{ isCollapse?: boolean }>();
const emits = defineEmits(['update:isCollapse']);

// const { clearCache } = useLocalCache();
const route = useRoute();
const router = useRouter();
const layoutRoutes = computed(
  () => router.getRoutes().find((item) => item.name === 'layout')?.children
);
const breadcrumbs = computed(() => {
  const breadcrumbArr: Array<{
    path: string;
    title: string;
    subTitle?: string;
  }> = [];
  const findBreadcrumb = (
    routes: Array<RouteRecordRaw>,
    parentRoute: RouteRecordRaw | null = null
  ) => {
    for (let index = 0; index < routes.length; index++) {
      const item = routes[index];
      if (item.path === route.path && item.meta?.title) {
        parentRoute &&
          parentRoute.meta &&
          breadcrumbArr.push({
            title: parentRoute!.meta.title as string,
            path: parentRoute.path,
          });
        breadcrumbArr.push({
          title: item.meta.title as string,
          path: item.path,
        });
        break;
      } else if (item.children && item.children.length > 0) {
        findBreadcrumb(item.children, item);
      }
    }
  };
  layoutRoutes.value && findBreadcrumb(layoutRoutes.value);
  return breadcrumbArr;
});

const handleLogout: MenuProps['onClick'] = ({ key }) => {
  if (key === 'logout') {
    // clearCache();
    // window.location.reload();
    // store 里面的退出登录方法
    userStore.userLogOut();
    setTimeout(() => {
      router.push({ path: '/login' })
    }, 300)
  }
};

// 监听路由方法
watch(() => router.currentRoute.value, (newValue: any) => {
    console.log('newValue:', newValue)
    // console.log('newValue：', newValue, window.location.pathname)
    activePath.value = window.location.pathname
  },
  { immediate: true }
);

// 新旧版本的分析报告 路由切换
const newReporRouter = (item: string) => {
  // console.log('item:', item)
  if (item === '/c3analysis') {
    router.push("/newReport")
  } else if (item === '/newReport') {
    router.push("/c3analysis")
  }
};


</script>

<style lang="scss" scoped>
.header-container {
  @include flex(center, space-between);
}
.report_css {
  margin-right: 20px;
  .item {
    span {
      font-size: 12px;
      cursor: pointer;
    }
  }
}
.fullScreen_css {
  margin-right: 25px;
  cursor: pointer;
}
.logout_css {
  cursor: pointer;
}
</style>
