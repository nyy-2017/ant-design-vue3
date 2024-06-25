<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <div class="logo" />
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <a-sub-menu key="sub1">
                    <template #title>
                        <span>
                            <user-outlined />
                            <span>权限管理</span>
                        </span>
                    </template>
                    <router-link to="/organ">
                        <a-menu-item key="3">机构信息</a-menu-item>
                    </router-link>
                    <router-link to="/role">
                        <a-menu-item key="4">角色信息</a-menu-item>
                    </router-link>
                    <router-link to="/user">
                        <a-menu-item key="5">用户信息</a-menu-item>
                    </router-link>
                    <router-link to="/menu">
                        <a-menu-item key="5">菜单信息</a-menu-item>
                    </router-link>
                    <router-link to="/person">
                        <a-menu-item key="5">个人信息</a-menu-item>
                    </router-link>
                </a-sub-menu>
                <a-sub-menu key="sub2">
                    <template #title>
                        <span>
                            <team-outlined />
                            <span>Team</span>
                        </span>
                    </template>
                    <a-menu-item key="6">Team 1</a-menu-item>
                    <a-menu-item key="8">Team 2</a-menu-item>
                </a-sub-menu>
                <a-menu-item key="9">
                    <file-outlined />
                    <span>File</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="display: flex; background: #fff; padding: 0 10px; height: 50px; line-height: 50px;">
                <a-breadcrumb style="width: 95%; margin: 16px 0">
                    <a-breadcrumb-item>User</a-breadcrumb-item>
                    <a-breadcrumb-item>Bill</a-breadcrumb-item>
                </a-breadcrumb>
                
                <!-- 退出登录 -->
                <a-dropdown style="float:right;">
                    <a class="ant-dropdown-link" @click.prevent>
                        admin
                        <DownOutlined />
                    </a>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="1">
                                <!-- <router-link to="/"> -->
                                <a-button type="link" @click="logout">退出</a-button>
                                <!-- </router-link> -->
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </a-layout-header>
            <a-layout-content style="margin: 0 16px">
                <!-- 子路由跳转-->
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts">
    import { FileOutlined, TeamOutlined, UserOutlined, DownOutlined  } from '@ant-design/icons-vue';
    import { ref } from 'vue';
    import { useStore } from 'vuex'
    import { useRouter } from "vue-router";
    const store = useStore()
    const router = useRouter()

    // 在某个函数中触发action
    const collapsed = ref<boolean>(false)
    const selectedKeys = ref<string[]>(['1'])
    const logout = () => {
        console.log('退出成功');
        store.dispatch("user/userLogOut").then(() =>{
            router.push({ path: '/' }).catch(() => {})
        }).catch(() =>{
        })
    }

</script>

<style>
#components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
    background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
}
</style>