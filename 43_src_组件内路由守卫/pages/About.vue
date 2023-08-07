<template>
  <h2>我是About的内容</h2>
</template>

<script>
export default {
  name: "About",
  beforeDestroy() {
    console.log("ABOUT组件即将被销毁了");
  },
  mounted() {
    console.log("ABOUT组件挂载完毕了");
  },

  //组件内路由守卫
  // 路由进入之前 通过路由规则进入该组件时被调用
  beforeRouteEnter(to, from, next) {
    console.log("app===beforeRouteEnter");
    next();
  },
  // 路由离开之前 通过路由规则离开该组件时被调用
  beforeRouteLeave(to, from, next) {
    console.log("App----beforeRouteLeave");
    next();
  },
};
</script>
