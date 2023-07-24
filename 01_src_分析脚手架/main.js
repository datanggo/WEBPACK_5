/* 
关于不同版本的Vue
  1 Vue.js与vue.runtime.xxx.js的区别
        a vue.js是完整版的vue，包含：核心功能+模板解析器
        b vue.runtime.xxx.js是运行版本的vue，只包含：核心功能，没有模板解析器
  2 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用
    render函数接收到的createElement函数去指定具体内容
 */

/* 
该文件是整个项目的入口函数
 */
// 引入vue文件
import Vue from "vue";
// 引入app组件
import App from "./App.vue";

// 关闭vue的生产提示
Vue.config.productionTip = false;

// 创建vue实例对象-- - vm;
/* new Vue({
  render: (h) => h(App),
}).$mount("#app"); */

new Vue({
  el: "#app",
  // 简写形式
  // render:h => h(App)
  render(createElement) {
    return createElement(App);
  },
  // template: `<App></App>`,
  // components: { App },
});
