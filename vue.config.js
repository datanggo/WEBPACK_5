const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  lintOnSave: false, //关闭保存时 的语法检查
});
