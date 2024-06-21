import { createApp } from 'vue'
// import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
import store from './store'
// const pinia = createPinia();

// createApp(App).use(router).use(pinia).use(Antd).mount('#app')
createApp(App).use(router).use(store).use(Antd).mount('#app')
