<template lang="">
  <div>
    <!-- 首页 -->
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="￥126560">
            <!-- 作用域插槽，父组件决定子组件的结构和数据 -->
            <template slot="charts">
              <span
                >周同比&nbsp;&nbsp;56.67%
                <svg
                  t="1706444487382"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2472"
                  width="16"
                  height="16"
                >
                  <path
                    d="M205.248 707.872L160 662.624 502.624 320l342.624 342.624L800 707.872l-297.376-297.376z"
                    fill="#d81e06"
                    p-id="2473"
                  ></path>
                </svg>
              </span>
              <span
                >日同比&nbsp;&nbsp;19.96%
                <svg
                  t="1706444487382"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2472"
                  width="16"
                  height="16"
                >
                  <path
                    d="M205.248 707.872L160 662.624 502.624 320l342.624 342.624L800 707.872l-297.376-297.376z"
                    fill="#d81e06"
                    p-id="2473"
                  ></path>
                </svg>
              </span>
            </template>
            <template slot="footer">
  <span>日销售额￥12306</span>
</template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="88460">
            <template slot="charts">
  <lineCharts></lineCharts>
</template>
            <template slot="footer">
  <span>日访问量12345</span>
</template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="88460">
            <template slot="charts">
  <barCharts></barCharts>
</template>
            <template slot="footer">
  <span>转化率64%</span>
</template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%">
          <template slot="charts">
  <progressCharts></progressCharts>
</template>
            <template slot="footer">
  <span
    >周同比&nbsp;&nbsp;56.67%
    <svg
      t="1706444487382"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2472"
      width="16"
      height="16"
    >
      <path
        d="M205.248 707.872L160 662.624 502.624 320l342.624 342.624L800 707.872l-297.376-297.376z"
        fill="#d81e06"
        p-id="2473"
      ></path>
    </svg>
  </span>
  <span
    >日同比&nbsp;&nbsp;19.96%
    <svg
      t="1706444487382"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2472"
      width="16"
      height="16"
    >
      <path
        d="M205.248 707.872L160 662.624 502.624 320l342.624 342.624L800 707.872l-297.376-297.376z"
        fill="#d81e06"
        p-id="2473"
      ></path>
    </svg>
  </span>
</template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { format } from "echarts";
// 引入子组件
import Detail from "./Detail";
// 引入折线的组件
import lineCharts from "./LineChart";
// 引入柱状图组件
import barCharts from "./barCahrts";
//
import progressCharts from "./progressChartrs";
export default {
  name: "Card",
  //   注册子组件
  components: {
    Detail,
    lineCharts,
    barCharts,
    progressCharts,
  },
};
</script>
<style lang=""></style>
