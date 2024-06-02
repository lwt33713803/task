<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { EChartsType } from "echarts/core";
import { filterCharts } from "@/utils/echarts";

let props = defineProps({
  className: {
    type: String,
    default: "chart",
  },
  config: {
    type: Object,
    default: () => {},
  },
  id: {
    type: String,
    default: "chart",
  },
  width: {
    type: String,
    default: "200px",
  },
  height: {
    type: String,
    default: "200px",
  },
  data: {
    type: Array,
    default: () => [],
  },
});
const options = {
  grid: {
    top: "18%",
    left: "2%",
    right: "2%",
    bottom: 0,
    containLabel: true,
  },
  xAxis: {
    data: [],
    axisLine: {
      show: false,
      lineStyle: {
        color: "#8c98a4",
        width: 1,
      },
    },
  },
  tooltip: {
    // 鼠标悬浮提示框显示 X和Y 轴数据
    trigger: "axis",
    backgroundColor: "rgba(32, 33, 36,.7)",
    borderColor: "rgba(32, 33, 36,0.20)",
    borderWidth: 1,
    textStyle: {
      // 文字提示样式
      color: "#fff",
      fontSize: "12",
    },
    axisPointer: {
      // 坐标轴虚线
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  yAxis: {
    type: "value",
    axisLine: {
      show: false,
      lineStyle: {
        color: "#8c98a4",
      },
    },
  },
  series: [
    {
      data: [],
      type: "bar",
      itemStyle: {
        color: "#6da0ff",
      },
      label: {
        show: true,
        position: "top",
        color: "#8c98a4",
      },
    },
  ],
};
let chart: EChartsType;
const initChart = () => {
  let chart = echarts.init(document.getElementById(props.id));
  chart.setOption(options);
  return chart;
};

watch(
  () => props.data,
  (newVal) => {
    if (newVal) {
      options.series[0].data = filterCharts(newVal, "amount") || [];
      options.xAxis.data = filterCharts(newVal, "agent_username") || [];
      chart = initChart();
      window.addEventListener("resize", function () {
        chart && chart.resize();
      });
    }
  },
  {
    deep: true,
  }
);
</script>
