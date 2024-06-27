import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 导入path
import path from 'path'
const resolve = (dir: string) => path.resolve(__dirname, dir)

// 引入 Unocss 样式插件
import Unocss from 'unocss/vite';
import { presetAttributify, presetUno, presetIcons } from 'unocss';

// 引入
import requireTransform from 'vite-plugin-require-transform';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [presetUno(), presetAttributify(), presetIcons()],
    }),
    // passing string type Regular expression
    requireTransform({
      fileRegex:/.js$|.jsx$|.json$|.vue$/
    }),
    // requireTransform({ fileRegex: /^(?!.*node_modules).*\.(js|jsx|ts|tsx)$/, })
  ],
  server: {
    host: "0.0.0.0",
    port: 3000, // 自定义端口号
    open: true, // 服务启动时是否自动打开浏览器
    proxy: {
      // 选项写法
      '/api': {
        target: 'http://172.16.2.195:8101',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    /*,
    // 正则表达式写法
    '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, '')
      },
      // 使用 proxy 实例
    '/api': {
      target: 'http://jsonplaceholder.typicode.com',
      changeOrigin: true,
      configure: (proxy, options) => {
      // proxy 是 'http-proxy' 的实例 }
    }*/
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/mixins.scss" as *;`,
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue'],
    // 配置路径别名， @就代表当前项目的绝对路径 
    // __dirname是一个全局变量，表示当前模块所属目录的绝对路径
    // path.resolve返回一个以相对于当前的工作目录（working directory）的绝对路径, 
    // 比如当前工作目录为 D:\205\wms-web 那么 @ 就代表 D:\205\wms-web\src
    alias: {
      // '@': path.resolve(__dirname, './src'),
      // '@': path.resolve(__dirname, 'src')
      '@': resolve('src'),
    }
  }
})
