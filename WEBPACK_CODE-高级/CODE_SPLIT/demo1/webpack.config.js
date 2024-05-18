// 引入路径组件
const path = require('path')
// 引入插件处理html资源
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    // 入口文件
    // entry:"./src/main.js", //只有一个入口文件，为单入口文件
    entry: { //多个入口文件，为多入口
        app: "./src/app.js",
        main: "./src/main.js",
    },
    // 输出
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js",  //webpack命名方式，[name]即以文件名自己命名
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: path.resolve(__dirname, "public/index.html")
            }
        )
    ],
    mode: "production"
}