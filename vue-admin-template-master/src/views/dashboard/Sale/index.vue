<template>
  <el-card class="box-card">
    <!-- 头部区域 -->
    <div slot="header" class="clearfix">
      <!-- 
           @tab-click="handleClick"
         -->
      <!-- 左侧内容 -->
      <el-tabs class="tabs" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visite"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧内容 -->
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <!-- v-model="value1" -->
        <el-date-picker
          v-model="date"
          value-format="yyyy-mm-dd"
          class="date"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
        >
        </el-date-picker>
      </div>
    </div>
    <!-- 内容区域 -->
    <div>
      <el-row :gutter="10">
        <el-col :span="20">
          <!-- 容器 -->
          <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="4" class="right1">
          <h3>门店{{ title }}排名</h3>
          <ul class="ul">
            <li>
              <span class="rIndex">0</span>
              <span>肯德基</span>
              <span class="rvalue">212231</span>
            </li>
            <li>
              <span class="rIndex">1</span>
              <span>肯德基</span>
              <span class="rvalue">212231</span>
            </li>
            <li>
              <span class="rIndex">2</span>
              <span>肯德基</span>
              <span class="rvalue">212231</span>
            </li>
            <li>
              <span class="rIndex">3</span>
              <span>肯德基</span>
              <span class="rvalue">212231</span>
            </li>
            <li>
              <span>4</span>
              <span>肯德基</span>
              <span class="rvalue">212231</span>
            </li>
            <li>
              <span>5</span>
              <span>肯德基</span>
              <span class="rvalue">212231</span>
            </li>
            <li>
              <span>6</span>
              <span>肯德基</span>
              <span class="rvalue">212231</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>
<script>
// 引入echarts
import * as echarts from "echarts";
// 引入dayjs获取时间的插件
import dayjs from "dayjs";
import { mapState } from "vuex";
export default {
  name: "Sale",

  data() {
    return {
      activeName: "sale",
      //   把echarts实例挂载到组件实例身上
      mycharts: null,
      //   收集日历的时间
      date: [],
    };
  },

  //   挂载完毕
  mounted() {
    // 初始化echarts实例
    this.mychart = echarts.init(this.$refs.charts);
    // 配置数据
    this.mychart.setOption({
      title: {
        text: "销售额趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220, 110, 98, 167, 123, 44],
          color: "yellowgreen",
        },
      ],
    });
  },
  //   计算属性
  computed: {
    // 计算属性--标题
    title() {
      return this.activeName == "sale" ? "销售额" : "访问量";
    },

    // 计算仓库中的数据
    ...mapState({
      listData: (state) => state.home.list,
    }),
  },
  //   监视数据
  watch: {
    // 监听title值的变化
    title() {
      // 重新修改图标的配置的数据
      //图表配置的数据可以再次修改,如果有新的数值就用新的数值,没有就用以前的
      this.mychart.setOption({
        title: {
          text: this.title + "趋势",
        },
        xAxis: {
          data:
            this.title == "销售额"
              ? this.listState.orderFullYearAxis
              : this.listState.userFullYearAxis,
        },
      });
    },
  },
  //   方法
  methods: {
    // 当天按钮的回调
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    // 获取本周的按钮
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    // 获取当月时间
    setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    // 获取今年的时间
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
};
</script>
<style scoped>
.box-card {
  margin: 20px 0;
}
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tabs {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.right span {
  margin: 0 10px;
}
.date {
  width: 260px;
  margin: 0 20px;
}
.charts {
  width: 100%;
  height: 300px;
}
.right1 {
  margin: 0;
  padding: 0;
}
.right1 h3 {
  margin: 0;
  padding: 0;
}
.ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}
.ul li {
  height: 8%;
  margin: 10px 0;
}
.rIndex {
  float: left;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: black;
  color: white;
  text-align: center;
}
.rvalue {
  float: right;
}
</style>