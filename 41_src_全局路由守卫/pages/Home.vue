<template>
  <div>
    <h2>我是About的内容</h2>
    <ul class="nav nav-tabs">
      <li>
        <router-link
          class="list-group-item"
          active-class="active"
          to="/home/news"
          >News</router-link
        >
      </li>
      <li>
        <router-link
          class="list-group-item"
          active-class="active"
          to="/home/Message"
          >Message</router-link
        >
      </li>
    </ul>

    <keep-alive include="News">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "Home",
  beforeDestroy() {
    console.log("home组件即将被销毁了");
  },
  mounted() {
    console.log("home组件挂载完毕了");
  },
};
</script>

<style></style>
