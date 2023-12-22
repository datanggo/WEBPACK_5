<template lang="">
    <div>
       <!-- 三级联动的全局组件使用：三级联动已经注册为全局组件，不需要再重新引入 -->
       <TypeNav> </TypeNav>
       <ListContainer></ListContainer>
       <Recommend></Recommend>
       <Rank></Rank>
       <Like></Like>
       <Floor></Floor>
       <Floor></Floor>
       <Brand></Brand>
       <!-- <button @click="add">点击我加1</button> -->
       <!-- 使用仓库中的数据 -->
       <!-- <span>仓库中的数据{{count}}</span> -->
       <!-- <button>点击我减1</button> -->
    </div>
</template>
<script>
// 引入其余的组件
// 轮播图
import ListContainer from "@/pages/Home/ListContainer";
// 今日推荐
import Recommend from "@/pages/Home/Recommend";
// 商品推荐
import Rank from "@/pages/Home/Rank";
// 猜你喜好
import Like from "@/pages/Home/Like";
// 楼层
import Floor from "@/pages/Home/Floor";
// 商标
import Brand from "@/pages/Home/Brand";

// 引入vuex映射方法
import { mapState } from "vuex";

export default {
  name: "",
  // 注册组件
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },

  /*  // 计算属性
  computed: {
    ...mapState(["count"]),
  },

  // 事件方法
  methods: {
    add() {
      //派发action
      this.$store.dispatch("add");
    },
  }, */
};
</script>
<style lang="">
</style>