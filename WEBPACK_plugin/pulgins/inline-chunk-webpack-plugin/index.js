const HtmlWebpackPlugin = require("safe-require")("html-webpack-plugin")

class InlineChunkWebpackPlugin {
    constructor(tests) {
        this.tests = tests
    }

    apply(compiler) {
        compiler.hooks.compilation.tap("InlineChunkWebpackPlugin", (compilation) => {
            // 1.获取html-webpack-plugin的hooks
            const hooks = HtmlWebpackPlugin.getHooks(compilation)
            // 2.注册html-webpack-plugin的hooks -> alterAssetTagGroups
            // 3.从里面将script标签里的runtime文件，变成illine script标签
            hooks.alterAssetTagGroups.tap(
                "InlineChunkWebpackPlugin",
                (assets) => {
                    assets.headTags = this.getInlineChunk(assets.headTags, compilation.assets)
                    assets.bodyTags = this.getInlineChunk(assets.bodyTags, compilation.assets)
                })

            // 删除runtime文件
            hooks.afterEmit.tap(
                "InlineChunkWebpackPlugin",
                () => {
                    Object.keys(compilation.assets).forEach(filepath => {
                        this.tests.some(test => test.test(filepath))
                        if (this.tests.some(test => test.test(filepath))) {
                            delete compilation.assets[filepath]
                        }
                    })
                })
        })



    }


    getInlineChunk(tags, assets) {
        /* 当前为：
        {
            tagName: 'script',
            voidTag: false,
            meta: { plugin: 'html-webpack-plugin' },
            attributes: { defer: true, src: 'js/runtime~main.js.js' }
        },
        {
            tagName: 'script',
            voidTag: false,
            meta: { plugin: 'html-webpack-plugin' },
            attributes: { defer: true, src: 'js/main.js' }
        }
 
        修改为：
        {
            tagName: 'script',
            meta: { plugin: 'html-webpack-plugin' },
            innerHTML:runtime文件的内容,
            // 闭合标签
            closeTag:true,
        },
        {
            tagName: 'script',
            meta: { plugin: 'html-webpack-plugin' },
            innerHTML:runtime文件的内容,
            // 闭合标签
            closeTag:true,
        }
        */
        return tags.map((tag) => {
            // 判断是否为script标签
            if (tag.tagName !== "script") return tag
            // 获取文件资源路径
            const filepath = tag.attributes.src
            if (!filepath) return tag

            if (!this.tests.some(test => test.test(filepath))) return tag
            return ({
                tagName: 'script',
                meta: { plugin: 'html-webpack-plugin' },
                innerHTML: assets[filepath].source(),
                // 闭合标签
                closeTag: true,
            })
        })
    }
}

module.exports = InlineChunkWebpackPlugin