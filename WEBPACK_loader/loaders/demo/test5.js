module.exports = function (content) {
    console.log("normal 2");
    return content
};

module.exports.pitch = function () {
    console.log("pitch 2");
    // return "return结果--会中断"
}