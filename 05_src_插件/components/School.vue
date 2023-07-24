<template>
  <div>
    <!-- 使用use插件install里的自定义过滤指令mySlice过滤方法 -->
    <h2>学校名称：{{ name | mySlice }}</h2>
    <h2>学校地址：{{ address }}</h2>

    <!-- 使用插件install里的自定义全局指令fbind -->
    <input type="text" v-fbind:value="name" />

    <button @click="test">点我测试一些hello方法</button>
  </div>
</template>

<script>
export default {
  name: "SchoolMsg",
  data() {
    return {
      name: "尚硅谷阿发发发",
      address: "北京昌平",
    };
  },
  methods: {
    test() {
      this.hello();
    },
  },
};
</script>

<style>
</style>