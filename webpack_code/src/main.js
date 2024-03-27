import count from "./js/count"
import sum from "./js/sum"
// 想要webpack打包资源，必须引入
import "./css/index.css"
// 引入less样式
import "./less/index.less"
// 引入字体图标
import "./css/iconfont.css"

// var result = count(2, 1)
console.log(count(2, 1));
// console.log(count(2, 1));
console.log(sum(1, 2, 3, 4, 5, 6));

// js需要特殊处理热模块替换
if (module.hot) {
    // 判断是否支持热模块替换功能
    // count.js模块
    module.hot.accept("./js/count")
    // sum.js模块
    module.hot.accept("./js/sum")
}