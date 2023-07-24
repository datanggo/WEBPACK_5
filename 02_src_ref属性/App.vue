<template>
  <div>
    <h1 v-text="msg" ref="title"></h1>
    <button ref="btn" @click="showDom">点我输出上方的DOM元素</button>
    <!-- 使用组件 -->
    <School ref="sch" />
  </div>
</template>

<script>
// 汇总所有的组件

// 引入school组件
import School from "./components/School";

export default {
  // 定义组件名
  name: "App",
  //   注册组件
  components: { School },
  data() {
    return {
      msg: "欢迎学习vue",
    };
  },
  methods: {
    showDom() {
      console.log(this.$refs.title); //真实dom元素
      console.log(this.$refs);
      console.log("@@", this.$refs.sch); //组件的实例对象
    },
  },
};
</script>

<style>
</style>