<template>
  <div class="students">
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生年龄：{{ age }}</h2>
    <button @click="sendStudentName">把学生名传给school组件</button>
  </div>
</template>

<script>
export default {
  name: "Students",
  data() {
    return {
      name: "张三",
      age: 18,
    };
  },
  methods: {
    sendStudentName() {
      this.$bus.$emit("hello", this.name);
    },
  },
  //即在此vc销毁之前一定要解绑自定义事件
  beforeDestroy() {
    this.$bus.$off("hello");
  },
};
</script>

<style scoped>
.students {
  background-color: springgreen;
  padding: 5px;
  margin-top: 5px;
}
</style>
