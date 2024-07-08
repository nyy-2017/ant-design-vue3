import { createApp } from 'vue';
import App from './App.vue';
import router from './permission';
import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css'
import store from './store/index';
// import { setupStore } from '@/store'
// import '@/components/VxeTable/src/css/index.scss';
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import '@/assets/icons/iconfont.css' // 阿里图标库css

import 'normalize.css';
import 'uno.css';
import './styles/index.scss';

createApp(App).use(router).use(store).use(Antd).use(VXETable).mount('#app')
