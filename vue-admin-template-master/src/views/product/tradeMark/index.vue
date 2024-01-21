<template lang="">
    <div>
        <!-- 品牌管理 -->
        <!-- 按钮 -->
        <el-button type="primary" icon="el-icon-plus" style="margin:10px 0" @click="showDialog">添加</el-button>
        <!-- 
            表格组件
            data：是表格组件将来展示的数据【数组】
            border：给表格添加边框
            column属性:
            label:显示的标题
            width：对应列的宽度
            align:标题的对齐方式
            prop:对应列内容的字段名

            注意1:elementUI当中的table组件,展示的数据是以一列一列这样去展示的
         -->
        <el-table style="width: 100%" border :data="list">
          <el-table-column type="index" label="序号" width="80px" align="center">
          </el-table-column>

          <el-table-column prop="tmName" label="品牌名称" width="width">
          </el-table-column>

          <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
            <!-- 作用域插槽   row为给父组件传递的每一条数据,-->
            <template slot-scope="{row,$index}">
              <!-- {{row}}{{$index}} -->
              <img :src="row.logoUrl" style="widtn:100px;height:100px">
            </template>
          </el-table-column>

          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
  <el-button
    type="warning"
    icon="el-icon-edit"
    size="mini"
    @click="updataTradeMark(row)"
    >修改</el-button
  >
  <el-button
    type="danger"
    icon="el-icon-delete"
    size="mini"
    @click="deleteTradeMark(row)"
    >删除</el-button
  >
</template>
          </el-table-column>
        </el-table>

        <!-- 
          分页器
          当前第几页||数据的总条数||每一页展示的条数||连续页码数
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"

          current-page：当前第几页
          total：数据的总个数
          page-size：每一页展示几条
          page-sizes:可以设置每一页展示多少条数据
          page-count:连续的页码数即页码按钮的数量，

          layout:布局方式
         -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="getPageList"
          style="margin-top:20px;textAlign:center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout=" prev, pager, next, jumper, ->,sizes,total"
          :total="total">
        </el-pagination>
        <!--
           对话框
           :visible.sync:控制对话框显示与隐藏
         -->
        <el-dialog :title="tmForm.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
          <!-- 
            form 表单
            :model:属性,这个属性把表单的数据收集到那个对象的身上,将来element要进行表单的验证,也需要这个属性
          Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。

          -->
          <el-form  style="width:70%;" :model="tmForm" :rules="rules" ref="ruleForm">
          <el-form-item label="品牌名称" label-width="100px" prop="tmName">
            <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
          </el-form-item>
          <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
            <!-- 
              :on-success="handleAvatarSuccess"//图片上传之前的回调
              :before-upload="beforeAvatarUpload" //图片上传之后的回调
              这里收集数据不能使用v-model,因为不是表单元素
              action:属性代表把图片的上传地址
              :on-success:可以检测到图片上传成功,图片上传成功执行一次
              :before-upload:图片上传之前执行一次
             -->
            <el-upload
                class="avatar-uploader"
                action="/dev-api/admin/product/fileUpload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addOrUpdataTardMark">确 定</el-button>
          </div>
        </el-dialog>


    </div>
</template>
<script>
export default {
  name: "TradeMack",
  data() {
    return {
      // 代表第几页
      page: 1,
      // 当前页显示数据的条数
      limit: 3,
      // 总共数据条数
      total: 0,
      // 列表展示的数据
      list: [],
      // 对话框显示与隐藏控制的属性
      dialogFormVisible: false,
      // 上传图片使用的属性
      imgUREL: "",
      // 收集品牌的信息,,对象身上的属性不能瞎写,需要看文档
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      // 表单验证的规则
      rules: {
        // 品牌名称的验证规则
        /* 
        required:必须要校验的字段
        message：提示的信息
        trigger：用户行为我的设置，常用的<blur>失去焦点，<change>发生变化
        min：最小长度
        max：最大长度
        */
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change",
          },
        ],
        // 品牌logo的验证规则
        logoUrl: [{ required: true, message: "请选择品牌logo" }],
      },
    };
  },

  // 组件挂载完毕发请求
  mounted() {
    // console.log(this.$API);
    // 获取列表数据的方法
    this.getPageList();
  },

  // 方法
  methods: {
    // 获取品牌列表的数据
    async getPageList(pager = 1) {
      // 修改参数
      this.page = pager;
      // console.log(pager);
      // 解构出需要用到的参数
      const { page, limit } = this;
      // 获取品牌列表的接口
      // 向服务发请求的时候,需要带参数,所以在data中初始化两个字段

      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      // console.log(result);
      if (result.code == 20000 || result.code == 200) {
        // 展示数据的总条数
        this.total = result.data.total;
        // 总条数的详细信息
        this.list = result.data.records;
      }
    },

    /* // 点击页码的回调
    handleCurrentChange(pager) {
      // console.log(pager);
      // 修改参数
      this.page = pager;
      // 再次发请求获取列表数据的方法
      this.getPageList();
    }, */

    // 当分页器某一页展示的条数发改变的时候被触发
    handleSizeChange(limit) {
      //整理参数
      this.limit = limit;
      // 再次发请求获取列表数据的方法
      this.getPageList();
    },

    // 点击添加品牌的按钮
    showDialog() {
      // 显示对话框
      this.dialogFormVisible = true;
      // 清除上一次的数据
      this.tmForm.tmName = "";
      this.tmForm.logoUrl = "";
    },

    // 修改某一个品牌
    updataTradeMark(row) {
      // row当前用户选中的这个品牌的信息
      // 显示对话框
      this.dialogFormVisible = true;
      // 将已有的品牌的信息赋值给tmform进行展示
      //将服务器返回的品牌信息直接赋值给tmForm进行展示
      // 也就是说tmForm存储的即为服务器返回的信息
      this.tmForm = { ...row };
    },

    // 上传图片成功的回调
    handleAvatarSuccess(res, file) {
      // res是上传成功之后返回给服务器的数据
      // file是上传成功之后服务器返回给前端的数据
      // console.log(res);
      // 收集品牌图片的数据,因为将来需要带给服务器
      this.tmForm.logoUrl = URL.createObjectURL(file.raw);
    },
    // 图片上传之前的回调
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    // 确认按钮,添加品牌或者修改品牌
    addOrUpdataTardMark() {
      // 当全部的 表单验证通过之后再执行提交业务
      this.$refs.ruleForm.validate(async (success) => {
        // console.log(success);
        // 如果全部字段符合条件执行提交业务
        if (success) {
          // 隐藏对话框
          this.dialogFormVisible = false;
          // 发请求(添加品牌||修改品牌)
          let result = await this.$API.trademark.reqAddUpdateTradeMark(
            this.tmForm
          );
          // console.log(result);
          if (result.code == 200) {
            // 弹出一个信息:添加成功,修改品牌成功
            this.$message({
              type: "success",
              message: this.tmForm.id ? "修改品牌成功" : "添加品牌成功",
            });
            // 添加或者修改品牌信息之后,再次获取品牌列表
            // 如果是添加品牌 停留在第一页，但是修改品牌应该留在当前页
            this.getPageList(this.tmForm.id ? this.page : 1);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 删除品牌的操作
    deleteTradeMark(row) {
      // console.log(row);
      // 弹框
      this.$confirm(`确定删除${row.tmName}品牌吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 当用户点击确定按钮的时候会触发.then()
          // 向服务器发请求删除
          let result = await this.$API.trademark.reqDeleteTradeMark(row.id);
          // 如果删除成功弹窗
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            // z再次获取品牌的数据
            this.getPageList(this.list.length > 1 ? this.page : this.page - 1);
          } else {
            this.$message({
              type: "success",
              message: "删除失败!",
            });
          }
        })
        .catch(() => {
          // 当用户点击确定按钮的时候会触发.catch()
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>