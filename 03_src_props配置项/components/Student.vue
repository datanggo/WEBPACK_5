<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>学生姓名：{{ name }}</h2>
    <h2>学校性别：{{ sex }}</h2>
    <h2>学校年龄：{{ age }}</h2>
    <h2>学校年龄：{{ myAge }}</h2>
    <button @click="updataAge">尝试修改收到的年龄</button>
  </div>
</template>

<script>
export default {
  name: "StudentMsg",
  data() {
    return {
      msg: "我是一个尚硅谷的学生",
      myAge: this.age,
    };
  },
  methods: {
    updataAge() {
      this.myAge++;
    },
  },
  //简单声明接收
  props: ["name", "sex", "age"],

  //接收的同时对数据类型进行限制
  /* props: {
    name: String,
    age: Number,
    sex: String,
  }, */

  // 接收的同时对数据进行详细的限定，必要的，默认的，类型
  /*  props: {
    name: {
      type: String, //类型是字符串
      required: true, //名字是必要的
    },
    age: {
      type: Number, //类型是数字
      default: 99, //默认值是99
    },
    sex: {
      type: String, //类型是字符串
      required: true, //是必要的
    },
  }, */
};
</script>

<style>
</style>