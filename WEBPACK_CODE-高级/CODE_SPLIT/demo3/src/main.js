import { sum } from "./math"
// import count from './count'
console.log("hello main");
console.log(sum(1, 2, 3));

document.getElementById("btn").onclick = function () {
    // import动态导入，会将动态导入的文件代码分割(拆分成单独的模块)，在需要使用的时候自动加载
    import("./count")
        .then((res) => {
            console.log("模块加载成功了" + res);
            // 下面为引入内容计算结构
            console.log(res.default(2, 1));
        })
        .catch((err) => {
            console.log("模块加载失败了" + err);
        })
    // console.log(count(2, 1));
}