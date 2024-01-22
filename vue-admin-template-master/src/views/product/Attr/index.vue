<template lang="">
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect>
    </el-card>
    <el-card>
      <el-button
        type="primary"
        icon="el-icon-plus"
        style="margin: 10px 0"
        :disabled="!category3Id"
        @click="addAttr"
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
    @click="updateAttr(row)"
  ></el-button>
  <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
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
  <!-- 这里的解构需要用到span和input来回的切换 -->
  <el-input
    v-model="row.valueName"
    placeholder="请输入属性值名称"
    v-if="row.flag"
    @blur="toLook(row)"
    @keyup.native.enter="toLook(row)"
    :ref="$index"
  ></el-input>
  <span v-else @click="toEdit(row, $index)" style="display: block">{{
    row.valueName
  }}</span>
</template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <!-- 作用域插槽，父组件决定子组件的结构与样式 -->
            <template slot-scope="{ row, $index }">
  <!-- 气泡确认框 -->
  <el-popconfirm
    :title="`确定删除${row.valueName}吗？`"
    @onConfirm="deleteAttrValue($index)"
  >
    <el-button
      type="danger"
      icon="el-icon-delete"
      slot="reference"
      size="mini"
    ></el-button>
  </el-popconfirm>
</template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdataAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
//引入lodash中的深拷贝插件
import cloneDeep from "lodash/cloneDeep";

export default {
  name: "Attr",
  data() {
    return {
      // 定义input框的显示与隐藏
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //接收平台属性的字段
      attrList: [],
      // 定义一个属性控制table表格显示与隐藏
      isShowTable: true,
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
        attrId: this.attrInfo.id, //对于修改产品某一个属性的时候  可以在已有的属性值的基础之上新增新的属性值，但是在新增的时候需要把已有的带上
        valueName: "", //相应的属性值，
        flag: true,
        //flag相当于给每一个属性值添加一个flag，用户可单独切换编辑模式还是查看模式
        //当前的这个flag是响应式属性，数据变化视图会跟着变化
      });

      // 当以点击添加属性值按钮的时候自动聚焦到input框
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },

    // 添加按钮的回调
    addAttr() {
      // 切换table的显示与隐藏
      this.isShowTable = false;

      // 收集三级分类的id

      // 清除数据
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [
          //属性名对应的属性值，因为属性值可以是多个，因此需要的是数组
          /* {
            attrId: 0, //属性的id
            valueName: "", //相应的属性值
          }, */
        ],
        categoryId: this.category3Id, //category3Id
        categoryLevel: 3, //level即第三级的
      };
    },

    // 修改某一个属性
    updateAttr(row) {
      // console.log(row);
      // 切换table的显示与隐藏
      this.isShowTable = false;
      // 将选中的属性及相对应的属性值赋值给attrInfo
      // 由于数据结构中存在对象里面套数组，数组里又套对象，所以需要使用深拷贝解决这样的问题
      // 深拷贝，浅拷贝在面试的时候出现的频率很高，切记要达到手写深拷贝与浅拷贝
      this.attrInfo = cloneDeep(row);

      // 在修改某一个属性的时候,将相应的属性值元素添加flag标记
      this.attrInfo.attrValueList.forEach((item) => {
        // 这样书写也可以给属性值添加flag,但是flag不是响应式数据
        // $set()第一个参数为哪个对象,第二个参数添加一个响应式的属性,第三个参数为相应的属性值
        this.$set(item, "flag", false);
      });
      /* 
        向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。
        它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property 
        (比如 this.myObject.newProperty = 'hi')
        */
    },

    //失去焦点的事件
    toLook(row) {
      //如果属性值为空不能作为新的属性值，需要给用户提示让他新增
      if (row.valueName.trim() == "") {
        this.$message("请你输入正常的属性值");
        return;
      }
      // 新增的属性值不能与已有的属性值重复
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        // 需要将row从数组里面判断是否重复重复即取除
        // row是最新的属性值[attrInfo.attrValueList]数组中最后添加的哪一项
        // 判断的时候,如果重复需要把最后一项取除即row
        if (row != item) {
          return row.valueName == item.valueName;
        }
      });

      if (isRepat) {
        return;
      }

      // row是当前用户添加的最新的属性值
      row.flag = false; //当前的编辑模式变为查看模式
    },

    // 点击span的回调变为编辑模式
    toEdit(row, index) {
      // 变为编辑模式
      row.flag = true;
      // 获取input节点
      // 需要注意点击span的时候，切换input变为编辑模式，但是对于浏览器而言重绘是需要耗费时间的
      // 因此我们不可能一点击就立马获取到input
      // $nextTick,当节点渲染完毕了会执行一次
      this.$nextTick(() => {
        // 获取相应的input进行聚焦
        this.$refs[index].focus();
      });
    },

    // 气泡确认框的确认删除按钮
    // 最新版本的elementUI---2.15.14而咱们模板使用的版本是@onConfirm触发的事件
    deleteAttrValue(index) {
      // alert(11);
      // 从数组中删除相应的参数,当前删除属性值的操作是不需要发请求的
      this.attrInfo.attrValueList.splice(index, 1);
    },

    // 保存按钮：进行添加属性或者修改属性的操作
    async addOrUpdataAttr() {
      // alert(!11);

      // 整理参数
      /* 
      1:如果用户添加了很多空的属性值，不能提交给服务器
      2：提交给服务器中的数据不应该出现flag字段
      filter()过滤出符合条件的生成一个新数组
      */
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          // 过滤掉属性值不是空的才是要的
          if (item.valueName != "") {
            // 删除掉flag属性
            delete item.flag;
            return true;
          }
        }
      );
      // 成功的执行
      try {
        // 发请求提交服务器
        await this.$API.attr.reqAddOrUpdataAttr(this.attrInfo);
        //展示商品详情的信号量进行切换
        this.isShowTable = true;
        this.$message({ type: "success", message: "保存成功" });
        // 保存成功后需要再次获取平台属性进行展示
        this.getAttrList();
      } catch (error) {
        this.$message("保存失败");
      }
    },
  },
};
</script>
<style lang=""></style>
