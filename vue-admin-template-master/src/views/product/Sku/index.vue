<template lang="">
    <div>
      <el-card style="margin:10px 0">
        <!-- 三级联动已经是全局组件了，可以直接使用 -->
         <CategorySelect @getCategoryId="getCategoryId" :show="!show"></CategorySelect>
      </el-card>
       <el-card>
        <!-- 底部这里将来是有三部分进行切换的 -->
        <div>
          <!-- 展示spu列表的结构 -->
          <el-button type="primary" icon="el-icon-puls">添加SPU</el-button>
          <el-table style="width: 100%" border :data="records">
            <el-table-column type="index" align="center" label="序号" width="80">
            </el-table-column>
            <el-table-column prop="spuName" label="SPU名称" width="width">
            </el-table-column>
            <el-table-column prop="description" label="SPU描述" width="width">
            </el-table-column>
            <el-table-column prop="prop" label="操作" width="width">
              <!-- 利用作用域插槽实现父组件给子组件传递结构 -->
              <template slot-scope="{row,$index}">
                <!-- 这里的按钮将来用hintButton替换 -->
                <hint-button type="success" icon="el-icon-plus" size="mini" title="添加SKU"></hint-button>
                <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改SPU"></hint-button>
                <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前类所有的实例"></hint-button>
                <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除SPU"></hint-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
           -->
          <el-pagination
          @size-change="handleSizeChange"
           @current-change="getSpuList"
            style='text-align:center'
            :current-page="page"
            :page-sizes="[3, 5, 10]"
            :page-size="limit"
            layout="  prev, pager, next, jumper, ->,sizes,total"
            :total="total">
          </el-pagination>
        </div>
      </el-card>
    </div>
</template>
<script>
export default {
  name: "Sku",
  data() {
    return {
      // 一级的id
      category1Id: "",
      // 二级的id
      category2Id: "",
      // 三级的id
      category3Id: "",
      // 控制三级联动的可操作性
      show: true,

      page: 1, //分页器当前第几页
      limit: 3, //每一页展示多少条数据
      records: [], //spu列表的数据
      total: 0, //服务器一共需要展示数据的条数
    };
  },
  // 方法
  methods: {
    // 三级联动的自定义事件，可以把子组件相应的id传递给父组件
    getCategoryId({ categoryId, level }) {
      // CategoryId可以获取一级，二级三级相应的id      level可以标识是哪一级的id
      if (level == 1) {
        // 这里是一级id
        this.category1Id = categoryId;
        // 清除二级三级分类的id
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        // 清除三级分类的id
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        // 当三级分类有了发请求获取数据
        this.getSpuList();
      }
    },

    // 获取spu列表数据的方法
    async getSpuList(pages = 1) {
      //封装好的点击第几页会获取当前页的页码数
      this.page = pages;
      // 解构出需要携带的参数
      const { page, limit, category3Id } = this;
      // 携带三个参数：page 第几页   limit 每一页需要展示多少条数据  三级分类id
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      // console.log(result);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },

    /*  // 点击分页器的第几页按钮的回调
    handleCurrentChange(page) {
      // console.log(page);  //封装好的点击第几页会获取当前页的页码数
      this.page = page;
      // 再次获取最新的列表
      this.getSpuList();
    }, */

    // 当分页器的某一页展示数据的条数发生变化的回调
    handleSizeChange(limit) {
      // console.log(limit);  //封装好的会获取到选中的是展示几页的哪个数字
      this.limit = limit;
      // 再次获取最新的列表
      this.getSpuList();
    },
  },
};
</script>
<style lang="">
</style>