import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import '@/styles/index.css'

// 创建应用
const app = createApp(App)

// 创建Pinia实例
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 注册插件
app.use(pinia)
app.use(router)

// 挂载应用
app.mount('#app')
