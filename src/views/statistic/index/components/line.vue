<template>
  <div
    :id="id"
    :class="className"
    :style="{ height: height, width: width }"
    ref="chartsRef"
  />
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { filterCharts } from "@/utils/echarts";
import { EChartsType } from "echarts/core";
import { ref } from "vue";
const chartsRef = ref<HTMLElement | null>();

const props = defineProps({
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
  legendShow: {
    type: Boolean,
    default: true,
  },
  data: {
    type: Object,
    default: () => {},
  },
  legend: {
    type: Array,
    default: () => ["禁用代理", "正常代理"],
  },
  smooth: {
    type: Boolean,
    default: false,
  },
});

const options = {
  color: ["#6da0ff", "#ed4c78"],
  legend: {
    show: props.legendShow,
    data: props.legend,
    top: 0,
  },
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
  yAxis: {
    type: "value",
    axisLine: {
      show: false,
      lineStyle: {
        color: "#8c98a4",
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
  series: [
    {
      name: "正常代理",
      data: [],
      type: "line",
      smooth: true,
      lineStyle: {
        color: "#6da0ff",
      },
      label: {
        show: true,
        position: "top",
        color: "#6da0ff",
      },
    },
    {
      name: "禁用代理",
      data: [],
      type: "line",
      smooth: true,
      lineStyle: {
        color: "#ed4c78",
      },
      label: {
        show: true,
        position: "top",
        color: "#ed4c78",
      },
    },
  ],
  ...props.config,
};

let chart: EChartsType;
const initChart = () => {
  const chart = echarts.init(chartsRef.value);
  chart.setOption(options);
  return chart;
};

watch(
  () => props.data,
  (newVal) => {
    if (newVal) {
      const { disable, normal } = newVal;
      console.log("newVal", newVal);
      options.series[0].name = props.legend[0];
      options.series[1].name = props.legend[1];
      options.series[0].data = filterCharts(disable, "num") || [];
      options.series[1].data = filterCharts(normal, "num") || [];
      options.xAxis.data = filterCharts(normal, "date") || [];
      console.log("options", options);
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

<style></style>
