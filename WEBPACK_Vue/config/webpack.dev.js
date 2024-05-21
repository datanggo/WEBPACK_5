// 开发模式的配置
// 引入插件
// webpack上面专门用于定义环境变量的差价
const { DefinePlugin } = require("webpack")

const path = require("path")
const EslintWebpackPlugin = require("eslint-webpack-plugin")
// 引入处理html资源的插件
const HtmlWebpackPlugin = require("html-webpack-plugin")

// 引入vue-loader
const { VueLoaderPlugin } = require('vue-loader')

// 封装一个函数处理可以复用的处理css资源的文件
const getStyleLoaders = (pre) => {
    return [
        'vue-style-loader',
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
        path: undefined,
        // 输出文件名
        filename: 'static/js/[name].js',
        // chunk文件的输出文件名
        chunkFilename: "static/js/[name].chunk.js",
        // 图片字体等静态资源的输出文件名
        assetModuleFilename: 'static/media/[hash:10][ext][query]'
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
                test: /\.js$/,
                include: path.resolve(__dirname, "../src"),//包含，即只处理src目录下的资源
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,//开启缓存
                    cacheCompression: false,//缓存的文件压缩关闭
                }

            },
            // vue-loader的使用
            {
                test: /\.vue$/,
                loader: 'vue-loader'
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
        // 处理vue的资源
        new VueLoaderPlugin(),

        // 定义环境变量的插件
        // cross-env定义的环境变量给打包工具使用的
        // DefinePulgin定义的环境变量是给源代码使用的，从而解决vue3页面警告的问题
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
        })
    ],
    // 模式
    mode: "development",
    devtool: "cheap-module-source-map",
    // 代码分割
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}.js`,
        },
    },
    // 解析选项---webpack解析模块的时候会加载的选项
    resolve: {
        // 自动补齐文件扩展名
        extensions: ['.vue', ".js", ".json"]
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