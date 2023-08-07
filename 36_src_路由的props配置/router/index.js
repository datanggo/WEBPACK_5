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
              //使用params传参时一定要配置占位符，即:id/:title这种格式
              path: "detail/:id/:title",
              component: Detail,

              //路由里的props的第一种写法   值为对象   该对象中的所有key-value都会以props的形式传给Detail组件
              // props: { a: 1, b: "hello" }

              //路由里的props的第二种写法   值为布尔值  若布尔值为真就会把该路由组件收到的所有params参数，以props的形式传给组件
              // props: true

              //路由里的props的第三种写法   值为函数
              /* props: function ($route) {
                return { id: $route.query.id, title: $route.query.title }
              }, */
              // 解构赋值的写法
              // 即传递的参数是一个对象，取对象里的query，然后再解构query对象里的id和title
              props({ query: { id, title } }) {
                return { id, title }
              }
            },
          ],
        },
      ],
    },
  ],
});

// 导出/暴露路由模块
export default router;
