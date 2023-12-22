// 引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 需要使用插件
Vue.use(Vuex)

/* 
// state:仓库存储数据的地方
const state = {
    count: 1
}

// mutations:修改state的唯一手段
const mutations = {
    ADD(state, count) {
        state.count++
    }
}

// actions:处理actions的地方,可以书写自己的业务逻辑,也可以处理异步
const actions = {
    // 这里可以书写业务逻辑，但是不能修改state
    add({ commit }) {
        commit("ADD")
    }
}

// getters:可以理解为计算属性,用于简化仓库数据,让租金按获取仓库数据更加方便
const getters = {}

// 对外暴露store类的一个实例
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
}) */

// 引入各个路由的小仓库
import home from "./home"
import search from "./search"


// 对外暴露store类的一个实例
export default new Vuex.Store({
    //实现vuex仓库模块式开发存储数据
    modules: {
        home,
        search
    }
}) 