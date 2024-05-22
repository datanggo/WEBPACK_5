const loaderUtils = require('loader-utils')

// 自定义插件
module.exports = function (content) {
    // 1.根据文件内容生成带hash值的文件名
    let interpolatedName = loaderUtils.interpolateName(
        this,
        "[hash:10].[ext][query]",
        { content }
    )
    interpolatedName = `images/${interpolatedName}`
    // 2.将文件输出出去
    this.emitFile(interpolatedName, content)
    // 3.返回，module.exports = "文件路径(文件名)"
    return `module.exports = "${interpolatedName}"`
}

// 需要处理的是图片，字体的文件，他们都是Buffer数据
// 需要使用raw loader 才能处理
module.exports.raw = true