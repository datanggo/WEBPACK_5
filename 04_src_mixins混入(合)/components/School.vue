<template>
  <div>
    <h2 @click="showName">学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
// 引入分别暴露组件
import { mixin, mixin2 } from "../mixin";

export default {
  name: "SchoolMsg",
  data() {
    return {
      name: "尚硅谷",
      address: "北京昌平",
    };
  },

  // 应用混合的配置项
  mixins: [mixin, mixin2],
};
</script>

<style>
</style>