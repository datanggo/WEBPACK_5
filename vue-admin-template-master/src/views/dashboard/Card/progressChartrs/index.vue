<template lang="">
  <!-- 容器 -->
  <div class="charts" ref="charts"></div>
</template>
<script>
// 引入echarts
import * as echarts from "echarts";
export default {
  name: "LineChart",
  //   挂载完毕初始化实例
  mounted() {
    // 初始化echarts实例
    let lineChart = echarts.init(this.$refs.charts);
    // 配置数据
    lineChart.setOption({
      xAxis: {
        // 隐藏x轴
        show: false,
        // 最小值和最大值的设置
        min: 0,
        max: 100,
      },
      yAxis: {
        // 隐藏y轴
        show: false,
        // 均分
        type: "category",
      },
      // 系列
      series: [
        {
          type: "bar",
          data: [78],
          // 设置柱状图的宽度
          barWidth: "10px",
          color: "yellowgreen",
          // 设置背景颜色可见
          showBackground: true,
          // 设置背景颜色的样式
          backgroundStyle: {
            color: "#eee",
          },
          // 文本的设置
          label: {
            show: true,
            //文字的内容
            formatter: "|",
            // 文字的位置
            position: "right",
          },
        },
      ],
      // 布局的调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>
<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
