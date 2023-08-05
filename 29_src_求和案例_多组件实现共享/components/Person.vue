<template>
  <div>
    <h1>人员列表</h1>
    <h3 style="color: red">上方组件的求和为:{{ sum }}</h3>
    <input type="text" placeholder="请输入名字" v-model="name" />
    <button @click="add">添加</button>
    <ul>
      <li v-for="item in personList" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
// 引入mapstate
import { mapState } from "vuex";

// 引入生成id的插件
import { nanoid } from "nanoid";

export default {
  name: "Person",
  data() {
    return {
      name: "",
    };
  },
  computed: {
    personList() {
      return this.$store.state.personList;
    },
    // 利用映射实现
    ...mapState(["sum"]),
  },
  methods: {
    add() {
      const personObj = { id: nanoid(), name: this.name };
      this.$store.commit("ADD_PERSON", personObj);
      this.name = "";
    },
  },
};
</script>

<style>
</style>