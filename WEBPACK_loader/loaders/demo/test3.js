// raw   loader
//  raw   loader 接收到的content是Buffer数据-即二进制数据
/* module.exports = function (content) {
    console.log(content);
    return content
}

module.exports.Test3Loader = true
 */
function Test3Loader(content) {
    return content
}

Test3Loader.raw = true;

module.exports = Test3Loader

