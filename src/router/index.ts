// @ts-ignore
import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { routerData } from '../assets/index.js'  // 指定路由的 json文件 封装
const getMapRoutes = routerData().router

console.log('getMapRoutes:', getMapRoutes)

const modules = import.meta.glob('../views/**/**.vue')
// 路由文件 路径封装
const _import = (file: string) => {
    // 路由懒加载
    return modules[`../views/${file}.vue`]
}

// 定义路由
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: _import("Login")
        // component: () => import("../views/Login.vue"),
    },
    {
        path: "/404",
        component: _import("error/index"),
        meta: {
            keepAlive: false,
            title: '404'
        }
    },
    {
        path: '/refresh',
        component: _import("refresh")
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
    //         {
    //             path: "/role",
    //             component: () => import("../views/systems/role.vue"),
    //             name: '角色信息',
    //             meta: {
    //                 title: '角色信息',
    //             }
    //         },
    //         {
    //             path: "/user",
    //             component: () => import("../views/systems/user.vue"),
    //             name: '用户信息',
    //             meta: {
    //                 title: '用户信息',
    //             }
    //         },
    //         {
    //             path: "/menu",
    //             component: () => import("../views/systems/menu.vue"),
    //             name: '菜单信息',
    //             meta: {
    //                 title: '菜单信息',
    //             }
    //         },
    //         {
    //             path: "/person",
    //             component: () => import("../views/systems/person.vue"),
    //             name: '个人信息',
    //             meta: {
    //                 title: '个人信息',
    //             }
    //         }
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

/**
 * 过滤路由
 */
// export function filtersRouter(data) {
//     for (let i = 0; i < data.length; i++) {
//         if (data[i].component !== undefined || data[i].component !== null) {
//             data[i].component = _import(data[i].component)
//         }

//         if (data[i].children !== undefined && data[i].children.length > 0) {
//             filtersRouter(data[i].children)
//         }
//     }
//     return data
// }

// export const asyncRouterMap = filtersRouter(JSON.parse(JSON.stringify(getMapRoutes)))
// console.log('asyncRouterMap:', asyncRouterMap)

// 导入路由，使用history模式
const router = createRouter({
    history: createWebHashHistory(),
    // history: createWebHistory(),
    routes
})
 
export default router
