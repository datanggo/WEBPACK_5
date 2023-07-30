// 此为vue的入口文件

// 引入vue
import Vue from "vue";
// 引入app组件
import App from "./App.vue";

//引入插件vue-resource，即ajax请求插件
import vueResource from "vue-resource";
// 关闭默认的生产提示
Vue.config.productionTip = false;

// 此为简写
/* new Vue({
  render: h => h(App),
}).$mount('#app') */

//使用插件，发起ajax请求的插件
Vue.use(vueResource);

new Vue({
  el: "#app",
  render: (createElement) => createElement(App),

  // 安装全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});
