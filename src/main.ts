import { createApp } from 'vue';
import App from './App.vue';
import router from './permission';
import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css'
import store from './store';

import '@/assets/icons/iconfont.css' // 阿里图标库css

import 'normalize.css';
import 'uno.css';
import './styles/index.scss';

// import { createPinia } from 'pinia';
// const pinia = createPinia();
// createApp(App).use(router).use(pinia).use(Antd).mount('#app')

createApp(App).use(router).use(store).use(Antd).mount('#app')
