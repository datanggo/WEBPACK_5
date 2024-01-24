<template lang="">
    <div>
        <!-- 表格 -->
        <el-table style="width: 100%" border>
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="默认图片" width="110">
          </el-table-column>
          <el-table-column prop="prop" label="重量" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="价格" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <!-- 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
         -->
        <el-pagination
          style="text-align:center"
          :current-page="1"
          :page-sizes="[3, 5, 10]"
          :page-size="10"
          layout=" prev, pager, next, jumper, -> ,sizes,total"
          :total="20">
        </el-pagination>
    </div>
</template>
<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1, //代表当前第几页
      limit: 10, //代表当前第几条数据
      records: [], //存储sku列表的数据
      total: 0, //存储分页器展示的数据
    };
  },

  // 组件挂载完毕
  mounted() {
    // 获取sku列表的方法
    this.getSkuList();
  },

  // 方法
  methods: {
    async getSkuList() {
      // 解构出需要的数据
      const { page, limit } = this;
      // 获取sku列表数据的方法
      let result = await this.$API.sku.reqSkuList(page, limit);
      if (result.code == 200) {
        this.total = result.total;
      }
    },
  },
};
</script>
<style lang="">
</style>