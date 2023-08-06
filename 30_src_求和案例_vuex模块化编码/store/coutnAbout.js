const countAbout = {
  namespaced: true, //开启命名空间
  actions: {
    jiaOdd(context, value) {
      // 判断条件放在actions里
      if (context.state.sum % 2) {
        context.commit("JIA", value);
      }
    },
    jiaWait(context, value) {
      setTimeout(() => {
        context.commit("JIA", value);
      }, 500);
    },
  },
  mutations: {
    JIA(state, value) {
      console.log("@@@actions中的JIA被调用了", state, value);
      state.sum += value;
    },
    JIAN(state, value) {
      state.sum -= value;
    },
  },
  state: {
    sum: 0, //当前的和
    school: "尚硅谷",
    subject: "前端",
  },
  getters: {
    bigSum(state) {
      return state.sum * 10;
    },
  },
};

//向外暴露组件
export default countAbout;
