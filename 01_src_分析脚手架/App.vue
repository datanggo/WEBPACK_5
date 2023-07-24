<template>
  <div>
    <School></School>
    <Student></Student>
  </div>
</template>

<script type="javascript">
// 因为app组件是汇总所有的组件，所以此处要引入组件

// 引入组件
import School from "./components/School.vue"; //此为统一暴露的引入方法
import Student from "./components/Student.vue"; //此为默认暴露的引入方式

export default {
  name: "App",
  components: {
    School,
    Student,
  },
};
</script>

<style></style>
