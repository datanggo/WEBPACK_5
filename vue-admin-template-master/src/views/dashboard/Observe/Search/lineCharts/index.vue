<template>
  <div>
    <div class="header">
      <span class="search-header">搜索用户数</span>
      <svg
        t="1706443504569"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1447"
        width="14"
        height="14"
      >
        <path
          d="M864 512C864 317.595768 706.40423 160 512 160 317.595768 160 160 317.595768 160 512 160 706.40423 317.595768 864 512 864 706.40423 864 864 706.40423 864 512ZM64 512C64 264.576432 264.576432 64 512 64 759.423565 64 960 264.576432 960 512 960 759.423565 759.423565 960 512 960 264.576432 960 64 759.423565 64 512Z"
          fill="#666666"
          p-id="1448"
        ></path>
        <path
          d="M448 319.987679C448 284.64826 476.407348 256 512 256 547.346224 256 576 284.397866 576 319.987679L576 512.012321C576 547.35174 547.592652 576 512 576 476.653776 576 448 547.602134 448 512.012321L448 319.987679ZM448 704C448 668.653779 476.407348 640 512 640 547.346224 640 576 668.407347 576 704 576 739.346221 547.592652 768 512 768 476.653776 768 448 739.592653 448 704Z"
          fill="#666666"
          p-id="1449"
          data-spm-anchor-id="a313x.search_index.0.i0.753e3a81c8oWfX"
          class="selected"
        ></path>
      </svg>
    </div>
    <div class="main">
      <span class="main-title">12323</span>
      <span class="main-content">17.1</span>
      <i class="el-icon-caret-top" style="color: yellowcayn"></i>
      <i class="el-icon-caret-bottom" style="color: red"></i>
    </div>
    <div class="footer">
      <!-- 容器 -->
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>
<script>
// 引入echarts
import * as echarts from "echarts";
export default {
  name: "lineCharts",

  // 挂载完毕
  mounted() {
    // 初始化echarts实例
    let linecharts = echarts.init(this.$refs.charts);
    // 配置数据
    linecharts.setOption({
      xAxis: {
        // 隐藏x轴
        show: false,
        type: "category",
      },
      yAxis: {
        // 隐藏x轴
        show: false,
      },
      // 系列
      series: [
        {
          type: "line",
          data: [10, 7, 33, 12, 48, 9, 29, 10, 44],
          // 拐点的样式的设置
          itemStyle: {
            opacity: 0,
          },
          // 线条的样式
          lineStyle: {
            color: "skyblue",
          },
          // 区域填充样式
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "cyan",
                },
                {
                  offset: 1,
                  color: "#fff",
                },
              ],
              global: false,
            },
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
.header {
  display: flex;
  align-items: center;
}
.search-header {
  margin-right: 20px;
}
.main-title {
  margin-right: 10px;
}
.charts {
  width: 100%;
  height: 50px;
}
</style>