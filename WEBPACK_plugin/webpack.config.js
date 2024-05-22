const path = require('path')
//引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 引入自定义方法
// const TestPlugin = require("./pulgins/test-plugin")
// 自定义的追加注释的插件
const BannerWebpackPlugin = require("./pulgins/banner-webpack-plugin")

// 自定义的打包自动清空打包目录的插件
const CleanWebpackPlugin = require("./pulgins/clean-webpack-plugin")

// 自定义的生产md文件的插件
const AnalyzeWebpackPlugin = require("./pulgins/analyze-webpack-plugin")

// 自定义的插入runtime为标签的插件
const inlineChunkWebpackPlugin = require("./pulgins/inline-chunk-webpack-plugin")


module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "js/[name].js",
        // clean: true
    },
    module: {
        rules: [
            // 执行顺序是从下到上，从左到右
            {
                test: /\.js$/,
                loader: "./loaders/test-loader.js"
            },
            {
                test: /\.js$/,
                loader: "./loaders/test1-loader.js"
            },
            {
                test: /\.js$/,
                use: [
                    './loaders/demo/test1',
                    './loaders/demo/test2',
                    './loaders/demo/test3',
                    './loaders/demo/test4',
                    './loaders/demo/test5',
                    './loaders/clean-log-loader',

                ]
            },
            {
                test: /\.js$/,
                loader: './loaders/banner-loader',
                options: {
                    author: "老王",
                    // age:18   ,不能新增字段
                }
            },
            {
                test: /\.js$/,
                loader: './loaders/babel-loader',
                options: {
                    presets: ["@babel/preset-env"]
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: './loaders/file-loader',
                type: "javascript/auto",    //阻止webpack默认处理图片资源，只使用file-loader处理
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),

        // 自定义的插件
        // new TestPlugin(),
        // 自定义的追加注释的插件
        new BannerWebpackPlugin({
            author: "jiazhneghao"
        }),

        // 自定义的打包自动清空打包目录的插件
        new CleanWebpackPlugin(),

        // 自定义的生产md文件的插件
        new AnalyzeWebpackPlugin(),

        // 自定义的插入runtime为标签的插件
        new inlineChunkWebpackPlugin([/runtime(.*).js$/g])
    ],
    // 定义代码分割
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}.js`
        }
    },
    mode: "production",
}