// 此处是babel-loader的配置文件
module.exports = {
    // 智能预设，能够编译ES6的语法并转换为旧语法，提高兼容性
    presets: [
        [
            '@babel/preset-env',
            {                          //此为解决js兼容性问题的补丁的配置即按需加载自动引入
                useBuiltIns: 'usage',//按需加载自动引入
                corejs: 3              //指定corejs版本为3
            }
        ]
    ]
}