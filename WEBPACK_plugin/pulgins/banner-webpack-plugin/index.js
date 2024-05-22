// 自定义追加注释的插件

class BannerWebpackPlugin {
    // 接收传递过来的数据
    constructor(options = {}) {
        this.options = options
    }
    apply(compiler) {
        // 在资源输出之前触发点钩子
        compiler.hooks.emit.tapAsync("BannerWebpackPlugin", (compilation, callback) => {
            // console.log(compilation.assets);
            const extensions = ["css", "js"]
            // 1.获取即将输出的资源：compilation.assets
            // 2.过滤只保留js和css资源
            const assets = Object.keys(compilation.assets).filter(assetpath => {
                // 将文件名切割["xxxx","js"]//["xxxx","css"]
                const splitted = assetpath.split(".")
                // 获取最后一个文件扩展名
                const extension = splitted[splitted.length - 1]
                // 判断是否包含
                return extensions.includes(extension)
            })

            const prefix =
                `
/* 
*Author:${this.options.author}
*/
`
            // 3.便利剩下资源添加上注释
            assets.forEach(asset => {
                // 获取原来内容
                const source = compilation.assets[asset].source()
                // 拼接注释
                const content = prefix + source
                // 修改资源
                compilation.assets[asset] = {
                    // 最终资源输出的时候，会调用source方法，source方法的返回值就是资源的具体内容
                    source() {
                        return content
                    },
                    // 指定资源大小
                    size() {
                        return content.length
                    }
                }
            })
            callback()
        })
    }
}

module.exports = BannerWebpackPlugin