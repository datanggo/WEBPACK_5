// 此为入口文件

// 引入vue
import Vue from "vue";
// 引入App组件
import App from "./App.vue";
// 关闭生成提示
Vue.config.productionTip = false;

/* new Vue({
  render: (h) => h(App),
}).$mount("#app"); */
new Vue({
  el: "#app",
  render: (createElement) => createElement(App),
});
