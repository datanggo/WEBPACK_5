<template>
  <div class="school">
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <!-- 通过父组件给子组件传递函数类型的porps实现，子组件给父组件传递数据 -->
    <button @click="sendSchoolName">把学校名传给app</button>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      name: "尚硅谷",
      address: "北京",
    };
  },
  props: ["getSchool"],
  methods: {
    sendSchoolName() {
      this.getSchool(this.name);
    },
  },
};
</script>

<style scoped>
.school {
  background-color: turquoise;
  padding: 5px;
}
</style>
