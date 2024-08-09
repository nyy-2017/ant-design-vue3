# Vue 3 + TypeScript + Vite

# 项目搭建过程

npm i --save-dev @types/nprogress
npm i --save-dev @types/crypto-js
npm i --save-dev @types/lodash-es

npm install vxe-table@next vxe-pc-ui

vue vxe-ui vxe-table 4.0-4.6 升级到 v4.7 报错
# 修改后
// ...
import VxeUI from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'
// ...

import VxeTable from 'vxe-table'
import 'vxe-table/lib/style.css'
// ...

createApp(App).use(VxeUI).use(VxeTable).mount('#app')




# 生命周期
# 选项式 API 的生命周期选项和组合式 API 之间的映射

beforeCreate -> 使用 setup()
created -> 使用 setup()
beforeMount -> onBeforeMount
mounted -> onMounted
beforeUpdate -> onBeforeUpdate
updated -> onUpdated
beforeUnmount -> onBeforeUnmount
unmounted -> onUnmounted
errorCaptured -> onErrorCaptured
renderTracked -> onRenderTracked
renderTriggered -> onRenderTriggered
activated -> onActivated
deactivated -> onDeactivated



1. import qs from 'qs' 正确安装方法
npm install @types/qs --save-dev


2. 安装了crypto-js模块
npm install crypto-js


3. 安装使用pinia 以及pinia的持久化  (https://blog.csdn.net/weixin_69890748/article/details/138345287)
npm install pinia
npm i pinia-plugin-persist

store/index.ts文件
import { createPinia } from "pinia";
 
// 创建
const pinia = createPinia();
 
// 导出
export default pinia;




pinia的持久化依赖： 
npm i pinia-plugin-persistedstate

import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' //引入持久化插件
// 创建
const pinia = createPinia();
 
// 使用插件
pinia.use(piniaPluginPersistedstate);
 
// 导出
export default pinia;


4. 安装less  npm install -D less
5. vite 不支持require的用法， webpack是支持的,  
安装转换插件: npm i vite-plugin-require-transform --save-dev
import requireTransform from 'vite-plugin-require-transform';
插件配置:
plugins: [
    // passing string type Regular expression
    requireTransform({
	    fileRegex: /.js$|.jsx$ | .vue$/ ,
	}),
],
6. npm install nprogress --save

7. npm i @vueuse/core  实现全屏功能
<div ref="el">
<div @click="toggle">
      <van-icon :name="!isFullscreen ? 'enlarge' : 'shrink'" color="red" size="40"/>
    </div>
</div>
<script setup>
import { ref } from 'vue';
import { useFullscreen } from '@vueuse/core';
const el = ref()
const { isFullscreen, toggle } = useFullscreen(el)
</script>



10. # vite-vue3项目使用@别名和自定义端口号以及解决跨域
# 自定义端口号
server: {
  port: 3000, // 自定义端口号
}

# @别名
// 导入path
import path from 'path'
resolve: {
    // 配置路径别名， @就代表当前项目的绝对路径 
    // __dirname是一个全局变量，表示当前模块所属目录的绝对路径
    // path.resolve返回一个以相对于当前的工作目录（working directory）的绝对路径, 
    // 比如当前工作目录为 D:\205\wms-web 那么 @ 就代表 D:\205\wms-web\src
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
},
# @别名爆红解决
如果提示有标红波浪,在tsconfig.json 添加如下代码.
"baseUrl": ".",
"paths": {
    "@/*": ["src/*"]
}


# 修改vite.config.js文件，安装path模块，添加@别名
1. 安装命令：npm install --save-dev @types/node
2. 配置文件：
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'   // 需安装此模块
 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})

Menu 导航菜单  https://next.antdv.com/components/menu-cn

//ant design vue中menu组件递归渲染报错解决  https://blog.csdn.net/weixin_42681295/article/details/125503518
// ant-design-vue 递归菜单+只打开一个菜单 https://blog.csdn.net/qq873113580/article/details/122743379?spm=1001.2101.3001.6650.7&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-7-122743379-blog-107593936.235%5Ev43%5Epc_blog_bottom_relevance_base5&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-7-122743379-blog-107593936.235%5Ev43%5Epc_blog_bottom_relevance_base5&utm_relevant_index=14

// 使用vue-antDesign menu 页面(添加面包屑跳转) https://blog.csdn.net/hjy170314/article/details/108103706?spm=1001.2101.3001.6650.16&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-16-108103706-blog-131919857.235%5Ev43%5Epc_blog_bottom_relevance_base5&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-16-108103706-blog-131919857.235%5Ev43%5Epc_blog_bottom_relevance_base5&utm_relevant_index=22


# 11、antd中modal模态框隐藏下面不需要的按钮
1、要求弹框全部都不展示按钮
 在a-modal上加属性： :footer="null"
2、当新增、查看、编辑共用一个弹框出现按钮文字不同时如下修改
  同样也是在a-modal上添加属性： 
  // cancelText：取消按钮文字，默认是取消，这时我们的查看需要的是返回
  // inital.type为自己定义的，用来区分是新增add还是编辑edit以及查看view
  :cancel-text="inital.type==='view'?'返回':'取消'"
3、当新增、查看、编辑共用一个弹框按钮展示不同时如下操作
  // 这里当为查看view的时候不展示确定按钮,如果是取消按钮也是同理
  :ok-button-props="{style:{display:inital.type==='view'?'none':'block'}}"

# 12、vue3 ant-design 使用a-date-picker 没有显示中文
1.在main.js中加入

  // ant-design-vue v3版本
  import "dayjs/locale/zh-cn";

  // ant-design-vue v2版本
  import moment from ‘moment’;
  import ‘moment/locale/zh-cn’;
  moment.locale(‘zh-cn’);

2.在App.vue中加入全局国际化
  <a-config-provider :locale="zhCN">
    <!--配置路由-->
    <router-view></router-view>
  </a-config-provider>
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import 'dayjs/locale/zh-cn';

