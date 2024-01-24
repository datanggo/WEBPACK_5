<template lang="">
  <div>
    <el-card style="margin: 10px 0">
      <!-- 三级联动已经是全局组件了，可以直接使用 -->
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene!=0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <!-- 底部这里将来是有三部分进行切换的 -->
      <div v-show="scene == 0">
        <!-- 展示spu列表的结构 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addSpu"
          :disabled="!category3Id"
          >添加SPU</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" align="center" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <!-- 利用作用域插槽实现父组件给子组件传递结构 -->
            <template slot-scope="{ row, $index }">
              <!-- 这里的按钮将来用hintButton替换 -->
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加SKU"
                @click="addSku(row)"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改SPU"
                @click="updataSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu的sku列表"
                @click="handler(row)"
              ></hint-button>
              <el-popconfirm title="确定删除吗？"  @onConfirm="deleteSpu(row)">
                <hint-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除SPU"
                slot="reference"
              ></hint-button>
              </el-popconfirm>
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
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="  prev, pager, next, jumper, ->,sizes,total"
          :total="total"
        >
        </el-pagination>
      </div>
      <!-- 下面是子组件用于展示添加或修改spu，或者添加sku的面板 -->
      <SpuForm
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>
      <SkuForm v-show="scene == 2" ref="sku" @changeScenes="changeScenes"></SkuForm>
    </el-card>
<el-dialog :title="`${spu.spuName}的SKU列表`" :visible.sync="dialogTableVisible" :before-close="close">
  <!-- table展示sku列表的数据 -->
  <el-table :data="skuList" style="width:100%" border v-loading="loading">
    <el-table-column prop="skuName" label="名称" width="width"></el-table-column>
    <el-table-column prop="price" label="价格" width="width"></el-table-column>
    <el-table-column prop="weight" label="重量" width="width"></el-table-column>
    <el-table-column label="默认图片" width="width">
      <!-- 作用域插槽父组件决定子组件的样式和结构 -->
      <template slot-scope="{row,$index}">
        <img :src="row.skuDefaultImg" style="width:100px;height:100px">
      </template>
    </el-table-column>
  </el-table>
</el-dialog>
  </div>
</template>
<script>
// 引入子组件
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";

export default {
  name: "Spu",
  data() {
    return {
      // 一级的id
      category1Id: "",
      // 二级的id
      category2Id: "",
      // 三级的id
      category3Id: "",
      // 控制三级联动的可操作性

      page: 1, //分页器当前第几页
      limit: 3, //每一页展示多少条数据
      records: [], //spu列表的数据
      total: 0, //服务器一共需要展示数据的条数
      scene: 0, //代表展示隐藏面板的方式 0 代表展示SPU列表数据   1  添加SPU||修改SPU    2 代表添加SKU

      // 控制查看SKU列表的显示与隐藏
      dialogTableVisible: false,
      // 存储点击后收到的spu
      spu: {},
      skuList: [], //存储的是sku列表的数据
      // 加载效果
      loading:true
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

    // 添加spu按钮的回调
    addSpu() {
      // console.log(11);
      // 切换场景为1
      this.scene = 1;
      // 通知子组件SpuForm发请求---两个
      this.$refs.spu.addSpuData(this.category3Id);
    },

    // 修改某一个spu
    updataSpu(row) {
      this.scene = 1;

      // 获取子组件SpuForm及子组件的子组件身上的方法
      // 在父组件中可以用$refs获取到子组件以及其身上的方法
      this.$refs.spu.initSpuData(row);
    },

    // 自定义事件的回调  spu取消按钮的回调
    changeScene({ scene, flag }) {
      // flag是为了区分是添加还是修改
      // 切换结构
      this.scene = scene;
      // 子组件通知父组件修改场景后需要再次获取数据展示
      // 再次获取最新的列表
      if (flag == "修改") {
        this.getSpuList(this.page);
      } else {
        // 再次获取spu列表的数据
        this.getSpuList();
      }
    },

    // 删除spu按钮的操作
    async deleteSpu(row) {
      // 发请求
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        // 再次获取spu列表的数据
        // this.records.length > 1 ? this.page : this.page - 1
        // 如果当前页spu的个数大于1留在当前页，如果小于1返回上一页
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },

    // 添加sku按钮的回调
    addSku(row) {
      // 切换场景
      this.scene = 2;
      //父组件调用子组件的方法，让子组件发请求-----三个请求
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },

    // SKUForm通知父组件切换场景的自定义回调
    changeScenes(scene) {
      this.scene = scene;
    },

    // 查看sku按钮的回调
    async handler(spu) {
      // 把当前点击的这个spu存储到数据中
      this.spu = spu;
      // 当点击按钮的时候显示对话框
      this.dialogTableVisible = true;
      //获取sku列表的数据进行展示
      let result = await this.$API.spu.reqSkuList(spu.id);
      if (result.code == 200) {
        this.skuList = result.data;
        // 当服务器的数据回来之后关闭loading效果
        this.loading = false
      }
    },

    // 关闭对话框的回调
    close(done){
      // loading属性再次变为真
       this.loading = true
      //  清除SKU列表的数据
      this.skuList = []
      // done关闭对话框
      done()
    }
  },
  // 注册子组件
  components: {
    SpuForm,
    SkuForm,
  },
};
</script>
<style lang=""></style>
