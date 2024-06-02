<template>
  <div class="wrap">
    <el-row class="row-bg" :gutter="10">
      <el-col :xs="24" :sm="12" :lg="16">
        <el-card class="box-card mb-1 h-55">
          <template #header>
            <div class="card-header">
              <ul class="card-nav">
                <li
                  v-for="(item, index) in cardList"
                  :key="index"
                  :class="[current === index ? '_active' : '']"
                  @click="currentChange(index)"
                >
                  {{ $t(item) }}
                </li>
              </ul>
              <el-button class="_more" @click="route_map[current]">
                   {{ $t("more") }}<el-icon>
                  <DArrowRight />
                </el-icon>
              </el-button>
            </div>
          </template>
          <div style="overflow: auto">
            <UserTable v-if="current === 0" :svg="svg" />
            <TacticsTable v-else-if="current === 1" :svg="svg" />
            <GenderTable v-else :svg="svg" />
          </div>
        </el-card>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ $t("backlogCore.nav_order") }}</span>
              <el-button
                class="_more"
                @click="router.push(`/brushUnitCore/orderFormManage`)"
                >{{ $t("more") }}<el-icon>
                  <DArrowRight /> </el-icon
              ></el-button>
            </div>
          </template>
          <div style="overflow: auto">
            <OderTable :svg="svg" />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8">
        <el-card class="mb-1 h-55">
          <ul class="nav-list">
            <li
              v-for="(item, index) in list"
              :key="item.text"
              class="_items"
              :class="`bg${index}`"
              @click="item.go()"
            >
              <div :class="`li${index}`"></div>
              <span>{{ $t(item.text) }}</span>
            </li>
          </ul>
        </el-card>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ $t("backlogCore.nav_audit") }}</span>
              <el-button
                class="_more"
                @click="router.push(`/approval/approvalManage`)"
                >{{ $t("more") }}<el-icon>
                  <DArrowRight /> </el-icon
              ></el-button>
            </div>
          </template>
          <div>
            <ApprovalTable :svg="svg" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import ApprovalTable from "./components/ApprovalTable.vue";
import OderTable from "./components/OderTable.vue";
import UserTable from "./components/UserTable.vue";
import TacticsTable from "./components/TacticsTable.vue";
import GenderTable from "./components/GenderTable.vue";
import { useRouter } from "vue-router";
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
const router = useRouter();
const cardList = ["backlogCore.nav_user", "backlogCore.nav_tactics", "backlogCore.nav_gender"];
const current = ref<number>(0);
const list = [
  {
    text: "backlogCore.nav_user",
    go: () => router.push(`/consumerManage/userManage`),
  },
  {
    text: "backlogCore.nav_tactics",
    go: () => router.push(`/consumerManage/tacticsManage`),
  },
  {
    text: "backlogCore.nav_gender",
    go: () => router.push(`/consumerManage/gradeManage`),
  },
  {
    text: "backlogCore.nav_agent",
    go: () => router.push(`/agencyCore/agencyList`),
  },
  {
    text: "backlogCore.nav_pay",
    go: () => router.push(`/consumerManage/budgetRecord`),
  },
  {
    text: "backlogCore.nav_order",
    go: () => router.push(`/brushUnitCore/orderFormManage`),
  },
  {
    text: "backlogCore.nav_message",
    go: () => router.push(`/system/messageNotice`),
  },
  {
    text: "backlogCore.nav_article",
    go: () => router.push(`/system/articleManage`),
  },
  {
    text: "backlogCore.nav_examine",
    go: () => router.push(`/approval/approvalManage`),
  },
];
const route_map = [
  [() => router.push({ name: `userManage` })],
  [() => router.push({ name: `tacticsManage` })],
  [() => router.push({ name: `gradeManage` })],
];

const currentChange = (index: number): void => {
  current.value = index;
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
