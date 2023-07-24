<template>
  <div class="demo">
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

<style scoped>
.demo {
  background-color: yellow;
  width: 300px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}
</style>

