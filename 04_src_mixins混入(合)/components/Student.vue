<template>
  <div>
    <h2 @click="showName">学生姓名：{{ name }}</h2>
    <h2>学校性别：{{ sex }}</h2>
  </div>
</template>

<script>
// 引入分别暴露组件
import { mixin, mixin2 } from "../mixin";

export default {
  name: "StudentMsg",
  data() {
    return {
      name: "张三",
      sex: "男",
    };
  },

  // 应用混合的配置项
  mixins: [mixin, mixin2],
};
</script>

<style>
</style>