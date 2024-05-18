// webpack配置文件---开发模式


// 引入path路径
const path = require("path")  //node.js核心模块,专门用来处理路径问题的

// 引入插件，插件需要引用才能使用---eslint
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

// 引入处理html资源的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取cpu核数---nodejs核心模块，直接使用
const os = require("os");
// cpu核数
const threads = os.cpus().length;
// console.log(threads);

module.exports = {
    //入口
    entry: "./src/main.js", //相对路径
    //输出
    output: {
        //所有文件打包后的输出路径
        // __dirname是nodejs的变量，代表当前文件的文件夹目录
        // 开发模式没有输出，所以输出可以定义空
        path: undefined,
        //入口文件打包文件输出的名称
        filename: "static/js/[name].js",
        // 打包输出的分割代码-即按需引入片段文件命名--[name]即在引入处定义的名称，此处见main.js里import()按需引入
        chunkFilename: "static/js/[name].chunk.js",
        // 图片，字体图标等，通过type：asset处理资源，统一命名方式
        assetModuleFilename: 'static/media/[hash:10][ext][query]',
        // 自动清空上次打包的内容
        // 原理:打包前将path整个目录内容清空,再进行打包
        clean: true,
    },
    //加载器
    module: {
        rules: [
            // loader的配置
            {
                // OneOf每个文件只能被其中一个loader处理
                oneOf: [
                    // 处理css资源的loader
                    {
                        test: /\.css$/, //检测.css结尾的文件
                        use: [              //use执行顺序是从右至左或者从下到上
                            'style-loader', //将js中css通过创建style标签添加到html文件中生效
                            'css-loader',  //将css资源编译成common.js都模块到js中
                        ],
                    },
                    // 处理less资源的loader
                    {
                        test: /\.less$/,
                        // loader:"XXXX",此处写和use:[]效果一样，区别就是loader只能使用一个，use可以使用多个
                        use: [
                            'style-loader', //
                            'css-loader',   //
                            'less-loader',  //将less编译成css文件
                        ],
                    },
                    // 处理sass资源的loader
                    {
                        test: /\.s[ac]ss$/,
                        use: [
                            // compiles Less to CSS
                            'style-loader', //
                            'css-loader',   //
                            'sass-loader',  //将sass编译成css文件
                        ],
                    },
                    // 处理stylus资源的loader
                    {
                        test: /\.styl$/,
                        use: [
                            'style-loader', //
                            'css-loader',   //
                            'stylus-loader',  //将stylus编译成css文件
                        ],
                    },
                    //处理图片资源
                    {
                        test: /\.(png|jpe?g|gif|webp|svg)/,
                        type: 'asset',
                        parser: {
                            dataUrlCondition: {
                                //小于10kb会转base64
                                //优点：减少请求数量，缺点：体积会变的大一点
                                maxSize: 10 * 1024 // 10kb
                            }
                        },
                        // generator: {
                        //     // 输出的图片名字
                        //     // [hash:10]代表该图片hash命名时只取前10位
                        //     filename: 'static/images/[hash:10][ext][query]'
                        // }
                    },
                    //处理font字体图标资源
                    {
                        test: /\.(ttf|woff2?|mp3|mp4|avi)/,
                        type: 'asset/resource',
                        // generator: {
                        //     // 输出的字体图标名字
                        //     // [hash:10]代表该资源hash命名时只取前10位
                        //     filename: 'static/media/[hash:10][ext][query]'
                        // }
                    },
                    // babel-loader的使用
                    {
                        test: /\.js$/,
                        include: path.resolve(__dirname, '../src'),      //include包含，只处理src下的文件，其他文件不处理
                        // exclude: /(node_modules|bower_components)/,//exclude排除， 排除node_modules文件不处理,其他文件处理
                        use: [
                            {
                                loader: 'thread-loader', //开启多进程，处理babel的loader
                                options: {
                                    works: threads,      //此配置项为开启进程的数量为，当前cpu的核数
                                }
                            },
                            {
                                loader: 'babel-loader',
                                // 下面的配置项同样支持外部配置--详见babel.config.js配置文件
                                options: {
                                    //     presets: ['@babel/preset-env'],
                                    cacheDirectory: true,  //开启babel缓存，提升第二次和第n次打包速度
                                    cacheCompression: false,//关闭缓存文件压缩
                                    // 缓存文件的目录为node_modules/.cache/babel-loader
                                    plugins: ["@babel/plugin-transform-runtime"],//减少babel打包代码体积
                                },
                            }
                        ],
                    },
                ]
            }
        ],
    },
    //插件
    plugins: [
        // plugin的配置
        // eslint的配置
        new ESLintWebpackPlugin(
            {
                // 主要检测哪些文件
                context: path.resolve(__dirname, '../src'),
                exclude: 'node_modules',     //针对此插件配置即此插件排除node_modules文件不处理其他的都处理
                cache: true,                 //开启eslint缓存，提升第二次和第n次打包速度
                cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache'),//指定eslint缓存文件存放的目录
                threads,        //eslint开启多进程的方式可以直接写当前cpu的核数即为开启
            }
        ),
        // 处理html资源的插件
        new HtmlWebpackPlugin(
            {
                // 模板:以pabulic/index.html文件资源为模板,创建新的html文件
                // 新的html文件特点:1.结构和原来的一样,2.自动引入打包的资源
                template: path.resolve(__dirname, '../public/index.html')
            }
        ),
    ],

    // 开发服务器的配置:不会输出资源，在内存中编译打包的
    devServer: {
        host: "localhost",//启动服务器域命
        port: "3000",    //启动服务器的端口号
        open: true,      //是否自动打开浏览器
        // hot: false,       //关闭HMR即热模块替换
        hot: true,        //开启热模块替换
    },
    //模式 -----development-开发模式
    mode: "development",
    // 此选项控制是否生成，以及如何生成 source map。
    devtool: "cheap-module-source-map",
};