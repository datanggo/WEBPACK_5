// 1 使用ES6 导入语法  导入jQuery
//此处即导入下载好的jquery包，后面可以直接使用$符号代表jquery
import $ from "jquery";



// 定义jQuery的入口函数
$(function () {
  // 实现奇偶行变色
  //   即选中所有的奇数行
  $("li:odd").css("background-color", "pink");
  //   即选中所有的偶数行
  $("li:even").css("background-color", "yellow");
  $("li").css("list-style", "none")
});
