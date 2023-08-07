<template>
  <ul>
    <!-- 利用params传参的，所有的参数都会挂载到params -->
    <li>消息编号：{{ $route.params.id }}</li>
    <li>消息编号：{{ $route.params.title }}</li>
  </ul>
</template>

<script>
export default {
  name: "Detail",
  mounted() {
    // console.log(this.$route);
  },
};
</script>

<style></style>
