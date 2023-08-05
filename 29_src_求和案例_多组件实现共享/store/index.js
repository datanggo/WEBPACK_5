//该文件用于创建vuex中最为核心的store

// 引入vue
import Vue from "vue"

// 引入vuex
import Vuex from "vuex"

// 使用vuex插件
Vue.use(Vuex)

// 准备actions-用于响应组件中的动作
const actions = {
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
    },
    ADD_PERSON(state, value) {
        console.log("mutations中的ADD_PERSON被调用了");
        state.personList.unshift(value)
    }
}

// 准备state-用于存储数据
const state = {
    sum: 0,//当前的和
    school: "尚硅谷",
    subject: "前端",
    personList: [
        { id: "001", name: "张三" }
    ]
}

//准备getters-用于将state中的数据进行加工
const getters = {
    bigSum(state) {
        return state.sum * 10
    }
}

// 创建store
const store = new Vuex.Store({
    // actions: actions,
    actions,
    // mutations: mutations,
    mutations,
    // state: state
    state,
    // getters:getters,
    getters,
})

// 向外暴露对象  //导出store
export default store