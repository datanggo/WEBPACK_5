<template lang="">
    <div class="title">
        hello App
        <el-button type="primary">按钮</el-button>
        <ul>
            <li>
                <router-link to="/home">Hmoe</router-link>
            </li>
            <li>
                <router-link to="/about">About</router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
import { ElButton } from "element-plus";
export default {
  name: "App",
  components: {
    ElButton,
  },
};
</script>
<style>
.title {
  background-color: pink;
}
</style>