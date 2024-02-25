import { createApp } from 'vue'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate  from 'pinia-plugin-persistedstate'
import VantCom from "@/components/Vant";
import ElementPlus from 'element-plus'
import router from './router/index'
import App from './App.vue'
import './style/index.less'
import 'vant/lib/index.css';
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
Object.values(VantCom).forEach((component) => {
    app.use(component);
});
app.use(pinia);
app.use(router)
app.use(ElementPlus)
app.mount('#app')
