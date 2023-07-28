<template>
  <div class="school">
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
// 引入pubsub-js消息订阅与发布的库
import pubsub from "pubsub-js";

export default {
  name: "School",
  data() {
    return {
      name: "尚硅谷",
      address: "北京",
    };
  },
  mounted() {
    /*  // console.log("School", this);
    this.$bus.$on("hello", (data) => {
      console.log("我是school组件，收到了数据", data);
    }); */

    //消息订阅
    // pubsub第三方库的subscribe()订阅方法值1为消息名，值2为回调函数
    this.pubid = pubsub.subscribe("hello", (msgName, deta) => {
      console.log("有人发布了hello消息，hello消息回调执行了", msgName, deta);
    });
  },

  beforeDestroy() {
    // this.$bus.$off("hello");
    //即在此vc销毁之前取消订阅
    pubsub.unsubscribe(this.pubid);
  },
};
</script>

<style scoped>
.school {
  background-color: turquoise;
  padding: 5px;
}
</style>
