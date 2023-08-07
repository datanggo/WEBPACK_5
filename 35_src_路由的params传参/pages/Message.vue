<template>
  <div>
    <ul>
      <li v-for="item in messageList" :key="item.id">
        <!-- 跳转路由 并携带params参数 to的字符串写法-->
        <!-- <router-link :to="`/home/message/detail/${item.id}/${item.title}`">{{item.title}}</router-link> -->

        <!-- 跳转路由 并携带params参数 to的对象写法-->
        <router-link
          :to="{
            //直接使用已经命名了的路由
            //如果使用用的是params传参，此处不能配置path路径，必须使用name
            name: 'xiangqing',
            params: {
              id: item.id,
              title: item.title,
            },
          }"
        >
          {{ item.title }}
        </router-link>
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
};
</script>

<style></style>
