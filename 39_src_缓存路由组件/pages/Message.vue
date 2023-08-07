<template>
  <div>
    <ul>
      <li v-for="item in messageList" :key="item.id">
        <!-- 跳转路由 并携带params参数 to的字符串写法-->
        <!-- <router-link :to="`/home/message/detail/${item.id}/${item.title}`">{{item.title}}</router-link> -->

        <!-- 跳转路由 并携带params参数 to的对象写法-->
        <router-link
          :to="{
            name: 'xiangqing',
            query: {
              id: item.id,
              title: item.title,
            },
          }"
        >
          {{ item.title }}
        </router-link>
        <button @click="pushShow(item)">push查看</button>
        <button @click="repalceShow(item)">replace查看</button>
      </li>
    </ul>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      messageList: [
        { id: "001", title: "消息001" },
        { id: "002", title: "消息002" },
        { id: "003", title: "消息003" },
      ],
    };
  },
  methods: {
    pushShow(item) {
      // 历史记录堆送
      this.$router.push({
        name: "xiangqing",
        query: {
          id: item.id,
          title: item.title,
        },
      });
    },
    // 历史记录替换
    repalceShow(item) {
      this.$router.replace({
        name: "xiangqing",
        query: {
          id: item.id,
          title: item.title,
        },
      });
    },
  },
};
</script>

<style></style>
