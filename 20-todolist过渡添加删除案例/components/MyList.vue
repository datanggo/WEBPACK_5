<template>
  <ul class="todo-main">
    <!-- 循环todos遍历todos数组，根据数组长度生成每一个itme，并且为它绑定key值为每一项的id值，把遍历出的每一项item传给myitme -->
    <transition-group name="todo" :appear="true">
      <MyItme v-for="itme in todos" :key="itme.id" :todos="itme"></MyItme>
    </transition-group>
  </ul>
</template>

<script scoped>
// 引入MyItme组件
import MyItme from "./MyItme";

// 向外暴露MyList组件
export default {
  name: "MyList",
  components: { MyItme },
  //接收myheader传过来的数据列表
  props: ["todos"],
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

/* 设置过渡动画效果 */
.todo-enter-active {
  animation: todos 1s linear;
}

.todo-leave-active {
  animation: todos 1s linear reverse;
}

@keyframes todos {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
}
.todo-main {
  overflow: hidden;
}
</style>
