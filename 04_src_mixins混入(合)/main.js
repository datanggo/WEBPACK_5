/* 
此为入口文件
 */
// 引入vue
import Vue from "vue"
// 引入App组件
import App from "./App.vue"
// 关闭vue生产提示
Vue.config.productionTip = false

// 创建vue实例
new Vue({
    el: "#app",
    // render: createElement => createElement(App)
    render: h => h(App)
})