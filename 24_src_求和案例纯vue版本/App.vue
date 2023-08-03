<template>
  <div>
    <Count></Count>
  </div>
</template>

<script>
// 引入Category组件
import Count from "./components/Count";

export default {
  name: "App",
  // 注册组件
  components: { Count },
};
</script>

<style lang="css" scoped>
</style>
