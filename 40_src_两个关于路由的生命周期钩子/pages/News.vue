<template>
  <ul>
    <li :style="{ opacity }">欢迎学习Vue</li>
    <li>news001 <input type="text" /></li>
    <li>news002 <input type="text" /></li>
    <li>news003 <input type="text" /></li>
  </ul>
</template>

<script>
export default {
  name: "News",
  data() {
    return {
      a: false,
      opacity: 1,
    };
  },

  /* //被销毁之前
  beforeDestroy() {
    console.log("news即将被销毁了");
    // 在组件即将销毁前清空定时器
    clearInterval(this.timer);
  }, */

  /* // 挂载之前
  mounted() {
    this.timer = setInterval(() => {
      this.opacity -= 0.01;
      if (this.opacity <= 0) this.opacity = 1;
    }, 16);
  }, */

  //一下两个声明周期钩子是路由组件独有的
  //被激活的
  activated() {
    console.log("News组件被激活了");
    this.timer = setInterval(() => {
      console.log("@");
      this.opacity -= 0.01;
      if (this.opacity <= 0) this.opacity = 1;
    }, 16);
  },
  //失去激活的
  deactivated() {
    console.log("News组件被失活了");
    // 在组件被失活时清空定时器
    clearInterval(this.timer);
  },
};
</script>

<style></style>
