// 自定义插件分析打包资源情况


class AnaluzeWebpackPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap("AnaluzeWebpackPlugin", (compilation) => {
            // 遍历所有即将输出的文件，得到其大小，
            /* 
            entries方法。 可以将对象变成一个二维数组
            对象：{
                key：value
                key：value
            }

            二维数组：[
                [key,value],
                [key,value]
            ]
            */
            const assets = Object.entries(compilation.assets)
            /* 
            md文件表格的书写语法
            |资源名称|资源大小|
            |---|---|
            |xx.js|10kb|
            */
            let content =
                `| 资源名称 | 资源大小 |
| --- | --- |
`
            assets.forEach(([filename, file]) => {
                return content += `\n| ${filename} | ${Math.round(file.size() / 1024) + 'kb'} | `
            })
            // 最终生成一个md文件---修改资源
            compilation.assets["analyze.md"] = {
                // 指定文件内容
                source() {
                    return content
                },
                // 指定文件大小
                size() {
                    return content.length
                }
            }
        })
    }
}

module.exports = AnaluzeWebpackPlugin