<template>
  <div class="container">
    <Category title="美食" :listData="foods">
      <img
        src="https://sns-img-hw.xhscdn.com/5663f846-0a43-5675-bc8f-b2f2335b8c98?imageView2/2/w/1920/format/webp|imageMogr2/strip&quot"
        alt=""
      />
    </Category>
    <Category title="游戏" :listData="games">
      <ul>
        <li v-for="(item, index) in games" :key="index">{{ item }}</li>
      </ul>
    </Category>
    <Category title="电影" :listData="films">
      <video
        controls
        autoplay
        src="https://vd4.bdstatic.com/mda-ke7sqkpqs9qpsgni/v1-cae/sc/mda-ke7sqkpqs9qpsgni.mp4?v_from_s=hkapp-haokan-nanjing&auth_key=1690881973-0-0-fab7052cc69604304737fe41d6476c1c&bcevod_channel=searchbox_feed&pd=1&cr=2&cd=0&pt=3&logid=1573087347&vid=8839673555126899618&abtest=&klogid=1573087347"
      ></video>
    </Category>
  </div>
</template>

<script>
// 引入Category组件
import Category from "./components/Category.vue";

export default {
  name: "App",
  // 注册组件
  components: { Category },

  data() {
    return {
      foods: ["火锅", "烧烤", "小龙虾", "牛排"],
      games: ["红色警戒", "穿越火线", "小龙虾", "牛排"],
      films: ["《教父》", "《拆弹专家》", "《你好，李焕英》", "《尚硅谷》"],
    };
  },
};
</script>

<style lang="css" scoped>
.container {
  display: flex;
  justify-content: space-around;
}
img {
  width: 100%;
}
video {
  width: 100%;
}
</style>
