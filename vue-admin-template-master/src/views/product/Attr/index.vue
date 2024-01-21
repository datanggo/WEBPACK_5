<template lang="">
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>
    <el-card>
      <el-button
        type="primary"
        icon="el-icon-plus"
        style="margin: 10px 0"
        :disabled="!category3Id"
        @click="isShowTable = false"
        >添加属性</el-button
      >
      <div v-show="isShowTable">
        <!-- 表格展示平台属性 -->
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <!-- 这里是利用了作用域插槽，父组件定义子组件的数据和样式 -->
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0px 5px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <!-- 这里是利用了作用域插槽，父组件定义子组件的数据和样式 -->
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="isShowTable = false"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <!-- 添加属性或者修改属性的结构 -->
        <el-form
          :inline="true"
          ref="form"
          label-width="80px"
          style="margin: 10px 0"
          :model="attrInfo"
        >
          <el-form-item label="属性名">
            <el-input
              palceholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          el-icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          border
          style="width: 100%; margin: 10px 0"
          :data="attrInfo.attrValueList"
        >
          <el-table-column type="index" align="center" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <!-- 作用域插槽，父组件决定子组件的结构与样式 -->
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <!-- 作用域插槽，父组件决定子组件的结构与样式 -->
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //接收平台属性的字段
      attrList: [],
      // 定义一个属性控制table表格显示与隐藏
      isShowTable: false,
      // 收集新增或者修改属性的字段
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [
          //属性名对应的属性值，因为属性值可以是多个，因此需要的是数组
          /* {
            attrId: 0, //属性的id
            valueName: "", //相应的属性值
          }, */
        ],
        categoryId: 0, //category3Id
        categoryLevel: 3, //level即第三级的
      },
    };
  },

  // 方法
  methods: {
    // 自定义事件的回调，收集子组件传递过来的数据
    getCategoryId({ categoryId, level }) {
      // console.log(categoryId);
      // if判断三级分类那一级几级的id
      if (level == 1) {
        this.category2Id = "";
        this.category3Id = "";
        this.category1Id = categoryId;
      } else if (level == 2) {
        this.category3Id = "";
        this.category2Id = categoryId;
      } else {
        // 代表三级分类的id有了
        this.category3Id = categoryId;
        // 发请求获取平台的属性
        this.getAttrList();
      }
    },

    // 获取平台属性的方法
    // 当用户确定三级分了数据的时候，可以向服务器发请求获取平台属性进行展示
    async getAttrList() {
      // 结构出需要的数据
      const { category1Id, category2Id, category3Id, $API } = this;
      // 发请求
      let result = await $API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      // console.log(result);
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },

    // 添加属性值的回调
    addAttrValue() {
      // 向属性值的数组里push元素
      this.attrInfo.attrValueList.push({
        attrId: undefined, //相应属性的id，目前添加的还没有id直接带undefined
        valueName: "", //相应的属性值，
      });
    },
  },
};
</script>
<style lang=""></style>
