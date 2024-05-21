const path = require('path')
//引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "js/[name].js",
        clean: true
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
                // use: ['style-loader', 'css-loader'],
                use: ['./loaders/style-loader', 'css-loader'],
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
    ],
    mode: "development",
}