<template>
  <div class="row">
    <!-- 展示用户列表 -->
    <div
      v-show="info.users.length"
      class="card"
      v-for="item in info.users"
      :key="item.login"
    >
      <a :href="item.html_url" target="_blank">
        <img :src="item.avatar_url" style="width: 100px" />
      </a>
      <p class="card-text">{{ item.login }}</p>
    </div>

    <!-- 展示欢迎词 -->
    <h1 v-show="info.isFirst">欢迎使用!</h1>
    <!-- 展示加载中 -->
    <h1 v-show="info.isloading">加载中....</h1>
    <!-- 展示错误信息 -->
    <h1 v-show="info.errMsg">{{ info.errMsg }}</h1>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      info: {
        isFirst: true,
        isloading: false,
        errMsg: "",
        users: [],
      },
    };
  },

  // 利用全局事件总线传参
  mounted() {
    this.$bus.$on("updateListDate", (dataObj) => {
      console.log("我是List组件,收到了数据", dataObj);
      // this.users = users;
      // this.isFirst = isFirst;
      // this.isloading = isloading;
      // this.errMsg = errMsg;
      // this.info = dataObj;
      //对象的解构赋值,这样不会丢失dataObj里没有的属性
      this.info = { ...this.info, ...dataObj };
    });
  },
};
</script>

<style scoped>
.album {
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f7f7f7;
}

.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>
