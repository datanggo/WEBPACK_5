//自定义清理 console.log();的loader

module.exports = function (content) {
    // 清除内容中的console.log(XXXX)语句
    return content.replace(/console\.log\(.*\);?/g, "")
}