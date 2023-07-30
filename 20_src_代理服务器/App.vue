<template>
  <div>
    <button @click="getStudents">获取学生信息</button>
    <button @click="getCarts">获汽车信息</button>
  </div>
</template>

<script>
// 引入第三方库axios，即ajax的库
import axios from "axios";

export default {
  name: "App",
  methods: {
    getStudents() {
      // 此处即利用ajax库axios发起get请求.then之后会有两个回调response即成功的回调，里面的data为值，error为失败的回调里面的message为错误信息
      axios.get("http://localhost:8080/api/students").then(
        (response) => {
          console.log("请求成功", response.data);
        },
        (error) => {
          console.log("请求失败", error.message);
        }
      );
    },
    getCarts() {
      // 此处即利用ajax库axios发起get请求.then之后会有两个回调response即成功的回调，里面的data为值，error为失败的回调里面的message为错误信息
      axios.get("http://localhost:8080/demo/cars").then(
        (response) => {
          console.log("请求成功", response.data);
        },
        (error) => {
          console.log("请求失败", error.message);
        }
      );
    },
  },
};
</script>

<style></style>
