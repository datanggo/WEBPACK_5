// 此为vue的入口文件

// 引入vue
import Vue from "vue";
// 引入app组件
import App from "./App.vue";
// 关闭默认的生产提示
Vue.config.productionTip = false;

// 此为简写
/* new Vue({
  render: h => h(App),
}).$mount('#app') */

new Vue({
  el: "#app",
  render: (createElement) => createElement(App),

  // 安装全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});
