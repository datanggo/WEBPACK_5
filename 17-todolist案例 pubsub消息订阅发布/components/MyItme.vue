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
      <span v-show="!todos.isEdit"> {{ todos.title }}</span>

      <!-- 编辑文本框 -->
      <input
        v-show="todos.isEdit"
        type="text"
        :value="todos.title"
        @blur="blurBtn(todos, $event)"
        ref="inputTitle"
      />
    </label>
    <!-- 删除按钮绑定点击事件，并传入todos.id -->
    <button class="btn btn-danger" @click="deleteBtn(todos.id)">删除</button>
    <!-- 编辑按钮 -->
    <button v-show="!todos.isEdit" class="btn btn-edit" @click="editBtn(todos)">
      编辑
    </button>
  </li>
</template>

<script>
// 引入第三方库 pubsub-js
import pubsub from "pubsub-js";

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
        // this.$bus.$emit("delTodo", id);

        //利用pubsub第三方库执行消息发布 值1 消息名  值2 传递值
        pubsub.publish("delTodo", id);
      }
    },

    // 编辑按钮
    editBtn(todos) {
      // 如果todos身上本身就有isEdit这个属性就直接更改值，否则就执行$set()方法追加属性
      // hasOwnProperty("isEdit")此方法即检测当前对象身上有没有这个属性
      if (todos.hasOwnProperty("isEdit")) {
        todos.isEdit = true;
      } else {
        // 即利用vue的$set方法为todos对像追加一个属性，isedit值为true
        this.$set(todos, "isEdit", true);
        // todos.isEdit = true;
      }
      setTimeout(() => {
        this.$refs.inputTitle.focus();
      }, 200);
      // nextTick()方法里的回调是在DOM节点更新完毕之后再执行
      // this.$nextTick(() => {
      //   this.$refs.inputTitle.focus();
      // });
    },

    //失去焦点回调(真正执行修改逻辑)
    // 当编辑文本框失去焦点时
    blurBtn(todos, e) {
      todos.isEdit = false;

      //利用事件总线传递参数
      console.log("@@");
      this.$bus.$emit("updateTodo", todos.id, e.target.value);
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
