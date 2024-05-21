// 开发模式的配置
// 引入插件
const path = require("path")
const EslintWebpackPlugin = require("eslint-webpack-plugin")
// 引入处理html资源的插件
const HtmlWebpackPlugin = require("html-webpack-plugin")
// 引入处理样式文件的插件
// 提取css为单独文件的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css的插件
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
// 压缩js的插件
const TerserWebpackPlugin = require('terser-webpack-plugin')
// 处理public文件夹下的资源
const CopyPlugin = require("copy-webpack-plugin");

// 引入js代码的热加载插件
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// 判断处于那种模式
const isProdution = process.env.NODE_ENV === "production"


// 封装一个函数处理可以复用的处理css资源的文件
const getStyleLoaders = (pre) => {
    return [
        isProdution ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader',
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        'postcss-preset-env'
                    ]
                }
            }
        },
        pre
    ].filter(Boolean)
}


module.exports = {
    // 入口
    entry: "./src/main.js",
    // 输出
    output: {
        // 输出路径
        path: isProdution ? path.resolve(__dirname, "../dist") : undefined,
        // 输出文件名
        filename: isProdution ? 'static/js/[name].[contenthash:10].js' : 'static/js/[name].js',
        // chunk文件的输出文件名
        chunkFilename: isProdution ? "static/js/[name].[contenthash:10].chunk.js" : "static/js/[name].chunk.js",
        // 图片字体等静态资源的输出文件名
        assetModuleFilename: 'static/media/[hash:10][ext][query]',
        // 清空上一次打包结果
        clean: true,
    },
    module: {
        // loader的配置
        rules: [
            // 处理css文件
            {
                test: /\.css$/,
                use: getStyleLoaders()
                /* use:  [
                     'style-loader',
                     'css-loader',
                     {
                         // 如果考虑兼容性问题，即把css文件生成单独的文件利用link标签引入，需要做此配置
                         // 如果在这里配置此项需要同时在package.json文件中配置指定兼容性做到什么程度
                         //  即此段代码"browserslist": [
                         //     "last 2 version",       //最近的两个版本
                         //     "> 1%",                 //覆盖99%的浏览器
                         //     "not dead"              //死掉的浏览器不做
                         //   ] 
                         loader: "postcss-loader",
                 options: {
                     postcssOptions: {
                         plugins: [
                             'postcss-preset-env'
                         ]
                     }
                 }
             }
         ] */
            },
            {
                test: /\.less$/,
                use: getStyleLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoaders('sass-loader')
            },
            {
                test: /\.styl$/,
                use: getStyleLoaders('stylus-loader')
            },
            // 处理图片文件
            {
                test: /\.(jpe?g|png|gif|webp|svg)$/,
                type: 'asset',
                // 处理图片资源小于10kb转成base64字符
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    }
                }
            },
            // 处理其他资源
            {
                test: /\.(worff2?|ttf)$/,
                type: 'asset/resource',//resource即原封不动的输出

            },
            // 处理js文件  //babel的配置文件详见---babel.config.js
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, "../src"),//包含，即只处理src目录下的资源
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,//开启缓存
                    cacheCompression: false,//缓存的文件压缩关闭
                    // js热加载-react集成插件
                    plugins: [
                        !isProdution && 'react-refresh/babel' //激活js的HMR功能
                    ].filter(Boolean)
                }
            }
        ],
    },


    //  插件
    plugins: [

        // 引入eslint并配置--详见.eslintrc.js文件
        new EslintWebpackPlugin({
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules",//排除node_modules文件不处理
            cache: true,//开启缓存
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"),//指定缓存目录
        }),

        // 处理html文件
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html")
        }),
        // 提取css为一个单独的文件
        isProdution && new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:10].css',
            chunkFilename: 'static/css/[name].[contenthash:10].chunk.css',
        }),
        // 处理public文件夹下的静态资源
        isProdution && new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'), to: path.resolve(__dirname, '../dist'),
                    globOptions: {
                        // 处理的时候忽略index这个文件
                        ignore: ["**/index.html"],
                    },
                },
            ],
        }),
        !isProdution && new ReactRefreshWebpackPlugin()
    ].filter(Boolean),
    // 模式
    mode: isProdution ? "production" : "development",
    devtool: isProdution ? "source-map" : "cheap-module-source-map",
    // 代码分割
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}.js`,
        },
        // 是否需要进行压缩
        minimizer: isProdution,
        minimizer: [
            // css压缩的插件
            new CssMinimizerWebpackPlugin(),
            // js压缩的插件
            new TerserWebpackPlugin()
        ]
    },
    // 解析选项---webpack解析模块的时候会加载的选项
    resolve: {
        // 自动补齐文件扩展名
        extensions: ['.jsx', ".js", ".json"]
    },
    // 自动化配置
    devServer: {
        host: "localhost",
        port: 3000,
        open: true,
        hot: true,//开启HMR
        historyApiFallback: true,//解决前端路由刷新404的问题
    },
}
