

/* 
1.webpack加载webpack.config.js中所有配置，此时就会new  TestPlugin(),执行插件的constructor
2.webpack创建compiler对象
3.变量所有plugins中插件，调用插件的apply方法
4.执行剩下编译流程(触发各个hooks事件)
*/


class TestPlugin {
    constructor() {
        console.log("constructor");
    }
    apply(compiler) {
        // node-调试短点
        debugger
        console.log("Plugin apply");
        // 由文档可知，environment是同步钩子，所以需要使用tap注册---SyncHook
        compiler.hooks.environment.tap("TestPlugin", () => {
            console.log("TestPlugin environment");
        })


        // 异步串行钩子emit   --AsyncSeriesHook
        // hooks即事件--异步写法
        compiler.hooks.emit.tap("TestPlugin", (compilation,) => {
            console.log("TestPlugin emit  11111 ");
        })
        // hooks即事件--异步tapAsync触发
        compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {

            setTimeout(() => {
                console.log("TestPlugin emit  2222 ");
                callback()
            }, 2000)
        })
        // hooks即事件--异步tapPromise触发
        compiler.hooks.emit.tapPromise("TestPlugin", (compilation) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log("TestPlugin emit  3333 ");
                    resolve()
                }, 1000)
            })

        })

        // 异步并行钩子make---AsyncParallelHook
        compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
            //compilation的方法要写到 compiler里面
            // 注意：需要在compilation hooks触发前注册
            compilation.hooks.seal.tap("TestPlugin ", () => {
                console.log("TestPlugin---compilation---seal");
            })

            setTimeout(() => {
                console.log("TestPlugin make 1111");
                callback()
            }, 3000)
        })

        compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
            setTimeout(() => {
                console.log("TestPlugin make 2222");
                callback()
            }, 1000)
        })
    }
}

module.exports = TestPlugin