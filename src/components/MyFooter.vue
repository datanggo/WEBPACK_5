<template>
  <div class="todo-footer" v-show="totall">
    <label>
      <!-- <input type="checkbox" :checked="isAll" @change="checkAl" /> -->
      <input type="checkbox" v-model="isAll" />
    </label>
    <span>
      <span>已完成{{ doneTodo }}</span> / 全部{{ totall }}
    </span>
    <button class="btn btn-danger">清除已完成任务</button>
  </div>
</template>

<script>
// 向外暴露MyFooter组件
export default {
  name: "MyFooter",
  // 声明接收app组件传递过来的参数
  props: ["todos", "checkAll"],
  // 计算属性
  computed: {
    // 计算全部的值
    totall() {
      return this.todos.length;
    },

    // 计算已完成的值
    doneTodo() {
      /* let i = 0;
      this.todos.forEach((e) => {
        if (e.done) i++;
      });
      return i; */

      //reduce数组里的条件统计
      let x = this.todos.reduce((pre, current) => {
        // console.log("@", current);
        // console.log("#", pre);
        return pre + (current.done ? 1 : 0);
      }, 0);
      return x;
    },

    // 计算是否勾选全部
    /*  isAll() {
      // 这句话的意思是，当前已完成的和全部数量相等时并且全部的值要大于0时，返回true否则false
      return this.doneTodo === this.totall && this.totall > 0;
    }, */
    isALL: {
      get() {
        // 这句话的意思是，当前已完成的和全部数量相等时并且全部的值要大于0时，返回true否则false
        return this.doneTodo === this.totall && this.totall > 0;
      },
      set(value) {
        this.checkAll(value);
      },
    },
  },
  methods: {
    // checkAl(e) {
    //   // console.log(e.target.checked);
    //   this.checkAll(e.target.checked);
    // },
  },
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
