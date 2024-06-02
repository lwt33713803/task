
<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <div>
      <el-tab-pane label="基本配置" name="base">
        <ELproform :schema="baseSchema" :isSubmit="permsJudge(isBase)" ref="baseFrom" @submit="(form) =>
          editConfig(activeName, form) && message.success('操作成功')
          ">
        </ELproform>
      </el-tab-pane>
      <el-tab-pane label="默认配置" name="default">
        <ELproform :schema="defaultSchema" :isSubmit="permsJudge(isDefault)" ref="defaultFrom" @submit="(form) =>
          editConfig(activeName, form) && message.success('操作成功')
          "></ELproform>
      </el-tab-pane>
      <el-tab-pane label="充值配置" name="recharge">
        <el-button v-has="`system:index:systemSub`" type="primary" @click="saveRech"> 保存 </el-button>
        <div v-if="activeName == 'recharge' && isLoading">
          <el-form>
            <el-form-item label="等级购买对应流水比例">
              <div class="flex items-center">
                <el-input-number size="small" v-model="rechForm.level_upgrade_ratio_start"></el-input-number>
                <div class="mx-2">:</div>
                <el-input-number size="small" v-model="rechForm.level_upgrade_ratio_end"></el-input-number>
              </div>
            </el-form-item>
            <el-form-item label="充值金额" prop="">
              <div class="flex items-center">
                <el-tag v-for="tag in rechForm.amount_list" :key="tag" class="mx-1" closable :disable-transitions="false"
                  @close="handleClose(tag)">
                  {{ tag }}
                </el-tag>
                <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-7" size="small"
                  @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
                <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                  + 添加金额标签
                </el-button>
              </div>
            </el-form-item>
            <span text-3 block text-right color-red>
              **
              收款方式变更之后，如果遇到下拉选择框找不到问题，请手动刷新页面</span>
            <el-form-item label="收款方式选择" prop="">
              <el-radio-group v-model="rechForm.recharge_info.select_type">
                <el-radio label="online">线上三方通道</el-radio>
                <el-radio label="offline">线下转账</el-radio>
              </el-radio-group>
              <el-table TableConfig class="my-2" :data="rechForm.recharge_info.offline"
                v-show="rechForm.recharge_info.select_type == 'offline'">
                <el-table-column label="收款名称" prop="name">
                  <template #default="scope">
                    <el-input v-model="scope.row.name" class="ipt" />
                  </template>
                </el-table-column>
                <el-table-column label="收款账号" prop="value">
                  <template #default="scope">
                    <el-input v-model="scope.row.value" class="ipt" />
                  </template>
                </el-table-column>
                <el-table-column label="备注信息" prop="remark">
                  <template #default="scope">
                    <el-input v-model="scope.row.remark" class="ipt" />
                  </template>
                </el-table-column>
                <el-table-column label="排序" prop="sort_value">
                  <template #default="scope">
                    <el-switch :inactive-value="0" :active-value="1" type="number" v-model="scope.row.enable" class="ipt"
                      style="width: 100px; text-align: center"></el-switch>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template #default="scope">
                    <el-button @click="addOfflineList()" type="primary" v-if="scope.$index ==
                      rechForm.recharge_info.offline.length - 1
                      ">添加
                    </el-button>
                    <el-button @click="deleteOfflineList(scope.$index)" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-table TableConfig class="my-2" :data="rechForm.recharge_info.online"
                v-show="rechForm.recharge_info.select_type == 'online'">
                <el-table-column label="渠道名称" prop="name"></el-table-column>
                <fms-colunm label="图标" prop="icon_path" type="image"></fms-colunm>
                <el-table-column label="支付方式" prop="value"></el-table-column>
                <el-table-column label="排序" prop="sort_value">
                  <template #default="scope">
                    <el-input type="number" v-model="scope.row.sort_value" class="ipt"
                      style="width: 100px; text-align: center" />
                  </template>
                </el-table-column>
                <el-table-column label="状态">
                  <template #default="scope">
                    <el-switch type="number" :inactive-value="0" :active-value="1" v-model="scope.row.enable" class="ipt"
                      style="width: 100px; text-align: center"></el-switch>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="提现配置" name="withdrawal">
        <ELproform :schema="cashschema" :isSubmit="permsJudge(isWith)" ref="withdrawalFrom" @submit="(form) =>
          editConfig(activeName, form) && message.success('操作成功')
          "></ELproform>
      </el-tab-pane>
      <el-tab-pane label="功能配置" name="function">
        <ELproform :schema="fnschema" direction="dir" isInline isSubmit ref="functionFrom" @submit="(form) =>
          editConfig(activeName, form) && message.success('操作成功')
          "></ELproform>
      </el-tab-pane>
    </div>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ElInput, ElLoading, TabsPaneContext } from "element-plus";
import { Widget } from "@/components/Elgroup/ELproform/ELproform";
import { getmemberSkin } from "@/api/user/userAdmin";
import { optionsStore } from "@/store/modules/otions";
const onBaseSubmit = (form: any) => { };
const formData = ref(null);
const isLoading = ref(false);
type Config = "base" | "default" | "withdrawal";
const withdrawalFrom = ref(null);
const defaultFrom = ref(null);
const baseFrom = ref(null);
const isBase = `system:index:basicSub`
const isDefault = `system:index:defaultSub`
const isWith = 'system:index:withdrawalSub'
function permsJudge(value: string) {
  let perms = JSON.parse(localStorage.getItem("roleNodes") as string);
  for (let item of perms) {
    if (item === value) {
      return true;
    }
  }
  return false;
}
const rechForm = ref({
  amount_list: [],
  recharge_info: {
    select_type: null,
  },
});
const saveRech = async () => {
  const form = {
    level_upgrade_ratio_end: rechForm.value.level_upgrade_ratio_end,
    level_upgrade_ratio_start: rechForm.value.level_upgrade_ratio_start,
    recharge_info: JSON.stringify(rechForm.value.recharge_info),
    amount_list: rechForm.value.amount_list.join(","),
  };
  const { code } = await editConfig(activeName.value, form);
  if (code == 1) {
    optionsStore().setDictMap();
    return message.success("操作成功");
  }
};
const addOfflineList = () => {
  rechForm.value.recharge_info.offline.push({
    name: "",
    value: "",
    remark: "",
    enable: 0,
  });
};
const deleteOfflineList = (index: number) => {
  rechForm.value.recharge_info.offline.splice(index, 1);
};
const functionFrom = ref(null);
const fnschema: Widget[] = [
  {
    type: "switch",
    label: "是否开启大转盘",
    key: "rotary_table_switch",
  },
  {
    type: "switch",
    label: "是否开启优惠卷",
    key: "coupon_switch",
  },
  {
    type: "switch",
    label: "是否开启成就管理",
    key: "achievement_switch",
  },
  {
    type: "switch",
    label: "是否开启签到管理",
    key: "sign_in_switch",
  },
  {
    type: "switch",
    label: "是否开启积分管理",
    key: "integral_switch",
  },
  {
    type: "ui",
    label: "",
    key: "app_download_switch",
  },
  {
    type: "radioImage",
    label: "切换用户端颜色",
    key: "app_skin",
    options: {
      action: getmemberSkin,
      nameProperty: "key",
      valueProperty: "name",
    },
  },
];
const baseSchema: Widget[] = [
  {
    type: "input",
    label: "站点名称",
    key: "site_name",
    rules: { required: true },
  },

  {
    type: "upload",
    label: "站点logo",
    key: "site_logo",
    rules: { required: true },
  },
  {
    type: "input",
    label: "系统版本号",
    key: "site_version",
    rules: { required: true },
  },
  {
    type: "switch",
    label: "APP系统开关",
    key: "app_download_switch",
  },
  {
    type: "input",
    label: "APP版本号",
    key: "app_version",
  },
  {
    type: "input",
    label: "安卓下载地址",
    key: "app_android_dwn_url",
  },
  {
    type: "input",
    label: "IOS下载地址",
    key: "app_ios_dwn_url",
  },
  {
    type: "switch",
    label: "地址必填开关",
    key: "member_address_required_switch",
  },
  {
    type: "switch",
    label: "实名认证必填开关",
    key: "member_verify_switch",
  },

  {
    type: "switch",
    label: "游客模式开关",
    key: "guest_switch",
  },
  {
    type: "switch",
    label: "谷歌密钥开关",
    key: "google_secret_switch",
  },
  {
    type: "input",
    label: "谷歌密钥维护",
    key: "google_secret_value",
  },
  {
    type: "textarea",
    label: "后台ip白名单",
    key: "admin_permit_ip",
  },
  {
    type: "textarea",
    label: "代理后台ip白名单",
    key: "agent_permit_ip",
  },
  {
    type: "textarea",
    label: "APP登录ip黑名单",
    key: "app_forbid_ip",
  },
  {
    type: "input",
    label: "用户配置商品价格范围",
    key: "member_task_goods_price_range",
  },
  {
    type: "input-number",
    label: "商品运费",
    key: "goods_courier_fee",
  },
  {
    type: "time",
    label: "刷单时间",
    key: "brush_time",
  },
];
const defaultSchema: Widget[] = [
  {
    type: "input",
    label: "用户账号默认密码",
    key: "member_password",
    rules: { required: true },
  },
  {
    type: "input",
    label: "用户提现默认密码",
    key: "member_pay_password",
    rules: { required: true },
  },
  {
    type: "input",
    label: "代理账户默认密码",
    key: "agent_password",
    rules: { required: true },
  },

  {
    type: "radio",
    label: "是否开启三方注册",
    key: "register_third_type",
    options: [
      {
        name: "手机号注册",
        code: "mobile",
      },
      {
        name: "邮箱注册",
        code: "email",
      },
      {
        name: "关闭三方注册",
        code: "no",
      },
    ],
  },
  {
    type: "input-number",
    label: "注册送现金",
    key: "register_reward",
  },
  {
    type: "input-number",
    label: "Ip注册个数",
    key: "ip_register_limit",
  },
  {
    type: "switch",
    label: "注册邀请码是否必填",
    key: "register_invite_code_require",
  },
];
const rechargeSchema: Widget[] = [
  {
    type: "switch",
    label: "充值银行卡开关",
    key: "username",
  },
  {
    type: "input",
    label: "充值银行名称",
    key: "username",
    rules: { required: true },
  },
  {
    type: "input",
    label: "充值银行卡收款人",
    key: "username",
    rules: { required: true },
  },
  {
    type: "input",
    label: "充值银行收款提示",
    key: "username",
    rules: { required: true },
  },
  {
    type: "input-number",
    label: "充值金额选项",
    key: "username",
  },
  {
    type: "input-number",
    label: "等级购买对应流水比例",
    key: "username",
    child: [
      {
        type: "input-number",
        key: "username",
      },
      {
        type: "ui",
        vm: h("div", ":"),
      },
      {
        type: "input-number",
        key: "username",
      },
    ],
  },
];
const cashschema: Widget[] = [
  {
    type: "input-number",
    label: "单次提现最低金额",
    key: "single_min_amount",
  },
  {
    type: "input-number",
    label: "单次提现最高金额",
    key: "single_max_amount",
  },
  {
    type: "input-number",
    label: "提现每日限额",
    key: "day_amount_limit",
  },
  {
    type: "input-number",
    label: "日免费提现次数",
    key: "day_free_times",
  },
  {
    type: "ui",
    label: "提现手续费",
    key: "username",
    child: [
      {
        type: "select",
        key: "withdrawal_fee_type",
        options: [
          {
            dict_value: "固定金额",
            dict_name: "amount",
          },
          {
            dict_value: "百分比",
            dict_name: "percent",
          },
        ],
      },
      {
        type: "input-number",
        key: "withdrawal_fee_value",
      },
    ],
  },
  {
    type: "input-number",
    label: "提现银行卡数量限制",
    key: "member_bankcard_limit",
  },
  {
    type: "time",
    label: "提现时间",
    key: "withdrawal_time",
  },
  {
    type: "switch",
    label: "提现是否开启提现密码",
    key: "pay_password_switch",
  },
  {
    type: "switch",
    label: "提现是否需要实名",
    key: "withdrawal_whether_member_verify",
  },
];
const activeName: Ref<Config> = ref("base");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
function parseTimeString(timeString: any) {
  const times = timeString?.split(","); // 以逗号分割时间字符串
  const dates = times.map((time) => {
    const [hour, minute] = time.trim().split(":"); // 去除多余空格并拆分小时和分钟
    const now = new Date(); // 获取当前日期和时间
    const date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour,
      minute
    ); // 构建日期对象
    return date;
  });
  return dates;
}
const getConfigInfoMethod = async () => {
  isLoading.value = false;
  const loading = ElLoading.service({ fullscreen: true });
  const { data } = await getConfigInfo(activeName.value);
  loading.close();
  if (activeName.value === "base") {
    baseFrom.value.form = {
      ...data,
      brush_time: parseTimeString(data.brush_time),
      brush_timereplace: `${useDateFormat(parseTimeString(data.brush_time)[0], "HH:mm").value
        },${useDateFormat(parseTimeString(data.brush_time)[1], "HH:mm").value}`,
    };
  }
  if (activeName.value === "default") {
    defaultFrom.value.form = data;
  }
  if (activeName.value === "function") {
    functionFrom.value.form = data;
  }
  if (activeName.value === "recharge") {
    rechForm.value = data;
    rechForm.value.amount_list = rechForm.value.amount_list.split(",");
  }
  if (activeName.value === "withdrawal") {
    let date = data.withdrawal_time;
    withdrawalFrom.value.form = {
      ...data,
      withdrawal_time: parseTimeString(data.withdrawal_time),
      withdrawal_timereplace: `${useDateFormat(parseTimeString(date)[0], "HH:mm").value
        },${useDateFormat(parseTimeString(date)[1], "HH:mm").value}`,
    };
  }
  isLoading.value = true;
};
onMounted(async () => {
  await getConfigInfoMethod();
});
watchEffect(async () => {
  await getConfigInfoMethod();
});

const inputValue = ref("");
const dynamicTags = ref(["Tag 1", "Tag 2", "Tag 3"]);
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();

const handleClose = (tag: string) => {
  rechForm.value.amount_list.splice(dynamicTags.value.indexOf(tag), 1);
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    rechForm.value.amount_list.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};
</script>
<style>
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
