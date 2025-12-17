import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueLazyLoad from 'vue3-lazyload'
import Toast, { POSITION, type PluginOptions } from 'vue-toastification'

import App from './App.vue'
import router from './router'
import './assets/css/style.css'
import 'vue-toastification/dist/index.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const toastOptions: PluginOptions = {
  timeout: 2000,
  position: POSITION.TOP_CENTER,
}

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueLazyLoad, {})
app.use(Toast, toastOptions)

app.mount('#app')
