
// 引入eslint的插件
const ESLintPlugin = require('eslint-webpack-plugin')

// 引入处理html的插件
const HtmlWebpackPlugin = require("html-webpack-plugin")

// 引入处理css的插件
// const MiniCssExtractPlugin = require("mini-css-extract-plugin")

// 引入css压缩文件的处理插件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const path = require("path")

// 封装一个处理样式的loader
function getStyleLoader(pre) {
    return [
        // compiles Less to CSS
        // MiniCssExtractPlugin,
        'style-loader',
        'css-loader',
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env",//能解决大多数样式兼容性问
                    ]
                }
            }
        },
        pre,//将less编译成css文件
    ].filter(Boolean)
}

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
        rules: [
            // loader的配置
            // 处理样式的loader
            {
                // test 标识只检测.css结尾的文件
                test: /\.css$/,
                use: getStyleLoader()
                /* use: [
                    // 执行顺序，从右到左(从下到上)
                    // MiniCssExtractPlugin,//提取CSS成单独的文件
                    "style-loader",//将js中css通过创建style标签的形式添加到html中显示在页面上
                    "css-loader",//将css资源编译成commonjs的模块到js中
                ] */
            },
            {
                test: /\.less$/,
                // loader:xxx  这种写法只能使用一个loader，但是use可以使用多个loader
                use: getStyleLoader('less-loader')
                /* use: [
                    // compiles Less to CSS
                    MiniCssExtractPlugin,
                    // 'style-loader',
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "postcss-preset-env",//能解决大多数样式兼容性问
                                ]
                            }
                        }
                    },
                    'less-loader',//将less编译成css文件
                ] */
            },
            {
                test: /\.Scss$/,
                // loader:xxx  这种写法只能使用一个loader，但是use可以使用多个loader
                use: getStyleLoader('Scss-loader')
                /*  use: [
                     // compiles Less to CSS
                     // MiniCssExtractPlugin,
                     'style-loader',
                     'css-loader',
                     'Scss-loader',//将Scss编译成css文件
                 ] */
            },
            {
                test: /\.styl$/,
                // loader:xxx  这种写法只能使用一个loader，但是use可以使用多个loader
                use: getStyleLoader('styl-loader')
                /*  use: [
                     // compiles Less to CSS
                     // MiniCssExtractPlugin,
                     'style-loader',
                     'css-loader',
                     'stylus-loader',//将less编译成css文件
                 ] */
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
        ],
    },
    //插件
    plugins: [
        // plugins的配置
        // eslint插件的配置
        new ESLintPlugin({
            // context为检测哪些文件
            context: path.resolve(__dirname, "../src")
        }),
        //使用html资源处理的插件
        new HtmlWebpackPlugin({
            // 插件配置项
            // 模板：以public/index.html文件创建新的html文件
            // 新的html文件特点：1，解构和原来一致，2：会自动引入打包生成的资源
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        // 每个插件都需要用new调用初始化
        /* new MiniCssExtractPlugin({
            // 指定生成文件名和路径
            filename: "static/css/main.css"
        }) */
        new CssMinimizerPlugin()
    ],

    //模式
    // development开发模式，production生成模式
    mode: "production",

    // 下面为关闭性能提示功能
    performance: {
        hints: 'warning', // 枚举 false关闭
        maxEntrypointSize: 100000000, // 最大入口文件大小
        maxAssetSize: 100000000, // 最大资源文件大小
        assetFilter: function (assetFilename) { //只给出js文件的性能提示
            return assetFilename.endsWith('.js');
        },
        hints: false
    }
};
