import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import VantCom from "@/components/Vant";
import ElementPlus from "element-plus";
import router from "./router/index";
import App from "./App.vue";
import "./style/index.less";
import "vant/lib/index.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
let urls = [
  "/image/avatar/avatar1.png",
  "/image/avatar/avatar2.png",
  "/image/avatar/avatar3.png",
  "/image/avatar/avatar4.png",
  "/image/avatar/avatar5.png",
  "/image/avatar/avatar6.png",
  "/image/avatar/avatar7.png",
  "/image/avatar/avatar8.png",
  "/image/avatar/avatar9.png",
  "/image/avatar/avatar10.png",
  "/image/cardDesk.png",
  "/image/cards.png",
];
//加载图片资源
urls.forEach(url => {
  const img = new Image();
  img.src = url;
});
Object.values(VantCom).forEach((component) => {
  app.use(component);
});
app.use(pinia);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
