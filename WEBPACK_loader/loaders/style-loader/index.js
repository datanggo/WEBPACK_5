

/* 
module.export = function (content) {
    /* 
    1.直接使用style-loader，只能处理样式
        不能处理样式中引入的其他资源
        use:["./loader/style-loader"]
    2.借助css-loader解决样式中引入的其他资源的问题
        use:["./loaders/style-loader","css-loader"]   
        
    问题是css-loader暴露的是一段js代码，style-loader需要执行js代码，得到返回值，再动态创建style标签，插入到页面上不好操作
 
    const script = `
    const styleEl = document.createElement('style')
    styleEl.innerHTML = ${JSON.stringify(content)}
    document.head.appendChild(styleEl)
    `
    return script
} */

module.exports.pitch = function (remainingRequest) {
    // remainingRequest剩下还需要处理的loader
    // console.log(remainingRequest);
    // 1.将remainingRequest中绝对路径该成相对路径
    const relativePath = remainingRequest.split("!").map(absolutepath => {
        // 返回一个相对路径
        return this.utils.contextify(this.context, absolutepath)
    }).join("!")

    // relativePath即是相对路径

    // 2.引入css-loader处理后的资源
    // 3.动态创建style标签插入页面生效
    const script = `
    import style from "!!${relativePath}"
    const styleEl = document.createElement('style')
    styleEl.innerHTML = ${JSON.stringify(content)}
    document.head.appendChild(styleEl)
    `
    // 终止后面loader的执行
    return script
}