
// loader就是一个函数
// 当webpack解析资源的时候，会调用相应的loader去处理
// loader接受到文件内容作为参数，返回内容出去
/* 
content     文件内容
map         SourceMap相关
meta        别的loader传递过来的数据

*/
module.exports = function (content, map, meta) {
    console.log(content);
    return content
}