//该文件用于创建vuex中最为核心的store

// 引入vue
import Vue from "vue"

// 引入vuex
import Vuex from "vuex"

// 使用vuex插件
Vue.use(Vuex)

// 准备actions-用于响应组件中的动作
const actions = {
    /*  jia: function () {
         console.log("actions中的jia被调用了");
     } */
    /* jia(context, value) {
        console.log("####actions中的jia被调用了", context, value);
        context.commit("JIA", value)
    },
    jian(context, value) {
        context.commit("JIAN", value)
    }, */
    jiaOdd(context, value) {
        // 判断条件放在actions里
        if (context.state.sum % 2) {
            context.commit("JIA", value)
        }
    },
    jiaWait(context, value) {
        setTimeout(() => {
            context.commit("JIA", value)
        }, 500)
    }
}

// 准备mutations-用于操作数据(state)
const mutations = {
    JIA(state, value) {
        console.log("@@@actions中的JIA被调用了", state, value);
        state.sum += value
    },
    JIAN(context, value) {
        state.sum -= value
    }
}

// 准备state-用于存储数据
const state = {
    sum: 0,//当前的和
}

// 创建store
const store = new Vuex.Store({
    // actions: actions,
    actions,
    // mutations: mutations,
    mutations,
    // state: state
    state,
})

// 向外暴露对象  //导出store
export default store