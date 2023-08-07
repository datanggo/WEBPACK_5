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
      // meta路由元信息，是程序员可以自定义属性的一个对象
      meta: {
        title: "关于"
      }
    },
    {
      name: "zhuye",
      path: "/home",
      component: Home,
      meta: {
        title: "主页"
      },
      children: [
        {
          path: "news",
          component: News,
          meta: {
            isAuth: true,
            title: "新闻"
          },

          //独享路由守卫
          beforeEnter: (to, from, next) => {
            console.log("beforeEnter进入之前", to, from)
            if (to.meta.isAuth) {//判断当前路由是否需要进行全选控制
              if (localStorage.getItem("school") === "atguigu") {
                next()
              } else {
                alert("本地存储的学校名不对，无权限")
              }
            } else {
              next()
            }
          }
        },
        {
          name: "xiaoxi",
          path: "message",
          component: Message,
          meta: {
            isAuth: true,
            title: "消息"
          },
          children: [
            {
              name: "xiangqing",
              path: "detail/",
              component: Detail,
              meta: {
                isAuth: true,
                title: "详情"
              },
              props: function ($route) {
                return { id: $route.query.id, title: $route.query.title }
              },
            },
          ],
        },
      ],
    },
  ],
});

/* //配置路由守卫
// 全局前置路由守卫——初始化时和每次路由切换之前被调用
router.beforeEach((to, from, next) => {

  // console.log("前置路由守卫",to, from);
  // 即如果本地存储的判断条件符合进行下一步
  if (to.meta.isAuth) {//判断当前路由是否需要进行全选控制
    if (localStorage.getItem("school") === "atguigu") {
      next()
    } else {
      alert("本地存储的学校名不对，无权限")
    }
  } else {
    next()
  }
})

// 全局后置路由守卫——初始化时和每次路由切换之后被调用
router.afterEach((to, from) => {
  console.log("后置路由守卫", to, from);
  // 此处即定义可以跟随页面的变动的title 后面或的即当初始化时显示的title
  document.title = to.meta.title || "测试网页"
}) */

// 导出/暴露路由模块
export default router;
