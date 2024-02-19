<template>
  <div>
    <Card></Card>
    <Sale></Sale>
    <Observe></Observe>
  </div>
</template>

<script>
// 引入首页的子组件
import Card from "./Card";
import Sale from "./Sale";
import Observe from "./Observe";
export default {
  name: "Dashboard",

  // 挂载完毕
  mounted() {
    this.$store.dispatch("getData");
  },

  // 注册子组件
  components: {
    Card,
    Sale,
    Observe,
  },
};
</script>

<style scoped></style>
