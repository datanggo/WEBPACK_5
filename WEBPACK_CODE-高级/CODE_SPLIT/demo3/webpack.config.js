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
    mode: "production",
    optimization: {
        // 代码分割配置
        splitChunks: {
            chunks: "all",//对所有模块都进行分割
            // 以下是默认值
            // minSize：20000,    //分割代码最小的大小
            //minRemainingSize:0,//类似于minSize，最后确保提取的文件大小不能为0
            //minChunks:1,       //至少被引用的次数，满足条件才会分割代码
            //maxAsyncRequests:30,                      //按需加载时并行加载的文件的最大数量
            //maxInitialRequests:30,                    //入口js文件最大并行请求数量
            //enforceSizeThreshold:50000,               //超过50kb一定会单独打包(此时会忽略minRemainingSize,maxAsyncRequests,maxInitialRequests)
            //cacheGroups:{                             //组，哪些模块要打包到一个组
            // defaultVendors:{                     //组名
            // test:/[\\/]node_modules[\\/]/,   //需要打包到一起的模块
            // priority:-10,                       //权重(越大越高)
            // reuseExistingChunk:true,         //如果当前chunk包含已从bundle中拆分出的模块，则它将被重用，而不是生成新的模块
            // },
            // default:{                    //其他没有写的配置会使用上面的默认值
            // minChunks:2,             //这里的minChunks权重更大
            // priority:-20,
            // reuseExistingChunk:true,
            // },
            // }
            // 修改配置
            cacheGroups: {
                // 组，哪些模块要打包到一个组
                // defaultVendors:{  //组名
                // test:/[\\/]node_modules[\\/]/,   //需要打包到一起的模块
                // priority:-10,//权重(越大越高)
                // reuseExistingChunk:true,//如果当前chunk包含已从主bundle中拆分出的模块，则它将会被重用，而不是生成新的模块
                // },
                default: {
                    // 其他没有写的配置会使用上面的默认值
                    minSize: 0,//我们定义的文件体积太小了，所以要改打包的最小文件体积
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    }
}
