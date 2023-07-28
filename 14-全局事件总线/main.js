// 此为入口文件

// 引入vue
import Vue from "vue";
// 引入App组件
import App from "./App.vue";
// 关闭生成提示
Vue.config.productionTip = false;

// const Demo = Vue.extend()
// const d = new Demo()
// Vue.prototype.x = d

/* new Vue({
  render: (h) => h(App),
}).$mount("#app"); */
const vm = new Vue({
  el: "#app",
  render: (createElement) => createElement(App),
  beforeCreate() {
    // 即在beforeCreate钩子上执行，在vue原型身上放一个x的属性，即是当前的实例对象
    Vue.prototype.$bus = this   //安装全局事件总线
  }
});
