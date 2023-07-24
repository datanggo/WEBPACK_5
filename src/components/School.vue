<template>
  <div class="demo">
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
export default {
  name: "SchoolMsg",
  data() {
    return {
      name: "尚硅谷",
      address: "北京昌平",
    };
  },
};
</script>

<style scoped>
.demo {
  background-color: rgb(255, 0, 0);
  width: 300px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
}
</style>