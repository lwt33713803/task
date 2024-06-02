<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { EChartsType } from "echarts/core";
import { onMounted } from "vue";

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
});
const options = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "center",
    right: 0,
    type: "scroll",
    orient: "vertical",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["60%", "90%"],
      center: ["40%", "50%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "40",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
      ],
    },
  ],
};
let chart: EChartsType;
const initChart = () => {
  let chart = echarts.init(document.getElementById(props.id));
  chart.setOption(options);
  return chart;
};
onMounted(() => {
  chart = initChart();
  window.addEventListener("resize", function () {
    chart && chart.resize();
  });
});
</script>
