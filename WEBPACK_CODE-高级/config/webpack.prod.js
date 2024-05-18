// webpack配置文件----生产模式

// 引入path路径
const path = require("path")  //node.js核心模块,专门用来处理路径问题的

// 引入插件，插件需要引用才能使用---eslint
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

// 引入处理html资源的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 引入专门用于提取CSS为单独文件的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 引入压缩CSS文件的插件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// 获取cpu核数---nodejs核心模块，直接使用
const os = require("os");
// cpu核数
const threads = os.cpus().length;
// console.log(threads);

// 引入压缩js代码的插件
const TerserWebpackPlugin = require('terser-webpack-plugin')

// 引入@vue/perload
// 让浏览器后台加载未来使用的资源 --preload:让浏览器立即加载，prefetch：让浏览器空闲时才会开始加载
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');

// 引入PWA技术插件即渐进式网络应用程序---可在网页断网后使用简单的操作，类似app一样断网可正常操作
const WorkboxPlugin = require('workbox-webpack-plugin');

// 把重复的代码单独抽出封装
function getStyleLoader(prePro) {
    return [              //use执行顺序是从右至左或者从下到上
        MiniCssExtractPlugin.loader, //此loader为专门用于提取css为单独文件
        'css-loader',  //将css资源编译成common.js都模块到js中
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env",//能解决大多数样式兼容性问题
                    ],
                },
            },
        },
        prePro
    ].filter(Boolean);
};

module.exports = {
    //入口
    entry: "./src/main.js", //相对路径
    //输出
    output: {
        //所有文件打包后的输出路径
        // __dirname是nodejs的变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, "../dist"),  //绝对路径
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
                        use: getStyleLoader(),
                    },
                    // 处理less资源的loader
                    {
                        test: /\.less$/,
                        // loader:"XXXX",此处写和use:[]效果一样，区别就是loader只能使用一个，use可以使用多个
                        use: getStyleLoader('less-loader'),
                    },
                    // 处理sass资源的loader
                    {
                        test: /\.s[ac]ss$/,
                        use: getStyleLoader('sass-loader'),
                    },
                    // 处理stylus资源的loader
                    {
                        test: /\.styl$/,
                        use: getStyleLoader('stylus-loader'),
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
                        // exclude: /(node_modules|bower_components)/,//排除node_modules文件不处理
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
            },
        ),
        // 专门用于处理CSS文件提取为一个单独文件的插件    
        new MiniCssExtractPlugin({
            filename: "static/css/[name].css",
            chunkFilename: "static/css/[name].chunk.css",
        }),

        // 以下代码放到下面optimization配置项里有同样的效果
        // // 使用专门压缩CSS文件的插件
        // new CssMinimizerPlugin(),
        // // 压缩js代码的插件
        // new TerserWebpackPlugin(
        //     {
        //         parallel: threads,   //开启压缩js代码的多进程，进程数量为当前cpu的核数
        //     }
        // ),
        // 让浏览器后台加载未来使用的资源 --preload:让浏览器立即加载，prefetch：让浏览器空闲时才会开始加载
        new PreloadWebpackPlugin({
            //rel: 'preload', //采用加载的方式--让浏览器立即加载
            //as: 'script'    //优先级相当于script标签，同样可以设置为style    
            rel: "prefetch" ///采用加载的方式--让浏览器空闲时才会开始加载
        }),
        // 渐进式网络应用程序
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助快速启用 ServiceWorkers
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true,
        }),
    ],
    optimization: {
        minimizer: [
            // 使用专门压缩CSS文件的插件
            new CssMinimizerPlugin(),
            // 压缩js代码的插件
            new TerserWebpackPlugin(
                {
                    parallel: threads,   //开启压缩js代码的多进程，进程数量为当前cpu的核数
                }
            ),
        ],
        // 打包代码优化，代码分割配置
        splitChunks: {
            chunks: "all",
            // 其他的都用默认值---详见  CODE_SPLIT/demo3/webpack.config.js
        },
        // 生成runtime文件，作为所有文件引入路径的资源池
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}.js`
        },
    },


    // 此为生产模式配置文件，生产模式不需要devServer
    // 开发服务器的配置:不会输出资源，在内存中编译打包的
    /*  devServer: {
         host: "localhost",//启动服务器域命
         port: "3000",    //启动服务器的端口号
         open: true,      //是否自动打开浏览器
     }, */
    //模式  ---production-生产模式
    mode: "production",
    // 此选项控制是否生成，以及如何生成 source map。
    devtool: "source-map"
};