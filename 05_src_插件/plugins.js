const obj = {
    install(Vue, x, y, z) {
        console.log(x, y, z);
        console.log("@@@install", Vue);  //Vue参数即实例对象

        // 全局过滤器
        Vue.filter('mySlice', function (value) {
            return value.slice(0, 4)
        })

        // 定义全局指令
        Vue.directive('fbind', {
            // 指令与元素成功绑定时(一上来)
            bind(element, binding) {
                element.value = binding.value
            },
            // 指令所有元素被插入页面时
            inserted(element) {
                element.focus()
            },
            // 指令所在的模板被重新解析时
            updata(element, binding) {
                element.value = binding.value
            }
        })

        // 定义全局混入
        Vue.mixin({
            data() {
                return {
                    x: 100,
                    y: 200
                }
            }
        })

        // 给vue原型上添加一个方法    vm和vc都能用
        Vue.prototype.hello = () => { alert("你好啊") }
    },


}

//暴露对象
export default obj