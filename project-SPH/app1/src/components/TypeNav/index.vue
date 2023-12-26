<template lang="">
    <!-- 商品分类导航 -->
        <div class="type-nav">
            <div class="container" @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
                <!-- 过渡动画 -->
                <transition name="sort">
                  <div class="sort" v-show="show">
                    <!-- 事件委派给父元素 -->
                      <div class="all-sort-list2" @click="goSearch">
                          <div class="item bo" v-for='(c1,index) in categoryList' :key="c1.categoryId" :class="{cur:currentIndex==index}"> 
                              <h3 @mouseenter="changeIndex(index)"  >
                                <!-- 路由跳转 -->
                                <!-- 编程式导航 -->
                                  <!-- <a href="" @click="goSearch">{{c1.categoryName}}</a> -->
                                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                  <!-- 声明式导航 -->
                                  <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
                              </h3>
                              <!-- //二级分类和三级分类 -->
                              <div class="item-list clearfix" :style="{display:currentIndex==index ? 'block' : 'none'}">
                                  <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                      <dl class="fore">
                                          <dt>
                                              <!-- 路由跳转 -->
                                              <!-- 编程式导航 -->
                                              <!-- <a href="" @click="goSearch">{{c2.categoryName}}</a> -->
                                              <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                              <!-- 声明式导航 -->
                                              <!-- <router-link to="/search">{{c2.categoryName}}</router-link> -->
                                          </dt>
                                          <dd>
                                              <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                                  <!-- 路由跳转 -->
                                                  <!-- 编程式导航 -->
                                                  <!-- <a href="" @click="goSearch">{{c3.categoryName}}</a> -->
                                                  <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                  <!-- 声明式导航 -->
                                                  <!-- <router-link to="/search">{{c3.categoryName}}</router-link> -->
                                              </em>
                                          </dd>
                                      </dl>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                </transition>
            </div>
        </div>
</template>
<script>
// 引入映射方法源自于vuex
import { mapState } from "vuex";

// 引入lodash防抖节流,这种引入的方式是把lodash全部的功能函数引入
// import _ from "lodash";
// 此未按需引入
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移动到哪一个一级分类current
      currentIndex: -1,
      show: true,
    };
  },
  //   组件挂载完毕：可以向服务器发请求，获取服务器的数据，展示数据
  mounted() {
    /*  // // 通知Vuex发请求，获取数据，存储于仓库当中
    this.$store.dispatch("categoryList");
 */
    //当组件挂载完毕，让show属性变为false
    //如果不是Home路由组件，将typeNav进行隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  //ji计算属性
  computed: {
    ...mapState({
      //右侧需要的是一个函数，当使用这个计算属性的时候，右侧的函数会立即执行一次
      // 注入一个参数state，其实即为大仓库中的数据
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },

  //   事件回调
  methods: {
    /*   // 鼠标进入修改响应式数据currentIndex属性
    changeIndex(index) {
      //   index:鼠标移动到某个一级菜单的索引值
      // 正常情况，用户慢慢的操作，鼠标进入每一个一级分类h3，都会触发鼠标进入事件
      // 非正常情况，用户的操作很快：本身全部的一级分类都应该触发鼠标进入事件，经过测试只有部分触发了
      // 就是由于用户的行为过快，浏览器反应不过来，如果当前回调函数中有一些大量业务，会出现卡顿现象
      this.currentIndex = index;
    }, */
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),

    // // 一级分类鼠标移出的回调
    // leaveIndex() {
    //   this.currentIndex = -1;
    // },

    // 进行路由跳转的方法
    goSearch(event) {
      // 最后的解决方案就是编程式导航加事件委派
      // 利用事件委派出现的问题
      // 1：点击的是不是a标签
      // 2：如何获取参数【1，2，3级产品分类的名字及相应的id】
      //3:即便能确定是A标签，但是怎么确定是一级二级还是三级？

      // 第一个问题：把子节点中的a标签加上自定义属性:data-categoryName，其余的子节点没有
      let element = event.target;
      // 利用event.target获取到事件节点，需要带有data-categoryName的节点
      // console.log(element.dataset);
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      // 节点有dataSet属性，可以获取节点的自定义属性与属性值
      // 如果标签的身上拥有categoryName，那么一定是a标签
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        // 判断：如果路由跳转的时候带有params参数，要传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
          // 整理完整参数
          location.query = query;
          // 路由跳转
          this.$router.push(location);
        }
      }
    },

    // 当鼠标移入的时候，让商品分类进行展示
    enterShow() {
      this.show = true;
    },
    //当鼠标离开的时候，让商品分类列表进行隐藏
    leaveShow() {
      // 一级分类鼠标移出的回调
      this.currentIndex = -1;
      // 让商品分类列表进行隐藏,判断当前路由是不是在home页面
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background: #e1251b;
        }
      }
    }

    // 过渡动画的样式
    // 过渡动画开始状态（进入）
    .sort-enter {
      height: 0;
      // transform: rotate(0deg);
    }
    // 过渡动画的结束状态
    .sort-enter-to {
      height: 461px;
      // transform: rotate(360deg);
    }
    // 定义动画的时间，速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>