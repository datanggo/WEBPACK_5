<template>
  <ul class="todo-main">
    <MyItme v-for="(itme, index) in todos" :key="itme.id"> {{ index }}}</MyItme>
  </ul>
</template>

<script scoped>
// 引入MyItme组件
import MyItme from "./MyItme";

// 向外暴露MyList组件
export default {
  name: "MyList",
  components: { MyItme },
  data() {
    return {
      todos: [
        { id: "001", title: "抽烟", done: true },
        { id: "002", title: "喝酒", done: true },
        { id: "003", title: "开车", done: true },
      ],
    };
  },
};
</script>

<style>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
