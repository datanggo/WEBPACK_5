// eslint的配置文件
module.exports = {
    // 继承Eslint规则
    extends: ["eslint:recommended"],
    env: {
        node: true,//启用node中全局变量
        browser: true,//启用浏览器中全局变量
    },
    parserOptions: {
        ecmaVersion: 6,     //es6版本
        sourceType: "module",//es module
    },
    rules: {
        "no-var": 2,//不能使用var定义变量
    },

}
