
const OS = require("os")//获取系统参数
const threads = OS.cpus().length  //cpu的核数

// 压缩js的插件
const TerserWabpackPlugin = require("terser-webpack-plugin")

// 引入eslint的插件
const ESLintPlugin = require('eslint-webpack-plugin')

// 引入处理html的插件
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
    // 入口
    entry: './src/main.js',//相对路径
    //输出
    output: {
        // 所有打包文件的输出路径
        //__dirname nodejs的变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, "../dist"),//绝对路径
        // 入口文件打包输出的 文件名
        filename: 'static/js/main.js',
        // 打包时自动清空上一次打包结果
        // 在打包前将dist目录清空再进行打包
        clean: true,
    },
    //加载器
    module: {
        /*  rules: [
             // loader的配置
             // 处理样式的loader
             {
                 // test 标识只检测.css结尾的文件
                 test: /\.css$/,
                 use: [
                     // 执行顺序，从右到左(从下到上)
                     "style-loader",//将js中css通过创建style标签的形式添加到html中显示在页面上
                     "css-loader",//将css资源编译成commonjs的模块到js中
                 ]
             },
             {
                 test: /\.less$/,
                 // loader:xxx  这种写法只能使用一个loader，但是use可以使用多个loader
                 use: [
                     // compiles Less to CSS
                     'style-loader',
                     'css-loader',
                     'less-loader',//将less编译成css文件
                 ]
             },
             {
                 test: /\.Scss$/,
                 // loader:xxx  这种写法只能使用一个loader，但是use可以使用多个loader
                 use: [
                     // compiles Less to CSS
                     'style-loader',
                     'css-loader',
                     'Scss-loader',//将Scss编译成css文件
                 ]
             },
             {
                 test: /\.styl$/,
                 // loader:xxx  这种写法只能使用一个loader，但是use可以使用多个loader
                 use: [
                     // compiles Less to CSS
                     'style-loader',
                     'css-loader',
                     'styl-loader',//将less编译成css文件
                 ]
             },
             // 处理图片资源的配置
             {
                 test: /\.(png|jpe?g|gif|webp|svg)$/,
                 type: "asset",  //会转换成base64
                 parser: {
                     dataUrlCondition: {
                         // 一般就是小于10kb的图片会转换成base64
                         // 优点：减少请求数据，缺点：体积会更大
                         maxSize: 10 * 1024,//10kb
                     },
                 },
                 generator: {
                     // 生成输出的图片名称
                     // [hash:10]   表示hash值取前10位
                     filename: "static/images/[hash:10][ext][query]",
                 }
             },
 
             // 处理字体文件
             {
                 test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
                 type: "asset/resource",
                 generator: {
                     // [hash:10]   表示hash值取前10位
                     filename: "static/media/[hash:10][ext][query]",
                 }
             },
             // babel的使用
             {
                 test: /\.js$/,
                 exclude: /node_modules/,//排除node_modules不处理
                 use: {
                     loader: 'babel-loader',
                     // options: {
                     //     presets: ['@babel/preset-env'],
                     // },
                 },
             },
         ], */

        // oneOf的使用
        rules: [
            // oneOf的配置：即只被其中一个loader处理
            {
                // 每个文件只能被其中一个loader配置处理
                oneOf: [
                    // loader的配置
                    // 处理样式的loader
                    {
                        // test 标识只检测.css结尾的文件
                        test: /\.css$/,
                        use: [
                            // 执行顺序，从右到左(从下到上)
                            "style-loader",//将js中css通过创建style标签的形式添加到html中显示在页面上
                            "css-loader",//将css资源编译成commonjs的模块到js中
                        ]
                    },
                    {
                        test: /\.less$/,
                        // loader:xxx  这种写法只能使用一个loader，但是use可以使用多个loader
                        use: [
                            // compiles Less to CSS
                            'style-loader',
                            'css-loader',
                            'less-loader',//将less编译成css文件
                        ]
                    },
                    {
                        test: /\.Scss$/,
                        // loader:xxx  这种写法只能使用一个loader，但是use可以使用多个loader
                        use: [
                            // compiles Less to CSS
                            'style-loader',
                            'css-loader',
                            'Scss-loader',//将Scss编译成css文件
                        ]
                    },
                    {
                        test: /\.styl$/,
                        // loader:xxx  这种写法只能使用一个loader，但是use可以使用多个loader
                        use: [
                            // compiles Less to CSS
                            'style-loader',
                            'css-loader',
                            'styl-loader',//将less编译成css文件
                        ]
                    },
                    // 处理图片资源的配置
                    {
                        test: /\.(png|jpe?g|gif|webp|svg)$/,
                        type: "asset",  //会转换成base64
                        parser: {
                            dataUrlCondition: {
                                // 一般就是小于10kb的图片会转换成base64
                                // 优点：减少请求数据，缺点：体积会更大
                                maxSize: 10 * 1024,//10kb
                            },
                        },
                        generator: {
                            // 生成输出的图片名称
                            // [hash:10]   表示hash值取前10位
                            filename: "static/images/[hash:10][ext][query]",
                        }
                    },

                    // 处理字体文件
                    {
                        test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
                        type: "asset/resource",
                        generator: {
                            // [hash:10]   表示hash值取前10位
                            filename: "static/media/[hash:10][ext][query]",
                        }
                    },
                    // babel的使用
                    {
                        test: /\.js$/,
                        // exclude: /node_modules/,//排除node_modules不处理，其他文件都处理
                        include: path.resolve(__dirname, "../src"),  //只处理src下面的文件，其他文件不处理
                        use: [
                            {
                                loader: 'thread-loader',  //开启多进程
                                options: {
                                    works: threads, //进程数量
                                }
                            },
                            {
                                loader: 'babel-loader',
                                // options: {
                                //     presets: ['@babel/preset-env'],
                                // },
                                options: {
                                    // presets: ['@babel/preset-env'],
                                    cacheDirectory: true,//开启babel缓存
                                    cacheComperssion: false,//关闭缓存文件的压缩
                                },
                            },
                        ]
                    },
                ]
            }
        ]
    },
    //插件
    plugins: [
        // plugins的配置
        // eslint插件的配置
        new ESLintPlugin({
            // context为检测哪些文件
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules", //默认值
            cache: true,//开启缓存
            // 指定缓存位置
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/eslintcache"),
            // 开启多进程和进程数量
            threads,
        }),
        //使用html资源处理的插件
        new HtmlWebpackPlugin({
            // 插件配置项
            // 模板：以public/index.html文件创建新的html文件
            // 新的html文件特点：1，解构和原来一致，2：会自动引入打包生成的资源
            template: path.resolve(__dirname, "../public/index.html"),
        }),

    ],
    // 压缩js多线程
    optimization: {
        minimizer: [
            new TerserWabpackPlugin([
                parallel : threads,// 开启多进程和进程数量
            ])
        ]
    },

    // 开发服务器的配置:不会输出资源，再内存中进行打包的
    devServer: {
        host: 'localhost',//启动服务器域名
        port: '3000',//启动服务器端口
        open: true,//是否自动打开浏览器
        // hot 为HotModuleReplacement(HMR/热模块替换)
        // 值false为关闭，true为打开
        hot: true,
    },

    //模式
    // development开发模式，production生成模式
    mode: "development",
    // devtool,此项配置为检测错误文件的定位位置为源文件
    devtool: "cheap-module-source-map"
};
