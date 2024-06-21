// @ts-ignore
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// 定义路由
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import("../views/Login.vue")
    },
    {
        path: "/404",
        component: () => import("../views/error/index.vue"),
        meta: {
            keepAlive: false,
            title: '404'
        }
    },
    {
        path: "/home",
        component: () => import("../views/Home.vue"),
        redirect: '/organ',
        children: [
            {
                path: "/organ",
                component: () => import("../views/systems/organ.vue"),
                name: '机构信息',
                meta: {
                    title: '机构信息',
                }
            },
            {
                path: "/role",
                component: () => import("../views/systems/role.vue"),
                name: '角色信息',
                meta: {
                    title: '角色信息',
                }
            },
            {
                path: "/user",
                component: () => import("../views/systems/user.vue"),
                name: '用户信息',
                meta: {
                    title: '用户信息',
                }
            },
            {
                path: "/menu",
                component: () => import("../views/systems/menu.vue"),
                name: '菜单信息',
                meta: {
                    title: '菜单信息',
                }
            },
            {
                path: "/person",
                component: () => import("../views/systems/person.vue"),
                name: '个人信息',
                meta: {
                    title: '个人信息',
                }
            }
        ]
    },
    {
        path: '/userReg',
        component: () => import("../views/Register.vue"),
        meta: {
            title: '注册信息',
        }
    }
]
//导入路由，使用history模式
export default createRouter({
    history: createWebHashHistory(),
    routes
})