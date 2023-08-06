// 引入发ajax请求插件axios
import axios from "axios";

// 引入生成id的插件nanoid
import { nanoid } from "nanoid";

const personAbout = {
  namespaced: true, //开启命名空间
  actions: {
    // 添加一个姓王的人
    addPersonWang(context, value) {
      if (value.name.indexOf("王") === 0) {
        context.commit("ADD_PERSON", value);
      } else {
        alert("添加的人不对");
      }
    },

    // 在actions里发ajax请求
    addPersonServer(context) {
      axios.get("https://api.uixsj.cn/hitokoto/get?type=social").then(
        (response) => {
          context.commit("ADD_PERSON", { id: nanoid(10), name: response.data });
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
  },
  mutations: {
    ADD_PERSON(state, value) {
      console.log("mutations中的ADD_PERSON被调用了");
      state.personList.unshift(value);
    },
  },
  state: {
    personList: [{ id: "001", name: "张三" }],
  },
  getters: {
    // 列表中第一个人的名字
    firstPresonName(state, value) {
      return state.personList[0].name;
    },
  },
};

//向外暴露组件
export default personAbout;
