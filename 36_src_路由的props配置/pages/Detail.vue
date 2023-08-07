<template>
  <ul>
    <!-- 利用params传参的，所有的参数都会挂载到params -->
    <!-- <li>消息编号：{{ $route.params.id }}</li> -->
    <!-- <li>消息编号：{{ $route.params.title }}</li> -->
    <!-- 读取路由props传递的参数 -->
    <li>a:{{ id }},b:{{ title }}</li>
  </ul>
</template>

<script>
export default {
  name: "Detail",
  mounted() {
    // console.log(this.$route);
  },

  //接收路由传递的参数
  props: ["id", "title"],
};
</script>

<style></style>
