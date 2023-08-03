<template>
  <div class="category">
    <h3>{{ title }}分类</h3>
    <slot :games="games" msg="hello">
      我是一些默认值，当使用者没有传递具体结构时，我会加载
    </slot>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: ["listData"],
  data() {
    return {
      foods: ["火锅", "烧烤", "小龙虾", "牛排"],
      games: ["红色警戒", "穿越火线", "小龙虾", "牛排"],
      films: ["《教父》", "《拆弹专家》", "《你好，李焕英》", "《尚硅谷》"],
    };
  },
};
</script>

<style>
.category {
  background-color: skyblue;
  width: 200px;
  height: 300px;
}
h3 {
  text-align: center;
  background-color: orange;
}
</style>