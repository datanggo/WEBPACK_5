<template>
  <div class="todo-header">
    <input
      type="text"
      placeholder="请输入你的任务名称，按回车键确认"
      v-model="title"
      @keyup.enter="add"
    />
  </div>
</template>

<script>
// 引入第三方库，即nanoid自动生成唯一id
import { nanoid } from "nanoid"; //这是分别暴露的引入方式

// 向外暴露MyHeader组件
export default {
  name: "MyHeader",
  data() {
    return {
      title: "",
    };
  },
  //接收app组件穿过来的receive插入数据
  props: ["receive"],
  methods: {
    /* add(e) {
      // console.log(e.target.value);
      const todoObj = { id: nanoid(), title: e.target.title, done: false };
    }, */
    add() {
      // 如果this.title为空就直接结束函数,.trim()清除空格
      if (!this.title.trim()) return alert("请输入内容");
      // console.log(e.target.value);
      const todoObj = { id: nanoid(), title: this.title, done: false };
      // 把新生成的数据通过传参的方式传给receive函数，即app组件定义的插入函数
      this.receive(todoObj);
      // 完成后把输入框清空
      this.title = "";
    },
  },
};
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
