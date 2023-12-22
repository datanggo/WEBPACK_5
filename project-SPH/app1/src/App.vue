<template>
  <div>
    <!-- 我是跟组件 -->
    <!-- 使用其他组件 -->
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- footer组件在home  或 search显示的 ，注册或者是登录的时候是隐藏的-->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>
<script>
// 引入Header路由
import Header from "./components/Header";

// 引入Footer路由
import Footer from "./components/Footer";
export default {
  name: "app",
  // 注册路由
  components: {
    Header,
    Footer,
  },
};
</script>
<style lang="">
</style>