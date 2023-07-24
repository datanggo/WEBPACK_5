<template>
  <div>
    <!-- 使用组件 -->
    <Student name="李四" sex="女" :age="20" />
  </div>
</template>

<script>
// 汇总所有的组件

// 引入school组件
import Student from "./components/Student";

export default {
  // 定义组件名
  name: "App",
  //   注册组件
  components: { Student },
};
</script>

<style>
</style>