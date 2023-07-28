<template>
  <div>
    <!-- 使用组件 -->
    <Test />
    <Test2 />
    <Test3 />
  </div>
</template>

<script>
// 引入Test组件
import Test from "./components/Test";
import Test2 from "./components/Test2";
import Test3 from "./components/Test3";

export default {
  name: "App",
  // 注册组件
  components: { Test, Test2, Test3 },
};
</script>

<style>
</style>