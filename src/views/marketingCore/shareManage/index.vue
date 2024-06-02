<template>
  <div>
    <f-table
      format
      ref="pageOrigin"
      :system-recordloader="getMarketShareList"
      :smartFilter="[shareClassify.name]"
    >
      <template
        #header-action-append-button-gourp="{
          refreshTrigger,
          refreshTriggerAllParams,
        }"
      >
        <el-button v-has="`marketing:share:shareRule`" type="primary" @click="actionToggleDialogRules(true)">
          分享规则
        </el-button>
      </template>
      <template #default="attrs">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="share_view_num" label="浏览人数" />
        <el-table-column prop="invite_num" label="新增人数" />
        <el-table-column
          prop="share_rotary_table_used"
          label="转盘次数"
          v-slot="{ row }"
        >
          <div class="grid grid-cols-2 items-center gap-5">
            <el-tag :maxWidth="200"> {{ row.share_rotary_table_used }}</el-tag>
            <span
              class="text-1 color-gray-500 cursor-pointer"
              @click="actionToggleDialogTimes(row.id, true)"
              >详情</span
            >
          </div>
        </el-table-column>
        <el-table-column
          prop="share_commission"
          label="总佣金"
          v-slot="{ row }"
        >
          <div class="grid grid-cols-2 items-center gap-5">
            <el-tag :maxWidth="200"> {{ row.share_commission }}</el-tag>
            <span
              v-has="`marketing:share:viewDesc`"
              class="text-1 color-gray-500 cursor-pointer"
              @click="actionToggleDialogAwards(row.id, true)"
              >详情</span
            >
          </div>
        </el-table-column>
        <el-table-column
          prop="share_coupon_used"
          label="优惠券"
          v-slot="{ row }"
        >
          <div class="grid grid-cols-2 items-center gap-5 h-12">
            <el-tag :maxWidth="200"> {{ row.share_coupon_used }}</el-tag>
            <span
              class="text-1 color-gray-500 cursor-pointer"
              @click="actionToggleDialogOffs(row.id, true)"
              >详情</span
            >
          </div>
        </el-table-column>
      </template>
    </f-table>

    <!---分享规则弹窗-->
    <el-dialog
      title="分享规则"
      v-model="dialogRules"
      width="50%"
      class="!rounded-2xl custom-dialog"
    >
      <!-- <el-form ref="domRules" :rules="modelrules" class="flex flex-col gap-4"> -->
      <el-tabs
        type="card"
        v-loading="tabLoading"
        v-model="currentTab"
        editable
        @edit="handleTabsEdit"
      >
        <el-tab-pane
          v-for="(item, key) in shareRules"
          :key="`tabs_${key}`"
          :label="`邀请规则 - ${key + 1}`"
          :name="key"
        >
          <div
            class="grid grid-cols-6 b-1 rd-1 border-color-gray-300 p-6 gap-4"
          >
            <div
              class="col-start-1 col-end-3 flex flex-col gap-4 items-center justify-center"
            >
              <div class="flex flex-row items-center gap-3">
                <span class="flex-shrink-0">最少邀请（人）</span>
                <el-input-number
                  placeholder="请输入"
                  v-model="item.start_num"
                  type="number"
                  :min="getStartMin(item, key)"
                />
              </div>
              <div class="flex flex-row items-center gap-3">
                <span class="flex-shrink-0">最多邀请（人）</span>
                <el-input-number
                  placeholder="请输入"
                  v-model="item.end_num"
                  type="number"
                  :min="(item.start_num ?? 0) + 1"
                  @change="endChange(item, key)"
                />
              </div>
            </div>
            <div>
              <div
                class="b-1 border-r-none border-color-gray-300 w-20 h-full mx-auto"
              ></div>
            </div>

            <div class="col-start-4 col-end-8 flex flex-col gap-8">
              <div class="grid grid-cols-3 items-center gap-1">
                <span>奖励转盘次数</span>
                <el-input-number
                  placeholder="请输入"
                  v-model="item.rotary_table_num"
                  :min="0"
                />
                <span class="ml-10">次/人</span>
              </div>
              <div class="grid grid-cols-3 items-center gap-1">
                <span>奖励现金金额</span>
                <el-input-number
                  placeholder="请输入"
                  v-model="item.reward_amount"
                  :min="0"
                />
                <span class="ml-10">元/人</span>
              </div>
              <div class="grid grid-cols-3 items-center gap-1">
                <span>奖 励 优惠券</span>
                <div class="flex flex-col gap-4">
                  <el-select
                    v-model="item.coupon_id"
                    placeholder="请选择"
                    size="large"
                    value-key="id"
                  >
                    <el-option
                      v-for="op in optionsCoupons"
                      :key="op.id"
                      :label="op.name"
                      :value="op.id.toString()"
                    />
                  </el-select>
                  <el-input-number
                    placeholder="请输入"
                    v-model="item.coupon_num"
                    :min="0"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <span class="h-13 lh-13"></span>
                  <span class="h-13 lh-13 ml-10">张/人</span>
                </div>
              </div>
              <div>
                <span class="col-start-2 col-end-5 text-3 color-gray-400"
                  >选择优惠券时，请注意优惠券有效时间及剩余数量！</span
                >
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="text-center mt-10">
        <el-button type="primary" @click="submitRules">提交</el-button>
      </div>
      <!-- </el-form> -->
    </el-dialog>

    <!---佣金详情-->
    <el-dialog
      title="奖励详情"
      v-model="showCommonDialog"
      width="800"
      class="!rounded-2xl custom-dialog"
      @closed="closeCommonDialog"
    >
      <div>
        <el-table TableConfig :data="tableList" table-layout="fixed">
          <el-table-column v-slot="{ $index }" label="编号" width="80">
            {{ $index + 1 }}
          </el-table-column>
          <el-table-column prop="invite_child_username" label="新人用户名">
          </el-table-column>
          <el-table-column
            v-if="dialogTimes"
            prop="rotary_table_num"
            label="奖励转盘次数"
            v-slot="{ row }"
          >
            <el-text class="mx-1" type="success">{{
              `+ ${row.rotary_table_num}`
            }}</el-text>
          </el-table-column>
          <el-table-column
            prop="reward_amount"
            label="奖励余额"
            v-if="dialogAwards"
            v-slot="{ row }"
          >
            <el-text class="mx-1" type="success">{{
              `+ ${row.reward_amount}`
            }}</el-text>
          </el-table-column>
          <el-table-column
            prop="coupon_num"
            label="奖励优惠券张数"
            v-if="dialogOffs"
            v-slot="{ row }"
          >
            <el-text class="mx-1" type="success">{{
              `+ ${row.coupon_num}`
            }}</el-text>
          </el-table-column>
          <el-table-column v-slot="{ row }" prop="create_time" label="奖励时间">
            {{ formatDate(row.create_time) }}
          </el-table-column>
        </el-table>
        <div flex flex-row mt-2 justify-end items-center>
          <el-pagination
            small
            background
            layout="prev, pager, next"
            :total="detailTotal"
						v-model:page-size="detailPageSize"
						v-model:current-page="detailCurrentPage"
						@update:current-page="getAwards(memberID)"
            class="mt-4"
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import {
  getMarketShareList,
  getMarketRulesList,
  getAllCouponList,
  memberInviteRecord,
  actionEditMarketRule,
} from "@/api/user/index";
import { shareClassify } from "@/interface/searchMap";
import type { TabPaneName } from "element-plus";
import { ElMessage } from "element-plus";

interface IRulesList {
  start_num: number | undefined;
  end_num: number | undefined;
  rotary_table_num: number | undefined;
  reward_amount: number | undefined;
  coupon_num: number | undefined;
  coupon_id: string;
}

interface ICoupons {
  id: string;
  name: string;
  admin_id: string;
  agent_id: string;
  agent_uid: string;
  create_by_username: string;
  create_time: string;
  date_range: string;
  num: string;
  status: string;
  type: string;
  update_time: string;
  use_type: string;
  use_type_value: string;
  when_min_amount: string;
}

const getStartMin = computed(() => (item: IRulesList, index: number) => {
  let min = 0;
  let current_end = item.end_num ?? 0;
  let current_start = item.start_num ?? 0;
  if (index > 0) {
    min = shareRules.value[index - 1]?.end_num ?? 0;
  }
  if (current_end <= current_start) {
    item.end_num = current_start + 1;
  }
  return min + 1;
});

const getEndMin = computed(() => (item: IRulesList, index: number) => {
  let min = item.start_num ?? 0;
  return min + 1;
});

const endChange = (item: IRulesList, index: number) => {
  if (index < shareRules.value.length - 1) {
    let next_start = shareRules.value[index + 1].start_num ?? 0;
    let current_end = item.end_num ?? 0;
    if (next_start <= current_end) {
      shareRules.value[index + 1].start_num = current_end + 1;
    }
  }
};

const shareRules: Ref<IRulesList[]> = ref([]);

//分享规则
const currentTab = ref(0);
const tabLoading = ref(false);

const handleTabsEdit = (
  targetName: TabPaneName | undefined,
  action: "remove" | "add"
) => {
  if (action === "add") {
    nextTick(() => {
      shareRules.value.push({
        start_num: undefined,
        end_num: undefined,
        rotary_table_num: undefined,
        reward_amount: undefined,
        coupon_num: undefined,
        coupon_id: "",
      });
      currentTab.value = shareRules.value.length - 1;
    });
  } else if (action === "remove") {
    if (targetName === shareRules.value.length - 1) {
      shareRules.value.pop();
      if (currentTab.value === targetName) {
        currentTab.value = shareRules.value.length - 1;
      }
    } else if (targetName === 0) {
      shareRules.value.shift();
      if (currentTab.value != 0) {
        currentTab.value -= 1;
      }
    } else {
      let slipS = targetName as number;
      console.log(slipS);
      shareRules.value.splice(slipS + 1, 1);
      if (currentTab.value > Number.parseInt(targetName as any)) {
        currentTab.value -= 1;
      }
    }
  }
};

const dialogRules = ref(false);
const getShareRulesList = () => {
  getMarketRulesList()
    .then((res: any) => {
      shareRules.value = res.data;
      currentTab.value = 0;
    })
    .catch((err: Error) => {});
};
const actionToggleDialogRules = async (isShow: boolean = true) => {
  await getShareRulesList();
  await getShareCouponsList();
  dialogRules.value = isShow;
};

const tableList = ref([]);
const detailTotal = ref(10);
const detailPageSize = ref(10);
const detailCurrentPage = ref(1);
const memberID = ref('')

const getAwards = (member_id: string) => {
	memberID.value = member_id;
  memberInviteRecord({
    member_id,
		page:detailCurrentPage.value,
		list_rows:detailPageSize.value
  })
    .then((res: any) => {
      tableList.value = res.data.data;
			detailTotal.value = res.data.total;
			detailPageSize.value = res.data.per_page;
			detailCurrentPage.value = res.data.current_page;
    })
    .catch((err: Error) => {});
};
const showCommonDialog = computed(() => {
  let res = dialogAwards.value || dialogOffs.value || dialogTimes.value;
  return res;
});

const closeCommonDialog = () => {
  dialogAwards.value = false;
  dialogOffs.value = false;
  dialogTimes.value = false;
	detailCurrentPage.value = 1;
};
//总佣金详情
const dialogAwards = ref(false);
const actionToggleDialogAwards = (
  member_id: string,
  isShow: boolean = true
) => {
  dialogAwards.value = isShow;
  getAwards(member_id);
};
//优惠卷详情
const dialogOffs = ref(false);
const optionsCoupons: Ref<ICoupons[]> = ref([]);
const getShareCouponsList = () => {
  getAllCouponList()
    .then((res: any) => {
      optionsCoupons.value = res.data;
    })
    .catch((err: Error) => {});
};
const actionToggleDialogOffs = (member_id: string, isShow: boolean = true) => {
  dialogOffs.value = isShow;
  getAwards(member_id);
};
//转盘次数详情
const dialogTimes = ref(false);
const actionToggleDialogTimes = (member_id: string, isShow: boolean = true) => {
  dialogTimes.value = isShow;
  getAwards(member_id);
};

const checkRules = async () => {
  let mask = true;
  await shareRules.value.filter((rule) => {
    //区间必须合法
    let start = rule.start_num ?? 0;
    let end = rule.end_num ?? 0;
    if (start <= 0 || end <= 0) {
      ElMessage.closeAll();
      ElMessage.error("请输入合法的规则区间，规则区间不可重叠");
      mask = false;
      return false;
    }
  });
  return mask;
};
//规则提交
const submitRules = async () => {
  let check = await checkRules();
  if (check) {
    actionEditMarketRule({
      rows: JSON.stringify(shareRules.value ?? []),
    })
      .then((res: any) => {
        ElMessage.success("操作成功");
        dialogRules.value = false;
      })
      .catch((err: Error) => {});
  }
};
</script>
<style lang="scss" scoped></style>
