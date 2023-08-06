//该文件用于创建vuex中最为核心的store

// 引入vue
import Vue from "vue";

// 引入vuex
import Vuex from "vuex";

// 使用vuex插件
Vue.use(Vuex);

// 引入组件
import personAbout from "./personAbout";
import countAbout from "./coutnAbout";

// 创建store
const store = new Vuex.Store({
  modules: {
    countAbout,
    personAbout,
  },
});

// 向外暴露对象  //导出store
export default store;
