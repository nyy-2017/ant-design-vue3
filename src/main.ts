import { createApp } from 'vue';
import App from './App.vue';
import router from './permission';
import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css'
// import store from './store';
import { setupStore } from '@/store'


import '@/assets/icons/iconfont.css' // 阿里图标库css

import 'normalize.css';
import 'uno.css';
import './styles/index.scss';

createApp(App).use(router).use(setupStore).use(Antd).mount('#app')
