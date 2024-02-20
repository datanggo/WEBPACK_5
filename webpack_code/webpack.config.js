const path = require("path")

module.exports = {
    // 入口
    entry: './src/main.js',
    //输出
    output: {
        // 所有打包文件的输出路径
        //__dirname nodejs的变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, "dist"),//绝对路径
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
        ],
    },
    //插件
    plugins: [
        // plugins的配置
    ],
    //模式
    // development开发模式，production生成模式
    mode: "development",
};
