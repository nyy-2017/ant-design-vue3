// import { createStore } from 'vuex'
// import user from './modules/user'
// export default createStore({
//     modules: {
//         user
//     }
// })

import type { App } from 'vue'
import { createPinia } from 'pinia'
import { registerPiniaPersistPlugin } from './plugin/persist'
 
const store = createPinia()
registerPiniaPersistPlugin(store)
 
export function setupStore(app: App<Element>) {
  app.use(store)
}
 
export { store }