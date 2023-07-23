// 引入app组件
import App from "./App.vue";

Vue.config.productionTip = false; //阻止默认弹框
// 创建vue实例
new Vue({
  el: "#root",
  components: { App },
  template: `
  <div>
  <App></App>
  </div>`,
});
