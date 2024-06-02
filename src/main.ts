
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { setupStore } from "@/store";
import { setupDirective } from "@/directive"; // 指令
import { setTheme } from "./utils/theme";
import btnPerms from "@/directive/btnPerms/index";
import horizontalScroll from "el-table-horizontal-scroll";
import Components from "unplugin-vue-components/vite";
import ElementUI from "element-plus";
import "@soybeanjs/vue-materials/dist/style.css";

//
setTheme();
import "@/permission";
import "virtual:svg-icons-register"; // 本地SVG图标
import i18n from "@/lang/index";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import 'element-plus/dist/index.css'

//css
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/styles/index.scss";
import "uno.css";
const app = createApp(App);
setupDirective(app);
setupStore(app);
// 动态指令 v-has: 权限按钮
btnPerms(app);
app.directive("parent-menu", {
  bind(el, binding, vnode) {
    const parentMenuItemGroup = el.querySelector(".el-menu-item-group");
    if (parentMenuItemGroup) {
      parentMenuItemGroup.addEventListener("click", () => {
        vnode.context.$emit("select", { index: vnode.context.index });
      });
    }
  },
});
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router).use(i18n).use(horizontalScroll).mount("#app");

app.config.warnHandler = () => null
