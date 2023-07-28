<template>
  <div class="app">
    <h1>{{ msg }}</h1>
    <School />
    <Students />
  </div>
</template>

<script>
// 引入school组件
import School from "./components/School";
// 引入students组件
import Students from "./components/Students";

export default {
  name: "App",
  components: { School, Students },
  data() {
    Students;
    return {
      msg: "你好啊",
    };
  },
};
</script>

<style scoped>
.app {
  background-color: blueviolet;
  padding: 5px;
}
</style>
