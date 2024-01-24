<template lang="">
  <div>
    <!-- 表格 -->
    <el-table style="width: 100%" border :data="records">
      <el-table-column type="index" label="序号" align="center" width="80">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column label="默认图片" width="110">
        <!-- 使用作用域插槽实现父组件向子组件传递结构和样式 -->
        <template slot-scope="{ row, $index }">
          <img :src="row.skuDefaultImg" style="width: 80px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80"> </el-table-column>
      <el-table-column prop="price" label="价格" width="80"> </el-table-column>
      <el-table-column label="操作" width="width">
        <!-- 使用作用域插槽实现父组件向子组件传递结构和样式 -->
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            icon="el-icon-sort-down"
            size="mini"
            v-if="row.isSale == 0"
            @click="sale(row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-sort-up"
            size="mini"
            v-else
            @click="cancel(row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="editA"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getSkuList"
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout=" prev, pager, next, jumper, -> ,sizes,total"
      :total="total"
    >
    </el-pagination>

    <!-- 抽屉效果 -->
    <el-drawer :visible.sync="drawer" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <!-- 作用域插槽父组件传递结构和样式给子组件 -->
          <template>
            <el-tag
              type="success"
              v-for="(attr, index) in skuInfo.skuAttrValueList"
              :key="attr.attrId"
              style="margin-right: 5px"
              >{{ attr.attrId }}-{{ attr.valueId }}</el-tag
            >
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="200px">
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" style="width: 100%; height: 100%" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
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
      skuInfo: {}, //存储的是sku详情信息
      drawer: false, //控制抽屉的显示和隐藏
    };
  },

  // 组件挂载完毕
  mounted() {
    // 获取sku列表的方法
    this.getSkuList();
  },

  // 方法
  methods: {
    async getSkuList(pages = 1) {
      this.page = pages;
      // 解构出需要的数据
      const { page, limit } = this;
      // 获取sku列表数据的方法
      let result = await this.$API.sku.reqSkuList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },

    //切换当前页显示数量的回调
    handleSizeChange(limit) {
      // 修改参数
      this.limit = limit;
      // 再次发请求获取sku列表
      this.getSkuList();
    },

    // 上架SKU的回调
    async sale(row) {
      // 发请求
      let result = await this.$API.sku.reqSale(row.id);
      if (result.code == 200) {
        // 切换按钮的显示
        row.isSale = 1;
        this.$message({ type: "success", message: "上架SKU成功" });
      }
    },
    // 下架SKU的回调
    async cancel(row) {
      // 发请求
      let result = await this.$API.sku.reqSale(row.id);
      if (result.code == 200) {
        // 切换按钮的显示
        row.isSale = 0;
        this.$message({ type: "success", message: "下架SKU成功" });
      }
    },
    editA() {
      this.$message("正在开发中");
    },
    // 获取SKU详情信息的方法
    async getSkuInfo(sku) {
      // 展示数据打开抽屉
      this.drawer = true;
      // 获取sku的数据
      let result = await this.$API.sku.reqSkuById(sku.id);
      if (result.code == 200) {
        // 存储信息
        this.skuInfo = result.data;
      }
    },
  },
};
</script>
<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px 10px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
>>> .el-carousel__button {
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
}
</style>
