<template lang="">
  <div>
    <el-form ref="form" :model="skuInfo" label-width="80px">
      <el-form-item label="SPU名称">
        {{spu.spuName}}
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格（元）" type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(kg)">
        <el-input placeholder="重量（kg）" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
      <el-input type="textarea"rows="4" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="attr.attrName" v-for="(attr,index) in attrInfoList" :key="attr.id">
            <el-select placeholder="-请选择-" v-model="attr.attrIdAndValueId">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="(attrValue,index) in attr.attrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
           <el-form-item :label="saleAttr.saleAttrName" v-for="(saleAttr,index) in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="-请选择-" v-model="saleAttr.attrIdAndValueId">
              <el-option :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`" v-for="(saleAttrValue, index) in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table style="width:100%" border :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column width="80" type="selection" align="center" >
        </el-table-column>
        <el-table-column width="width" prop="prop" label="图片" >
          <!-- 利用作用域插槽实现子组件的解构由父组件传递决定 -->
          <template slot-scope="{row,$index}">
            <img :src="row.imgUrl" style="width:100px;height:100px">
          </template>
        </el-table-column>
        <el-table-column width="width" prop="imgName" label="名称" >
        </el-table-column>
        <el-table-column width="width" prop="prop" label="操作" >
          <!-- 利用作用域插槽实现子组件的解构由父组件传递决定 -->
          <template slot-scope="{row,$index}">
  <el-button
    type="primary"
    v-if="row.isDefault == 0"
    @click="changeDefault(row)"
    >设为默认</el-button
  >
  <el-button v-else>默认</el-button>
</template>
        </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "SkuForm",
  data() {
    return {
      // 存储图片的信息
      spuImageList: [],
      // 存储的是销售属性
      spuSaleAttrList: [],
      // 存储平台属性的数据
      attrInfoList: [],

      // 收集sku数据的字段
      skuInfo: {
        //第一类收集的数据：父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 第二类：通过数据双向绑定v-model获取
        price: 0,
        weight: "",
        skuName: "",
        skuDesc: "",
        // 第三类，需要写代码收集
        // 平台属性
        skuAttrValueList: [
          {
            attrId: 0,
            valueId: 0,
          },
        ],
        // 默认图片的字段
        skuDefaultImg: "",
        //收集图片的字段
        skuImageList: [
          /* {
            id: 0,
            imgName: "string",
            imgUrl: "string",
            isDefault: "string",
            skuId: 0,
            spuImgId: 0,
          }, */
        ],
        // 销售属性列表的数据
        skuSaleAttrValueList: [
          /*  {
            id: 0,
            saleAttrId: 0,
            saleAttrName: "string",
            saleAttrValueId: 0,
            saleAttrValueName: "string",
            skuId: 0,
            spuId: 0,
          }, */
        ],
      },

      // 收集父组件传递过来的spu
      spu: {},
      // 收集图片的字段
      // 缺少一个字段为isDefault控制是否默认的字段  提交给服务器数据的时候需要整理
      imgList: [],
    };
  },

  //方法
  methods: {
    // 自定义事件点击父组件添加SKU按钮触发
    //获取sku数据
    async getData(category1Id, category2Id, spu) {
      // 收集父组件给过来的数据
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.spuId = spu.id;
      this.skuInfo.tmId = spu.tmId;
      this.spu = spu;
      // console.log(11);
      // 获取图片的数据
      let result = await this.$API.spu.reqSpuImageList1(spu.id);
      // 如果请求成功存储数据
      if (result.code == 200) {
        let list = result.data;
        list.forEach((element) => {
          element.isDefault = 0;
        });
        this.spuImageList = list;
      }

      // 获取销售属性的数据
      let result1 = await this.$API.spu.reqSaleAttrList(spu.id);
      // 如果请求成功存储数据
      if (result1.code == 200) this.spuSaleAttrList = result1.data;

      // 获取平台属性的数据
      let result2 = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      // 如果请求成功存储数据
      if (result2.code == 200) this.attrInfoList = result2.data;
    },

    // table表格复选框按钮的事件
    handleSelectionChange(params) {
      // console.log(params);
      // 可以获取到用户选择的图片的信息，但是缺少一个字段为isDefault控制是否默认的字段
      // 把注入返回的数据存储下来
      this.imgList = params;
    },

    // 设为默认的排他操作，当点击的时候把列表中所有的isDefault字段变为0，自己变为1
    changeDefault(row) {
      this.spuImageList.forEach((item) => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      // 收集默认图片的地址
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },

    // 取消按钮的回调
    cancel() {
      // 触发自定义事件，让父组件切换场景为0
      this.$emit("changeScenes", 0);

      // 清除数据
      Object.assign(this._data, this.$options.data());
    },

    //保存按钮的回调
    async save() {
      const { attrInfoList, skuInfo, spuSaleAttrList, imgList } = this;
      /*  // 整理数据----方式一
      //整理1平台属性

      // 新建数组
      let arr = [];
      //把收集到的数据先整理一下
      attrInfoList.forEach((item) => {
        // 代表当前平台属性用户进行了选择
        if (item.attrIdAndValueId) {
          // 解构出分割好的数据
          const { attrId, valueId } = item.attrIdAndValueId.split(":");
          // 携带给服务器的参数应该是一个对象
          let obj = { attrId, valueId };
          arr.push(obj);
        }
      });
      // 将整理好的参数赋值给skuInfo.skuAttrValueList
      skuInfo.skuAttrValueList = arr; */

      // 整理数据----方式二
      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          // 解构出分割好的数据
          const [attrId, valueId] = item.attrIdAndValueId.split(":");
          prev.push({ attrId, valueId });
        }
        return prev;
      }, []);

      //整理2销售属性
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          // 解构出分割好的数据
          const [saleAttrId, saleAttrValueId] =
            item.attrIdAndValueId.split(":");
          prev.push({ saleAttrId, saleAttrValueId });
          return prev;
        }
      }, []);

      // 整理图片列表的数据
      skuInfo.skuImageList = imgList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });

      // 发请求
      let result = await this.$API.spu.reqAddSku(skuInfo);
      if (result.code == 200) {
        // 提示信息
        this.$message({ type: "success", message: "添加SKU成功" });
        // 触发自定义事件，让父组件切换场景为0
        this.$emit("changeScenes", 0);
      }
    },
  },
};
</script>
<style lang=""></style>
