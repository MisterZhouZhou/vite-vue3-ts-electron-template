import { createApp } from 'vue'
import router from '@/router'
import App from '@/App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)

// 使用状态管理
app.use(createPinia())

// 使用路由模块
app.use(router)

app.mount('#app')
