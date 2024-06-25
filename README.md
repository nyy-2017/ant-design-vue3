# Vue 3 + TypeScript + Vite

# 项目搭建过程
1. 
2. 
3. 
4.安装less  npm install -D less
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