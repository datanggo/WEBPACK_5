//该文件专门用于创建整个应用的路由器
import Vue from "vue";
// 引入插件
import VueRouter from "vue-router";

// 引入组件
import About from "../pages/About";
import Home from "../pages/Home";

// 引入Home组件下的组件
import News from "../pages/News";
import Message from "../pages/Message";

//引入Message下的组件
import Detail from "../pages/Detail";

// 创建一个路由器
const router = new VueRouter({
  routes: [
    {
      //命名路由
      name: "guanyu",
      path: "/about",
      component: About,
    },
    {
      path: "/home",
      component: Home,
      children: [
        {
          path: "news",
          component: News,
        },
        {
          path: "message",
          component: Message,
          children: [
            {
              //命名路由
              name: "xiangqing",
              path: "detail",
              component: Detail,
            },
          ],
        },
      ],
    },
  ],
});

// 导出/暴露路由模块
export default router;
