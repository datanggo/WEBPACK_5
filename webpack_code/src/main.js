import count from "./js/count"
import sum from "./js/sum"
// 想要webpack打包资源，必须引入
import "./css/index.css"
// 引入less样式
import "./less/index.less"
// 引入字体图标
import "./css/iconfont.css"

console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));