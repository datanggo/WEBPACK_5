<template lang="">
    <div>
        <!-- 底部的数据可视化 -->
        <el-row :gutter="10" >
            <el-col :span="12">
                <Search></Search>
            </el-col>
            <el-col :span="12">
                <Category></Category>
            </el-col>
        </el-row>
    </div>
</template>
<script>
// 引入子组件
import Search from "./Search";
import Category from "./Category";
export default {
  name: "Observe",

  //   注册子组件
  components: {
    Search,
    Category,
  },
};
</script>
<style scoped>
</style>