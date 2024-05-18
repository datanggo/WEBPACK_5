// 此处为入口文件
// 引入cor-js即代码补丁，专门用于打包后解决不了的兼容性问题解决方案
// 完整引入
// import "core-js"
// 按需加载-手动引入
// import 'core-js/es/promise'
// 按需加载-自动引入---详见babel.config.js文件

import count from './js/count'
import sum from './js/sum'

//想要webpack打包资源，必须引入该资源
import './css/iconfont.css'
import "./css/index.css"
import './less/index.less'
import './sass/index.sass'
import './sass/index.scss'
import './stylus/index.styl'

console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));
console.log(mul(3, 4));
console.log(add(3, 4));


// 获取节点，绑定事件
document.getElementById("btn").onclick = function () {
    // 动态引入---即按需引入
    // /* webpackChunkName:"math" */  这是webpack的命名规则，即生成新的文件名为math---也叫魔法命名
    import(/* webpackChunkName:"math" */"./js/math")
        .then(({ add, mul }) => {
            console.log("动态加载成功");
            console.log(mul(3, 3));
            console.log(add(3, 3));
        })
        .catch((err) => {
            console.log("动态加载失败" + err);
        })
}

// 注册 Service Worker--实现断网可以访问基本功能-即渐进式网络应用程序
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}


if (module.hot) {
    // 判断是否支持热模块替换功能-如果支持利用module身上的方法定义js的热模块
    module.hot.accept("./js/count")
    module.hot.accept("./js/sum")
}


new Promise((resolve) => {
    setTimeout(() => {
        resolve()
    }, 1000)
})


const arr = [1, 2, 3, 4]
console.log(arr.includes(1));