<template>
  <div>
    <Card></Card>
  </div>
</template>

<script>
// 引入首页的子组件
import Card from "./Card";
export default {
  name: "Dashboard",

  // 注册子组件
  components: {
    Card,
  },
};
</script>

<style scoped></style>
