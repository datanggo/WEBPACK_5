<template>
  <div class="container">
    <Category title="游戏">
      <!-- 新属性名为slot-scope等价于scope -->
      <template slot-scope="shuJu">
        <ul>
          <li v-for="(item, index) in shuJu.games" :key="index">{{ item }}</li>
        </ul>
      </template>
    </Category>
    <Category title="游戏">
      <!-- 解构赋值的写法 -->
      <template scope="{games}">
        <ol>
          <li v-for="(item, index) in games" :key="index">{{ item }}</li>
        </ol>
      </template>
    </Category>
    <Category title="游戏">
      <!-- 解构赋值的写法 -->
      <template scope="{games,msg}">
        <h5 style="color: red" v-for="(item, index) in games" :key="index">
          {{ item }}
        </h5>
        <h4>{{ msg }}</h4>
      </template>
    </Category>
  </div>
</template>

<script>
// 引入Category组件
import Category from "./components/Category";

export default {
  name: "App",
  // 注册组件
  components: { Category },
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
.foot {
  display: flex;
  justify-content: space-around;
}
.vid {
  display: flex;
  justify-content: space-around;
}
h4 {
  text-align: center;
}
</style>
