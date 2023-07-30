<template>
  <div class="container">
    <Search></Search>
    <list></list>
  </div>
</template>

<script>
// 引入search组件
import Search from "./components/Search";
// 引入List组件
import List from "./components/List";

export default {
  name: "App",
  components: { Search, List },
};
</script>

<style></style>
