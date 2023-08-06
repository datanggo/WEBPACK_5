<template>
  <div>
    <h1>人员列表</h1>
    <h3 style="color: red">上方组件的求和为:{{ sum }}</h3>
    <h3>列表中第一个人的名字为:{{ firstPresonName }}</h3>
    <input type="text" placeholder="请输入名字" v-model="name" />
    <button @click="add">添加</button>
    <button @click="addWang">添加一个姓王的人</button>
    <button @click="addServer">添加随机语句</button>
    <ul>
      <li v-for="item in personList" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
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
      return this.$store.state.personAbout.personList;
    },
    sum() {
      return this.$store.state.countAbout.sum;
    },
    //第一个人的名字是
    firstPresonName() {
      return this.$store.getters["personAbout/firstPresonName"];
    },
  },
  methods: {
    add() {
      const personObj = { id: nanoid(), name: this.name };
      this.$store.commit("personAbout/ADD_PERSON", personObj);
      this.name = "";
    },
    addWang() {
      const personObj = { id: nanoid(), name: this.name };
      this.$store.dispatch("personAbout/addPersonWang", personObj);
      this.name = "";
    },
    addServer() {
      this.$store.dispatch("personAbout/addPersonServer");
    },
  },
};
</script>

<style></style>
