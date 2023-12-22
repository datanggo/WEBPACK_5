// 引入请求路径
import { reqCategoryList } from '@/api'


//home模块的小仓库
const state = {
    // state中的数据默认的初始值别瞎写，服务器返回的是对象，就写对象，是数组就写数组
    categoryList: []
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    }
}
const actions = {

    // 通过API里面的接口函数调用，向服务器发请求，获取服务器数据
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code === 200) {
            commit('CATEGORYLIST', result.data)
        }
    }
}
const getters = {}


// 向外暴露store类的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}