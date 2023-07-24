<template>
  <div>
    <!-- 使用组件 -->
    <School />
    <hr />
    <Student />
  </div>
</template>

<script>
// 汇总所有的组件

// 引入school组件
import School from "./components/School";
// 引入Student组件
import Student from "./components/Student";

export default {
  // 定义组件名
  name: "App",
  //   注册组件
  components: { Student, School },
};
</script>

<style>
</style>