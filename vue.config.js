const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  lintOnSave: false, //关闭保存时 的语法检查

  // 开启代理服务其器,即vue里的脚手架提供的代理服务器  方式一
  /* devServer: {
    proxy: "http://localhost:5000", 
  },*/

  // 开启代理服务其器,即vue里的脚手架提供的代理服务器  方式二
  devServer: {
    proxy: {
      //设置使用代理服务器需要加的路径前缀
      "/api": {
        // 设置代理服务器执行的服务器地址
        target: "http://localhost:5000",
        // pathRewrite即重新路径，值为对象键值对，正则内容为匹配所有以/api开头的名字重置为空字符串
        pathRewrite: { "^/api": "" },
        ws: true, //用于支持websocket
        changeOrigin: true, //用于控制请求头中的host值，为true时默认匹配服务器，为false则匹配本地
      },
      "/demo": {
        // 设置代理服务器执行的服务器地址
        target: "http://localhost:5001",
        // pathRewrite即重新路径，值为对象键值对，正则内容为匹配所有以/api开头的名字重置为空字符串
        pathRewrite: { "^/demo": "" },
        ws: true, //用于支持websocket
        changeOrigin: true, //用于控制请求头中的host值，为true时默认匹配服务器，为false则匹配本地
      } /* 
      "/foo": {
        target: "<other_url>",
      }, */,
    },
  },
});
