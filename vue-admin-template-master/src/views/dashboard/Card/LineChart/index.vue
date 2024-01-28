<template lang="">
  <!-- 容器 -->
  <div class="charts" ref="charts"></div>
</template>
<script>
// 引入echarts
import echarts from "echarts";
export default {
  name: "LineChart",
  //   挂载完毕初始化实例
  mounted() {
    // 初始化echarts实例
    let lineChart = echarts.init(this.$refs.charts);
    // 配置数据
    lineChart.setOption({
      xAxis: {},
      yAxis: {},
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
