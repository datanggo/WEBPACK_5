<template>
  <div>
    <h1>当前求和为：{{ sum }}</h1>
    <h1>当前求和放大10被为：{{ bigSum }}</h1>
    <h1>我在{{ school }}，学习{{ subject }}</h1>
    <select id="" v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <!-- 注意：如果利用map映射一定注意需要在事件调用函数的时候把参数传进去 -->
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="incrementOdd(n)">当前求和为奇数再加</button>
    <button @click="incrementWait(n)">等一等再加</button>
  </div>
</template>

<script>
//引入vuex里的map映射
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "Count",
  data() {
    return {
      n: 1, //用户选择的数字
    };
  },
  computed: {
    // 借助mapState生成计算属性，从state中读取数据    对象写法
    // ...mapState({ sum: "sum", school: "school", subject: "subject" }),
    // 借助mapState生成计算属性，从state中读取数据    数组写法
    ...mapState(["sum", "school", "subject"]),

    /* *********************************** */
    // 借助mapGetters生成计算属性，从getters中读取数据    数组写法
    ...mapGetters(["bigSum"]),

    // 借助mapGetters生成计算属性，从getters中读取数据    对象写法
    ...mapGetters({ bigSum: "bigSum" }),
  },

  methods: {
    // 程序员自己写的调用commit方法
    /* increment() {
      this.$store.commit("JIA", this.n);
    },
    decrement() {
      this.$store.commit("JIAN", this.n);
    }, */

    //(对象写法) 利用mapMutations映射生成increment和decrement方法，方法中会调用commit去联系mutations
    ...mapMutations({ increment: "JIA", decrement: "JIAN" }),

    //(数组写法) 利用mapMutations映射生成increment和decrement方法，方法中会调用commit去联系mutations
    // ...mapMutations(["JIA", "JIAN"]),

    /* *********************************************** */
    // 程序员自己写的调用dispatch方法

    /* //如果sum是奇数再加
    incrementOdd() {
      this.$store.dispatch("jiaOdd", this.n);
    },
    incrementWait() {
      this.$store.dispatch("jiaWait", this.n);
    }, */

    //(对象写法) 利用mapActions映射生成incrementOdd和incrementWait方法，方法中会调用dispacth去联系actions
    ...mapActions({ incrementOdd: "jiaOdd", incrementWait: "jiaWait" }),
    //(数组写法) 利用mapActions映射生成incrementOdd和incrementWait方法，方法中会调用dispacth去联系actions
    // ...mapActions("jiaOdd", "jiaWait"),
  },
};
</script>

<style scoped>
button {
  margin-left: 5px;
}
</style>