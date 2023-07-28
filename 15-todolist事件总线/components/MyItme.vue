<template>
  <li>
    <label>
      <!-- //定义选项框的状态为每组数据的done值 -->
      <input
        type="checkbox"
        :checked="todos.done"
        @change="handleCheck(todos.id)"
      />
      <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为其修改了props -->
      <!-- <input type="checkbox" v-model="todo.done" /> -->

      <!-- 把接收过来的每一项的值插值语法到页面 -->
      <span> {{ todos.title }}</span>
    </label>
    <!-- 删除按钮绑定点击事件，并传入todos.id -->
    <button class="btn btn-danger" @click="deleteBtn(todos.id)">删除</button>
  </li>
</template>

<script>
// 向外暴露MyItme组件
export default {
  name: "MyItme",
  // 声明接收todos对象
  props: ["todos"],
  // 挂载上之后执行的函数，即生命周期函数
  // mounted() {
  //vc上的传入过来的itme
  //   console.log(this.todos);
  // },
  methods: {
    handleCheck(id) {
      // console.log(id);
      // 通知App组件将对应的todos对象的done值取反,即把id参数传给app组件
      // this.checkTodo(id);
      // 触发事件总线上的自定义事件, 即vue实例对象vm原型上的$bus.checkTodo并把id作为参数传给app组件;
      this.$bus.$emit("checkTodo", id);
    },
    deleteBtn(id) {
      //confirm()方法可以弹出一个模态框，选择true or false
      if (confirm("确定删除吗？")) {
        // console.log(id);
        // 通知APP组件将对应的todos对象里的数组给删除掉,即把id参数传给app组件，然后删除
        // this.delTodo(id);
        // 触发事件总线上的自定义事件, 即vue实例对象vm原型上的$bus.delTodo并把id作为参数传给app组件;
        this.$bus.$emit("delTodo", id);
      }
    },
  },
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
li:hover {
  background-color: #ddd;
}
li:hover button {
  display: block;
}
</style>
