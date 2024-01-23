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
            :on-remove删除的回调，删除图片的时候会触发
            file-list图片缩略图，照片墙需要展示的数据【数组：数组里面的元素务必要有name，url属性】
            :on-success可以检测到图片上传的钩子
        -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectSaleAttr.length}未选择`" v-model="attrIdAndAttrName">
          <el-option :label="unselect.name" :value="`${unselect.id}:${unselect.name}`" v-for="(unselect,index) in unSelectSaleAttr" :key="unselect.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addSaleAttr">添加销售属性</el-button>
        <!-- 展示的是当前Spu属于自己的销售属性 -->
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column type="index" align="center" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
              <template slot-scope="{row,$index}">
                <!-- 
                      el-tag:用户展示已有的属性值列表的数据
                      closable：关闭按钮
                 -->
                  <el-tag :key="tag.id"  v-for="(tag,index) in row.spuSaleAttrValueList" closable :disable-transitions="false" @close="row.spuSaleAttrValueList.splice(index,1)">
                  {{tag.saleAttrValueName}}
                </el-tag>
                <!-- 下面的结构可以当作咱们当年的span和input的切换 -->
                <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" @keyup.enter.native="handleInputConfirm(row)" @blur="handleInputConfirm(row)" ref="saveTagInput" size="small">
                </el-input>
                <!-- @click="showInput" -->
                <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button>
              </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
  <el-button
    type="danger"
    icon="el-icon-delete"
    size="mini"
    @click="spu.spuSaleAttrList.splice($index, 1)"
  ></el-button>
</template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpadataSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Input } from "element-ui";
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
        tmId: "",
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
      // 收集未选择的销售属性的ID
      attrIdAndAttrName: "",
    };
  },

  //   组件挂载完毕
  mounted() {
    // 发请求
  },

  //   方法
  methods: {
    // 照片墙图片上传成功的回调
    handleSuccess(response, file, fileList) {
      // response服务器返回的信息
      // file上传成功的那一个图片的数据
      // fielList上传成功后所有的图片的信息
      // 收集照片墙图片的数据
      this.spuImageList = fileList;
    },

    // 当照片墙删除某一个图片的时候会触发
    handleRemove(file, fileList) {
      /* 
      file是当前点击删除的这个图片
      fileList是剩余的其他图片
      */
      //   console.log(file, fileList);
      // 收集照片墙图片的数据
      // 对于已有的图片照片中显示的图片，有name和url字段的，因为照片墙想要显示必须要有这两个字段的
      // 对服务器而言是不需要这两个字段的，将来对于已有的图片的数据提交服务器前要处理
      this.spuImageList = fileList;
    },
    // 照片墙图片预览的回调
    handlePictureCardPreview(file) {
      // 将图片的地址赋值给dialogImageUrl
      this.dialogImageUrl = file.url;
      // 控制对话框的显示与隐藏
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

    // 添加新的销售属性
    addSaleAttr() {
      // 已经收集到了需要添加的销售属性的信息
      // 把收集到的销售属性的数据进行分割
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      // 向spu对象的spuSaleAttrList属性里面添加新的销售属性
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      // 添加新的销售属性
      this.spu.spuSaleAttrList.push(newSaleAttr);

      // 清空上一次的数据
      this.attrIdAndAttrName = "";
    },
    // 添加销售属性值的回调
    addSaleAttrValue(row) {
      // 当你点击销售数值中的添加销售属性值按钮的时候,需要把button变为input通过inputVisible控制
      // console.log(row);
      // $set()为对象添加响应式数据,第一个值为谁添加,第二值为添加哪个字段,第三值为值为什么
      // 挂载在销售属性身上的响应式数据控制butoon与input的切换
      this.$set(row, "inputVisible", true);
      // 通过响应式数据inputValue字段收集新增的销售属性值
      this.$set(row, "inputValue", "");
    },

    // el-input失去焦点的事件
    handleInputConfirm(row) {
      // 解构出新增的销售属性的数据
      const { baseSaleAttrId, inputValue } = row;
      // 新增的销售属性值的名称不能为空
      if (inputValue.trim() == "") {
        this.$message("属性值不能为空");
        // 直接退出本函数
        return;
      }
      // 属性值不能重复,即新增的如果之前已经存在即不执行
      let result = row.spuSaleAttrValueList.every((item) => {
        return item.saleAttrValueName != inputValue;
      });
      if (!result) return;
      // 整理新增的销售属性值
      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue };
      // 新增
      // row.spuSaleAttrValueList.push(newSaleAttrValue);
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      // 修改inputVisible值为false显示button
      row.inputVisible = false;
      //
    },

    // 保存按钮的回调
    async addOrUpadataSpu() {
      // 整理参数:需要整理照片墙的数据
      // 携带的参数:对于图片,需要携带imageName和imageUrl字段
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          imageName: item.name,
          imageUrl: (item.response && item.response.data) || item.url,
        };
      });
      // 发请求
      let result = await this.$API.spu.reqAddOrUpdataSpu(this.spu);
      if (result.code == 200) {
        // 如果修改成功
        // 提示
        this.$message({ type: "success", message: "保存成功" });
        // 通知父亲回到场景为0 的页面
        this.$emit("changeScene", {
          scene: 0,
          flag: this.spu.id ? "修改" : "添加",
        });
      }
    },

    // 点击添加按钮时发的请求
    async addSpuData(category3Id) {
      console.log(category3Id);
      // 添加spu的时候收集三级分类的id
      this.spu.category3Id = category3Id;
      //   获取品牌的信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code == 200)
        this.tradeMarkList = tradeMarkResult.data;
      //   获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) this.saleAttrList = saleResult.data;
    },
    // 取消按钮
    cancel() {
      // 切换场景
      this.$emit("changeScene", { scene: 0 });
      // 清除数据
      //Object.assign()是es6中新增的合并对象方法
      // this._data组件实例,可以操作data当作的响应式数据
      // this.$options当前组件的配置对象.data()函数执行返回的响应式数据为空
      Object.assign(this._data, this.$options.data());
    },
  },

  //计算属性
  computed: {
    // 计算出还未选择的销售属性
    unSelectSaleAttr() {
      // 整个平台的销售属性一共三个颜色，尺寸，版本   ----saleAttrList
      // 当前spu用于的自己的销售属性    ------spuSaleAttrList
      // filter()数组的过滤的方法，可以从已有的数组中过滤出用户需要的元素返回新数组
      let result = this.saleAttrList.filter((item) => {
        // every()方法是数组的一个方法，会返回一个布尔值【真或者假】
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
      return result;
    },
  },
};
</script>
<style >
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
