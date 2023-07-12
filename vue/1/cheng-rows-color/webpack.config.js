const path = require('path')  //导入node.js中专门操作路径的模块




// 向外暴露配置对象
module.exports = {
  mode: "development", //mode用来指定构建模式，可选值有development和production
  entry: path.join(__dirname, './src/index.js'), //设置/修改文件的存放路径
  output: {
    path: path.join(__dirname, './dist'),//输出文件的存放路径
    filename: 'bundle.js'   //输出文件的名称
  }
};
