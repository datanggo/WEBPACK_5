<template>
  <div>
    <Count></Count>
    <hr />
    <Person></Person>
  </div>
</template>

<script>
// 引入Category组件
import Count from "./components/Count";
// 引入Person组件
import Person from "./components/Person";

export default {
  name: "App",
  // 注册组件
  components: { Count, Person },
};
</script>

<style lang="css" scoped>
</style>
