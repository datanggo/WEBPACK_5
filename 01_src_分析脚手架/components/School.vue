<template>
  <div class="demo">
    <!-- 组件的结构 -->
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <button @click="showName">点我提示学校名</button>
  </div>
</template>

<script type="javascript">
//组件交互相关的代码
import Vue from "vue";
// export const school = Vue.extend({
//此为分别暴露
const school = Vue.extend({
  name: "school-msg",
  data() {
    return {
      name: "尚硅谷",
      address: "北京昌平",
    };
  },
  methods: {
    showName() {
      alert(this.name);
    },
  },
});
// export { school }; //此为统一暴露
export default school; //此为默认暴露
</script>

<style>
/* 组件的样式 */
.demo {
  background-color: orange;
}
</style>
