/* 
此为入口文件
 */
// 引入vue
import Vue from "vue"
// 引入App组件
import App from "./App.vue"

// 引入插件install/plugins
import plugins from './plugins.js'

// 关闭vue生产提示
Vue.config.productionTip = false


// 应用插件   类似于node里的use中间件
Vue.use(plugins, 1, 23, 45)

// 创建vue实例
new Vue({
    el: "#app",
    // render: createElement => createElement(App)
    render: h => h(App)
})