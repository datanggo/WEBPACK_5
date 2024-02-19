<template lang="">
    <div class="chart" ref="chart">
        
    </div>
</template>
<script>
// 引入echarts
import * as echarts from "echarts";
export default {
  name: "barCharts",

  //   挂载完毕执行
  mounted() {
    //初始化echarts
    let barChart = echarts.init(this.$refs.chart);
    // 配置数据
    barChart.setOption({
      xAxis: {
        // 隐藏x轴
        show: false,
        // 均分
        type: "category",
      },
      yAxis: {
        // 隐藏y轴
        show: false,
      },
      // 系列
      series: [
        {
          // 图表的形式
          type: "bar",
          data: [10, 20, 30, 12, 48, 9, 29, 10, 44, 22, 33, 8],
          color: "cyan",
        },
      ],
      //   布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      //   提示信息
      tooltip: {},
    });
  },
};
</script>
<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>