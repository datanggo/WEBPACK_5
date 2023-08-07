// 引入vue
import Vue from 'vue'
// 引入app组件
import App from './App.vue'

// 引入vue-router路由器插件
import VueRouter from 'vue-router'

// 关闭默认生产提示
Vue.config.productionTip = false

// 使用路由器插件
Vue.use(VueRouter)

// 引入路由器
import router from './router/index'

new Vue({
  el: "#app",
  render: (createElement) => createElement(App),

  //配置vue-router路由器
  router: router
})