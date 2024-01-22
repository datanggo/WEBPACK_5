<template lang="">
  <div>
    <!-- 添加或者修改Spu -->
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            value="value"
            v-for="(tm, index) in tradeMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          placeholder="SPU描述"
          type="textarea"
          rows="4"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!-- 上传图片 
            action图片上传的地址
            list-type文件列表的类型
            :on-preview预览的回调
            :on-remove删除的回调
            file-list图片缩略图
        -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select placeholder="还有3未选择" value="">
          <el-option label="" value=""></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
        <el-table style="width: 100%" border>
          <el-table-column type="index" align="center" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('changeScene', 0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  //   name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      //   spu属性初始化的时候是一个空的对象,在修改spu的时候会发请求获取对象里相应的字段
      //   但是如果添加spu的时候并没有这些字段，收集到spu，所以不能为空对象
      spu: {
        //存储spu信息的属性
        // 三级分类的id
        category3Id: 0,
        // 品牌的id
        tmId: 0,
        // 描述
        description: "",
        // spu的名称
        spuName: "",
        // 收集spu图片的信息
        spuImageList: [
          /* {
            id: 0,
            imgName: "string",
            imgUrl: "string",
            spuId: 0,
          }, */
        ],
        //   销售属性与属性值的信息
        spuSaleAttrList: [
          /* {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: "string",
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: "string",
                saleAttrName: "string",
                saleAttrValueName: "string",
                spuId: 0,
              },
            ],
          }, */
        ],
      },

      tradeMarkList: [
        // 品牌的信息
      ],
      spuImageList: [
        // 存储spu图片的数据
      ],
      saleAttrList: [
        // 销售属性的数据
      ],
    };
  },

  //   组件挂载完毕
  mounted() {
    // 发请求
  },

  //   方法
  methods: {
    handleRemove(file, fileList) {
      //   console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    // 初始化spuform的数据
    async initSpuData(spu) {
      //   console.log(spu);
      //   发请求获取spu信息的数据
      let spuResult = await this.$API.spu.reqSpu(spu.id);
      if (spuResult.code == 200) {
        //存储spu信息存储到本地
        // 在修改spu的时候是需要发请求的，把服务器返回的数据赋值给spu
        this.spu = spuResult.data;
      }

      //   获取品牌的信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code == 200)
        this.tradeMarkList = tradeMarkResult.data;

      //获取spu图片的数据
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (spuImageResult.code == 200) {
        let listArr = spuImageResult.data;
        // 由于照片墙显示图片的数据需要数组里面的元素带有name，和url所以需要把服务器返回的数据进行加工
        listArr.forEach((element) => {
          element.name = element.imgName;
          element.url = element.imgUrl;
        });
        // 把整理好的数据赋值给spuImageList
        // 数据进行替换或者新增的时候vue会检测到所以这是响应式的数据
        this.spuImageList = listArr;
      }

      //   获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) this.saleAttrList = saleResult.data;
    },
  },
};
</script>
<style lang=""></style>
