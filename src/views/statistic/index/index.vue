<template>
  <div>
    <el-row class="row-bg" :gutter="10">
      <el-col :xs="24" :sm="12" :lg="7">
        <!-- 代理数据 -->
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ $t('statistic.agent_title') }}</span>
              <span class="_more" @click="moreChange(`agency`)">{{ $t('more') }}<el-icon>
                  <DArrowRight />
                </el-icon></span>
            </div>
          </template>
          <line-charts :id="`agency-line`" v-loading="loading" :smooth="true" height="200px" width="100%"
            :data="agencyCharts" />
        </el-card>
        <!-- 代理流水 -->
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ $t('statistic.agency_title') }}</span>
            </div>
          </template>
          <bar-charts :id="`agency-bar`" v-loading="loading" height="200px" width="100%" :data="streamCharts" />
        </el-card>
        <!-- 渠道数据 -->
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ $t('statistic.channel_title') }}</span>
            </div>
          </template>
          <!-- <pie-charts :id="`channel-pie`" height="200px" width="100%" /> -->
          <div class="_not"></div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="10">
        <!-- 收入/支出 -->
        <el-card class="box-card card_50">
          <template #header>
            <div class="card-header">
              <span>{{ $t('statistic.income_title') }}</span>
              <span class="_more" @click="moreChange(`payments`)">{{ $t('more') }}<el-icon>
                  <DArrowRight />
                </el-icon></span>
            </div>
          </template>
          <div class="select-wrap">
            <el-date-picker v-model="disburse_time" type="daterange" :shortcuts="shortcuts" :range-separator="$t('to')"
              :start-placeholder="$t('start_time')" :end-placeholder="$t('end_time')" :default-time="defaultTime"
              @change="disburseTimeChange" />
          </div>

          <line-charts :id="`disburse-line`" v-loading="qutlay_loading" height="320px" width="100%" :data="qutlayCharts"
            :legend="[$t('income'), $t('expend')]" />
        </el-card>
         <!-- 订单数据 -->
        <el-card class="box-card card_50">
          <template #header>
            <div class="card-header">
              <span>{{ $t('statistic.order_title') }}</span>
              <span class="_more" @click="moreChange(`order`)">{{ $t('more') }}<el-icon>
                  <DArrowRight />
                </el-icon></span>
            </div>
          </template>
          <div class="select-wrap">
            <el-date-picker v-model="order_time" type="daterange" :shortcuts="shortcuts" :range-separator="$t('to')"
              :start-placeholder="$t('start_time')" :end-placeholder="$t('end_time')" :default-time="defaultTime"
              @change="orderTimeChange" />
          </div>
          <line-charts :id="`order-line`" v-loading="order_loading"
            :legend="[$t('statistic.money_order'), $t('statistic.printingunit_order')]" height="320px" width="100%"
            :data="orderCharts" />
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="7">
        <!-- 用户数据 -->
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ $t('statistic.user_title') }}</span>
              <span class="_more" @click="moreChange(`user`)">{{ $t('more') }}<el-icon>
                  <DArrowRight />
                </el-icon></span>
            </div>
          </template>
          <line-charts :id="`user-line`" v-loading="loading" :smooth="true" height="200px" width="100%" :data="userCharts"
            :legend="[$t('statistic.forbid_user'), $t('statistic.regular_user')]" />
        </el-card>
        <!-- 文章数据 -->
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ $t('statistic.article_title') }}</span>
              <span class="_more" @click="moreChange(`article`)">{{ $t('more') }}<el-icon>
                  <DArrowRight />
                </el-icon></span>
            </div>
          </template>
          <div>
            <el-table v-loading="loading" height="200px" width="100%" :data="articleList" stripe>
              <el-table-column v-slot="{ row }" :label="$t('title')">
                <el-tooltip :content="row.title" placement="top">
                  <span class="_ellipsis">{{ row.title }}</span>
                </el-tooltip>
              </el-table-column>
              <el-table-column v-slot="{ row }" :label="$t('create_time')">
                {{ formatDate(row.create_time) }}
              </el-table-column>
            </el-table>
          </div>
        </el-card>
        <!-- 用户充值排名 -->
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ $t('statistic.userpay_title') }}</span>
              <span class="_more" @click="moreChange(`ranking`)">{{ $t('more') }}<el-icon>
                  <DArrowRight />
                </el-icon></span>
            </div>
          </template>
          <div>
            <el-table v-loading="loading" height="200px" width="100%" :data="userList" stripe>
              <el-table-column v-slot="{ $index }" :label="$t('id')">
                {{ $index + 1 }}
              </el-table-column>
              <el-table-column prop="username" :label="$t('backlogCore.nickname')" />
              <el-table-column prop="amount" :label="$t('statistic.amount_sort')" />
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { processDate } from "@/utils/date"
import { formatDate } from "@/utils/filterDate";
import { getData, getOderData, getOutlayData } from '@/api/statistic/index'
import LineCharts from './components/line.vue'
import BarCharts from './components/bar.vue'
import { useRouter } from "vue-router";
const router = useRouter();
const loading = ref<boolean>(false);
const qutlay_loading = ref<boolean>(false);
const order_loading = ref<boolean>(false);

const defaultTime = new Date(2000, 1, 1, 0, 0, 0) // '12:00:00'
const shortcuts = [
  {
    text: '近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '近30天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '近一年',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]

const disburse_time = ref<any>([])
const order_time = ref<any>([])
const userCharts = reactive<userChartsType>({
  normal: [],
  disable: []
});
const agencyCharts = reactive<userChartsType>({
  normal: [],
  disable: []
})

const qutlayCharts = reactive<userChartsType>({
  normal: [],      // 收入
  disable: []      // 支出
})

const orderCharts = reactive<userChartsType>({
  normal: [],      // 收入
  disable: []      // 支出
})
const streamCharts = ref<string[]>([])
interface userChartsType {
  normal: string[];
  disable: string[];
}
const articleList = ref<any[]>([])
const userList = ref<any[]>([])

const moreChange = (type: string) => {
  switch (type) {
    case `agency`:
      router.push('/agencyCore/agencyList')
      break;
    case `payments`:
      router.push('/consumerManage/budgetRecord')
      break;
    case `order`:
      router.push('/brushUnitCore/orderFormManage')
      break;
    case `article`:
      router.push('/system/articleManage')
      break;
    default:
      router.push('/consumerManage/userManage')
      console.log(`ranking`);
  }
}


const handleGetOutlayData = (params: any) => {  // 收入/支出 接口调用
  const start = Math.round(params[0] / 1000).toString();
  const end = Math.round(params[1] / 1000).toString();
  qutlay_loading.value = true;
  getOutlayData({ start, end }).then(({ data }: any) => {
    const { order_recharge, order_withdrawal } = data;
    qutlayCharts.disable = forDatakey(order_recharge, 'amount', 'period');   // 收入
    qutlayCharts.normal = forDatakey(order_withdrawal, 'amount', 'period')   // 支出
    qutlay_loading.value = false;
  })
}

const handleGetOderData = (params: any) => { // 订单数据 接口调用
  const start = Math.round(params[0] / 1000).toString();
  const end = Math.round(params[1] / 1000).toString();
  order_loading.value = true;
  getOderData({ start, end }).then(({ data }: any) => {
    const { fund, goods } = data;
    console.log('--data', data)
    orderCharts.disable = forDatakey(fund, 'value', 'date');   // 收入
    orderCharts.normal = forDatakey(goods, 'value', 'date')   // 支出
    order_loading.value = false; //
  })
}

const forDatakey = (data: [], valKey: string, dateKey: string) => {
  const result = data.map((item: any) => {
    return {
      num: item[valKey],
      date: item[dateKey]
    }
  })
  return result
}


const disburseTimeChange = () => {
  handleGetOutlayData(disburse_time.value)
}
const orderTimeChange = () => {
  handleGetOderData(order_time.value)
}

const initData = async () => {
  const endTime: number = processDate(new Date(), 1);    // 最新
  const startTime = endTime - 3600 * 1000 * 24 * 7       // 之前
  disburse_time.value = [startTime, endTime];
  order_time.value = [startTime, endTime];
  handleGetOutlayData(disburse_time.value)
  handleGetOderData(order_time.value)

  handleGetData()
}

const handleGetData = () => {
  loading.value = true;
  getData().then(({ data }) => {
    const { agent, member, article, member_rank, agent_consume }: any = data;
    agencyCharts.disable = agent.disable;   // 代理数据
    agencyCharts.normal = agent.normal;
    userCharts.disable = member.disable;    // 用户数据
    userCharts.normal = member.normal;
    articleList.value = article;            // 文章数据
    userList.value = member_rank;           // 用户排名
    streamCharts.value = agent_consume;     // 代理流水
    loading.value = false;
  })
}

onMounted(() => {
  initData();
})
</script>

<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1e2022;
  font-size: 16px;

  ._more {
    color: #377dff;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  margin-bottom: 10px;
  width: 100%;
}

.card_50 {
  height: 49%;
}

.select-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

._ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

._not {
  width: 100%;
  height: 200px;
  background: url(@/assets/icons/not.png) no-repeat;
  background-size: 100% 100%;
}
</style>