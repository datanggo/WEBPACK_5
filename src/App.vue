<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <!-- 把定义的插入数据的函数receive函数传给myheader -->
        <MyHeader :receive="receive"></MyHeader>
        <!-- 把定义的todos数据对象传给mylist -->
        <MyList
          :todos="todos"
          :checkTodo="checkTodo"
          :delTodo="delTodo"
        ></MyList>
        <MyFooter :todos="todos" :checkAll="checkAll"></MyFooter>
      </div>
    </div>
  </div>
</template>

<script>
// 引入MyHeader组件
import MyHeader from "./components/MyHeader";
// 引入MyFooter组件
import MyFooter from "./components/MyFooter";
// 引入MyList组件
import MyList from "./components/MyList";

// 向外暴露App组件
export default {
  name: "App",
  components: { MyHeader, MyFooter, MyList },
  data() {
    return {
      todos: [
        { id: "001", title: "抽烟", done: true },
        { id: "002", title: "喝酒", done: false },
        { id: "003", title: "开车", done: true },
      ],
    };
  },
  methods: {
    // 添加一个todo数据
    receive(x) {
      this.todos.unshift(x);
      console.log("这是myheader传过来的参数", x);
    },
    // 勾选或取消checkbox框
    checkTodo(id) {
      // forEach()方法遍历数组itme为每一项，index为每一项对应的索引号
      this.todos.forEach((itme, index) => {
        console.log(itme);
        console.log(index);
        // 如果传进来的id值为当前id值，那么把它的done值取反
        if (itme.id == id) itme.done = !itme.done;
      });
    },

    // 删除指定itme
    delTodo(id) {
      //filter()方法可以筛选数组中符合条件的，返回一个新数组，所以这里要把返回的新数组重新赋值给这个数组
      this.todos = this.todos.filter((itme, index) => {
        // 定义筛选的条件
        return itme.id !== id;
      });
    },

    // 全选 or取消全选
    checkAll(done) {
      this.todos.forEach((itme) => {
        itme.done = done;
      });
    },
  },
};
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
