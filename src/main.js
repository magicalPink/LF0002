import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import router from './router/index'
import App from './App.vue'
import store from './store/index'
import './style/index.less'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
