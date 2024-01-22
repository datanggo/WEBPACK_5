<template lang="">
  <a :title="title" style="margin: 5px">
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>
<script>
export default {
  name: "HintButton",
  props: ["title"],
  mounted() {
    // console.log(this.$listeners);
  },
};
</script>
<style lang=""></style>
