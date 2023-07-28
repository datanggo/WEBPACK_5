// 此文件为vue的入口函数

// 引入vue
import Vue from "vue"

// 引入app组件
import App from "./App"

// 关闭生产提示
Vue.config.productionTip = false

// 创建vue实例对象
new Vue({
    el: "#app",
    render: (createElement) => createElement(App),
    // 以上的简写形式
    // render: h => h(App).$mount("#app")

    /*  // 安装全局事件总线
     beforeCreate() {
         // 即在vue原型身上挂载一个$bus对象值为vue实例对象
         Vue.prototype.$bus = this
     },*/
}) 
