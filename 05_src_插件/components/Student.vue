<template>
  <div>
    <h2>学生姓名：{{ name }}</h2>
    <h2>学校性别：{{ sex }}</h2>
  </div>
</template>

<script>
export default {
  name: "StudentMsg",
  data() {
    return {
      name: "张三",
      sex: "男",
    };
  },
};
</script>

<style>
</style>