
// 引入定义的schema规则
const schema = require("./schema.json")

//文件里追加作者的loader
module.exports = function (content) {
    // schema对options的验证规则
    // schema符合JSON  Schema的规则
    const options = this.getOptions(schema)
    const prefix = `
    /* 
    *Author:${options.author}
    */
    `

    return prefix + content
}