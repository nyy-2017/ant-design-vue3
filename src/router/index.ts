// @ts-ignore
import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue';

// 定义路由
const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/Login/index.vue"),
    },
    {
        path: "/:pathMatch(.*)",
        name: '404',
        component: () => import("@/views/error/index.vue"),
        meta: {
            keepAlive: false,
            title: '404',
            isHidden: true
        }
    },
    {
        path: '/refresh',
        component: () => import("@/views/refresh.vue")
    },
    {
        path: "/",
        name: 'layout',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                meta: { title: '首页', icon: 'shujuzhexiantu' },
                component: () => import('@/views/home/index.vue'),
            },
            {
                path: "/C3Module",
                name: 'C3模块管理',
                // component: 'systems',
                meta: {
                    title: 'C3模块管理',
                    icon: "iconfont icon-jiankongmokuaiguanli",
                },
                children: [
                    {
                        path: "/c3analysis",
                        name: '待审核分析报告',
                        component: () => import("@/views/C3Module/c3analysis.vue"),
                        meta: {
                            title: '待审核分析报告',
                            icon: "iconfont icon-Audit-report",
                        }
                    },
                    {
                        path: "/newReport",
                        name: '新版待审核分析报告',
                        component: () => import("@/views/C3Module/newReport.vue"),
                        meta: {
                            title: '新版待审核分析报告',
                            icon: "iconfont icon-daishenhebaogao",
                        }
                    },
                ]
            },
            {
                path: "/authorization",
                name: '权限管理',
                // component: 'authorization',
                meta: {
                    title: '权限管理',
                    icon: "iconfont icon-quanxianguanli",
                },
                children: [
                    {
                        path: "/organ",
                        name: '机构信息',
                        component: () => import("@/views/authorization/organ/index.vue"),
                        meta: {
                            title: '机构信息',
                            icon: "iconfont icon-jigouxinxi",
                        }
                    },
                    {
                        path: "/role",
                        name: '角色信息',
                        component: () => import("@/views/authorization/role/index.vue"),
                        meta: {
                            title: '角色信息',
                            icon: "iconfont icon-jiaosexinxi",
                        }
                    },
                    {
                        path: "/user",
                        name: '用户信息',
                        component: () => import("@/views/authorization/user/index.vue"),
                        meta: {
                            title: '用户信息',
                            icon: "iconfont icon-yonghuxinxi",
                        }
                    },
                    {
                        path: "/menu",
                        name: '菜单信息',
                        component: () => import("@/views/authorization/menu/index.vue"),
                        meta: {
                            title: '菜单信息',
                            icon: "iconfont icon-caidanxinxi"
                        }
                    },
                    {
                        path: "/person",
                        component: () => import("../views/authorization/person/index.vue"),
                        name: '个人信息',
                        meta: {
                            title: '个人信息',
                            icon: "iconfont icon-gerenshezhi"
                        }
                    }
                ]
            }
        ]
    },
]

// 导入路由，使用history模式
const router = createRouter({
    history: createWebHistory(),
    routes
})
 
export default router;
