<template>
  <div class="app">
    <h1>{{ msg }}{{ studentName }}</h1>
    <!-- 通过父组件给子组件传递函数类型的porps实现，子组件给父组件传递数据 -->
    <School :getSchool="getSchool" />

    <!-- 通过父组件给子组件绑定一个自定义事件实现：子组件给父组件传递数据 第一种写法使用@或c-on -->
    <!-- <Students v-on:atguigu="getStudentName" /> -->

    <!-- 通过父组件给子组件绑定一个自定义事件实现：子组件给父组件传递数据 第一种写法使用ref属性 -->
    <!-- <Students ref="students" @demo="m1" @click="show" /> -->
    <!-- 原生事件click定义时不加native系统默认当自定义属性使用 -->
    <Students ref="students" @demo="m1" @click.native="show" />
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
      studentName: "",
    };
  },
  methods: {
    show() {
      console.log("GUGO");
    },

    getSchool(name) {
      console.log("app收到了学校名：", name);
    },
    // params参数
    getStudentName(name, ...params) {
      console.log("app收到了学生名：", name, params);
      this.studentName = name;
    },

    // 自定义事件m1
    m1() {
      console.log("demo事件被触发了");
    },
  },
  // mounted声明周期函数，挂载完执行
  mounted() {
    // 当前文件里ref为students的绑定一个atguigu事件，触发后执行的函数为getStudentName
    this.$refs.students.$on("atguigu", this.getStudentName); //绑定自定义事件
    // this.$refs.students.$once("atguigu", this.getStudentName); //绑定自定义事件，只触发一次
  },
};
</script>

<style scoped>
.app {
  background-color: blueviolet;
  padding: 5px;
}
</style>
