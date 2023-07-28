<template>
  <div class="students">
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生年龄：{{ age }}</h2>
    <button @click="sendStudentName">把学生名传给school组件</button>
  </div>
</template>

<script>
// 引入pubsub-js消息订阅与发布的库
import pubsub from "pubsub-js";

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
      // pubsub第三方库的publish()发布消息方法值1为消息名，值2为传递参数
      // this.$bus.$emit("hello", this.name);
      pubsub.publish("hello", 666);
    },
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
