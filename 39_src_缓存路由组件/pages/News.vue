<template>
  <ul>
    <li>news001 <input type="text" /></li>
    <li>news002 <input type="text" /></li>
    <li>news003 <input type="text" /></li>
  </ul>
</template>

<script>
export default {
  name: "News",

  //被销毁之前
  beforeDestroy() {
    console.log("news即将被销毁了");
  },
};
</script>

<style></style>
