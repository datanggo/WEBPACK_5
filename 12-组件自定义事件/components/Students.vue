<template>
  <div class="students">
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生年龄：{{ age }}</h2>
    <h2>当前求和为：{{ number }}</h2>
    <button @click="add">点我number++</button>
    <button @click="sendStudentName">把学生名传给app</button>
    <button @click="unsendStudentName">解绑atguigu事件</button>
    <button @click="death">销毁当前Student组件的实例(vc)</button>
    <button @click="vshow">原生事件click的操作，即必须在事件前加native</button>
  </div>
</template>

<script>
export default {
  name: "Students",
  data() {
    return {
      name: "张三",
      age: 18,
      number: "",
    };
  },
  methods: {
    vshow() {
      this.$emit("click"); //如果传递过来的原生事件在定义时不加native，那么必须采用$emit()方法来触发
    },
    add() {
      console.log("add回调被调用了");
      this.number++;
    },

    // 绑定自定义事件
    sendStudentName() {
      // 触发Student组件实例身上的atguigu事件，$emit()方法即触发事件值一触发事件名，值而传递的参数
      this.$emit("atguigu", this.name, 11, 22);
      this.$emit("demo");
    },

    // 解绑自定义事件
    unsendStudentName() {
      this.$off("atguigu"); //解绑一个自定义事件
      // this.$off(["atguigu", "demo"]); //解绑多个自定义事件
      // this.$off(); //解绑所有自定义事件
    },

    death() {
      this.$destroy(); //销毁了当前Student组件实例
    }, //销毁后所有的Student实例的自定义事件全都不奏效了
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
