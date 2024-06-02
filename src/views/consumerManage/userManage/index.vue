<script setup lang="ts">
import i18n from "@/lang/index"; // 引入i8n实例
import blockLable from "@/components/block/Label.vue";
import userForm from "./components/userConfigForm.vue";
import insetForm from "./components/insetConfigForm.vue";
import billForm from "./components/billChange.vue";
import userInfo from "./components/userInfo.vue";
import bankInfoModel from "./components/bankInfo.vue";
import verifyInfo from "./components/verify.vue";
import {
  setMemberVerifyEdit, //设置用户实名信息
  getMemberVerifyView, //获取用户实名信息
  getMemberBank,
  setMemberBank,
  getMemberView,
  setMemberView,
  createMemberConfig,
  getAppendMemberConfig,
  getmemberConfigGoods,
  setAppendMemberConfig,
  getmemberBillAccount,
  getmemberList,
  getmemberConfig,
  deleteMember,
  editMember,
  createMember,
  resetMemberPassword,
} from "@/api/user/userAdmin";
import userViewModel from "./components/userInfo.vue";
import { useArrayMap } from "@vueuse/core";
import ElPageOrigin from "@/components/Elgroup/Elorigin/index.vue";
import { useTableSelection } from "@/hooks/useTableSelect";
import { useTableDelete } from "@/hooks/useTableDelete";
import {
  smartFilterGoodsId,
  smartFilterUserName,
  InputStatus,
  smartUserSerachGroup,
} from "@/interface/searchMap";
import useDetail from "@/hooks/useDetail";
import type {
  goodsNameType,
  goodsNameTypeg,
} from "../goodsClassifyManage/components/classify";
import to from "await-to-js";
import { changeAccount } from "@/api/goods";
import { useRoute } from "vue-router";
import { Widget } from "@/components/Elgroup/ELproform/ELproform";
const route = useRoute();
const createTips = `<span >提示信息：</span> <br />
<span style="color:red"> * <span> <span style="color:#333">  后台创建的用户时，该用户的默认密码由系统直接填充；</span> <br />
     `
const __task_group = ref(null)
const __blance = ref(0)
onMounted(() => {
  getGradeList().then((res) => {
    localStorage.setItem("levelList", JSON.stringify(res.data));
  });
  getTacticsSelectAll().then(res => {
    __task_group.value = res
  })
});
const userEditInfoStatus = ref(false);
const activeName = ref("user");
const userInfoData = reactive({
  info: {},
  name: {},
  bank: {},
});
watch(activeName.value, (newVal) => {
  console.log(newVal);
});
const goodForm = ref({
  category_name: undefined,
  category_pic: undefined,
  sort: undefined,
  status: "1",
});
const pageOrigin = ref(null);
const filterId = (item: any) => {
  return item?.id;
};
const bill = ref({});
const userConfigLoading = ref(false);
const { selectedItems, handleSelectionChange } = useTableSelection(filterId);
//@ts-ignore
const billConfigForm = useDetail(
  bill,
  billForm,
  i18n.global.t("default.append")
);
const userConfigForm = useDetail(
  goodForm,
  userForm,
  i18n.global.t("default.userconfig"),
  true,
  true,
  `<span >提示信息：</span> <br />
<span style="color:red"> * <span>  <span style="color:#333">  生成商品按钮 ：如商品所属分类变更，请重新点击生成商品按钮；如变更商品分类所属等级（等级管理中，等级对应的商品类型限制）<br />，请重新点击生成商品按钮；如用户升级VIP等级后，请重新点击生成商品按钮；</span> <br />
<span style="color:red"> * <span>   <span style="color:#333">  订单冻结状态开启后，用户在刷单时，资金（本金+佣金）不可操作；
  <br />【例如】：默认模式 / 叠加模式，给用户设置了三单，第一单订单冻结，第二单订单冻结，第三单订单冻结状态关闭；
<br /> 那表示只有用户在全部完成后用户才可操作资金；</span>  <br />
<span style="color:red"> * <span>  <span style="color:#333"> 模式分为余额百分比和固定金额，选中完成填充相应的数值，点击生成商品按钮系统会根据“系统配置”中设置的价格浮动值，
  <br />来生成对应商品；若生成的商品不满意可以点击相应商品进行替换</span> <br />
<span style="color:red"> * <span>  <span style="color:#333"> 表示该用户完成此单后会升级到哪个等级（内容为空则不生效）</span> <br />

     `
);
const insetConfigForm = useDetail(
  goodForm,
  insetForm,
  i18n.global.t("default.inset"),
  true
);
const userInfoForm = useDetail(
  {},
  userInfo,
  i18n.global.t("default.createUser"),
  false,
  false,
  false,
);

const getBillQuery = async (item: string) => {
  saveStatus.value = false;
  // const [err, data] = await to<any>(getmemberBillAccount(member_id));
  bill.value = {
    ...item?.account,
    username: item.username,
  };
  // billConfigForm.open({}, false)
  billstatus.value = true;
};
const getMemberQuery = async (member_id: string, row: any) => {
  const [err, data] = await to(getmemberConfig(member_id));
  __blance.value = `用户配置 余额:${row.account.balance}`
  if (data.rows.length === 0) {
    data.rows.push({
      mode_type: data!.brush_mode_type[0].dict_value,
      balance_search_type: data!.balance_search_type[0]!.dict_value,
    });
    console.log(data.rows, "rows");
  }
  goodForm.value = { ...data, memberId: member_id };
  userConfigForm.open({}, __blance.value);
};
const onModelEdit = async (form: goodsNameType | { id: string }) => {
  // goodForm.value = form
  userConfigForm.open({}, false);
};
const saveGoodsClassify = async (
  callbackForm: goodsNameType & { id: string },
  callback: any
) => {
  try {
    callbackForm;
    const [err, data] = await to<any>(
      createMemberConfig({
        rows: JSON.stringify(callbackForm.value.rows),
        member_id: callbackForm.value.memberId,
      })
    );
    if (!err) {
      pageOrigin.value!.refreshTrigger();
      return (
        ElMessage.success(i18n.global.t("default.okSuccess")) && callback("hide")
      );
    } else {
      callback("hideloading")
    }
  } catch (error) {

    callback("hideloading")
  }

};
const saveConfigForm = async (
  callbackForm: goodsNameType & { id: string },
  callback: any
) => {
  try {
    const [err, data] = await to<any>(
      setAppendMemberConfig(
        callbackForm.value.memberId,
        JSON.stringify(callbackForm.value.rows)
      )
    );
    if (!err) {
      pageOrigin.value.refreshTrigger();
      return (
        ElMessage.success(i18n.global.t("default.okSuccess")) && callback("hide")
      );
    }
  } catch (error) {
    callback("hideloading")
  }
};

const createMembers = async () => {
  goodForm.value = {};
  userConfigForm.open({}, false);
};

const getInsetQuery = async (member_id: string, row: any) => {
  console.log(member_id);
  __blance.value = `打针 余额:${row.account.balance}`
  const [err, data] = await to(getAppendMemberConfig(member_id));
  goodForm.value = { ...data, memberId: member_id };
  if (data?.rows.length === 0)
    return message.warning("当前无配置,请先添加用户配置");
  insetConfigForm.open({}, __blance.value);
};

const billFormRef = ref(null);
const billConfigFormChange = async () => {
  try {
    saveStatus.value = true;
    const [err, data] = await to<any>(
      changeAccount({ ...billFormRef.value.getValue() })
    );
    if (!err) {
      pageOrigin.value!.refreshTrigger();
      return (
        ElMessage.success(i18n.global.t("default.okSuccess")) &&
        (billstatus.value = false)
      );
    }
    saveStatus.value = false;
  } catch (error) {
    saveStatus.value = false;
  }
};

const userInfoFormChange = async (form: any, callback: any) => {
  console.log(form, "form");
  const [err, data] = await to<any>(createMember(form));
  if (!err) {
    pageOrigin.value!.refreshTrigger();
    return (
      ElMessage.success(i18n.global.t("default.okSuccess")) && callback("hide")
    );
  }
};
const editUserInfo = async (row: any) => {
  const [data, bankData] = await Promise.all([
    getMemberView(row.id),
    getMemberBank(row.id),
    getMemberVerifyView(row.id),
  ]);
  // const [err, data] = await to<any>(getMemberView(row.id));
  // const [, bankData] = await to<any>(getMemberBank(row.id));
  const [, nameData] = await to<any>(getMemberVerifyView(row.id));
  userInfoData.info = data.info;
  userInfoData.bank = bankData;
  userInfoData.name = nameData;
  // activeName.value = 'user'
  userEditInfoStatus.value = true;
};
const userViewModelRef = ref(null);
const nameViewModelRef = ref(null);
const bankViewModelRef = ref(null);
const saveStatus = ref(false);
const billstatus = ref(false);

const submitForm = async () => {
  if (activeName.value == "user") {
    const _set = async (form: any) => {
      const [err, data] = await to<any>(
        setMemberView({
          ...form,
          level: 1,
          account: 1,
        })
      );
      if (!err) {
        pageOrigin.value.refreshTrigger();
        return (
          ElMessage.success(i18n.global.t("default.editSuccess")) &&
          (userEditInfoStatus.value = false)
        );
      }
    };
    userViewModelRef.value
      .getInterface()[0]
      .value.validate(
        (valid: any) => valid && _set(userViewModelRef.value.getInterface()[1])
      );
  } else if (activeName.value == "bank") {
    const _set = async (form: any) => {
      const [err, data] = await to<any>(
        setMemberBank({ row: JSON.stringify(form) })
      );
      if (!err) {
        pageOrigin.value.refreshTrigger();
        return (
          ElMessage.success(i18n.global.t("default.editSuccess")) &&
          (userEditInfoStatus.value = false)
        );
      }
    };
    console.log(
      bankViewModelRef.value.getInterface(),
      " bankViewModelRef.value"
    );
    _set(bankViewModelRef.value.getInterface()[1]);
    // bankViewModelRef.value.getInterface()[0].value.validate((valid: any) => valid && )
  } else if (activeName.value == "names") {
    const _set = async (form: any) => {
      const [err, data] = await to<any>(setMemberVerifyEdit(form.info));
      if (!err) {
        pageOrigin.value.refreshTrigger();
        return (
          ElMessage.success(i18n.global.t("default.okSuccess")) &&
          (userEditInfoStatus.value = false)
        );
      }
    };
    console.log(
      nameViewModelRef.value.getInterface(),
      " bankViewModelRef.value"
    );
    _set(nameViewModelRef.value.getInterface()[1]);
  }
};
const { onDelete, onMessageBoxDelete } = useTableDelete(resetMemberPassword, {
  details: "确认重置密码",
  type: "error",
});

const { onDeletePay, onMessageBoxDelete: onResetPayPassord } = useTableDelete(
  resetMemberPassword,
  { details: "确认重置支付密码", type: "error" }
);
const changeGroupStatus = ref(false)
const appendInfo = ref(null)
const appendForm = ref({
  task_group_id: '',
})
const appendMember = (row: any) => {
  appendInfo.value = row
  changeGroupStatus.value = true
}
const changeGroup = () => {
  if (!appendForm.value.task_group_id || appendForm.value.task_group_id == '') return message.error('请选择策略组')
  changeMemberTaskGroup({ ...appendForm.value, id: appendInfo.value.id }).then(res => {
    if (res.code == 1) {
      message.success('操作成功')
      changeGroupStatus.value = false
      appendForm.value.task_group_id = null
      pageOrigin.value!.refreshTrigger();
    }
  })
}

//user child parent dialog code
const queryId = ref(null)
const childDialogStatus = ref(false)

const parentDialogStatus = ref(false)

const childDialog = (id: any) => {
  childDialogStatus.value = true
  queryId.value = id
}
const parentDialog = (id: any) => {
  parentDialogStatus.value = true
  queryId.value = id
}

const onCloseChildDialog = () => {
  childDialogStatus.value = false
}
const onCloseParentDialog = () => {
  parentDialogStatus.value = false
}
//user child parent dialog code end

// create orders ends to open dialog
const orderDialogStatus = ref(false)
const orderSaveStatus = ref(false)
const openOrderCreateTick = (row: any) => {
  orderDialogStatus.value = true
}
const orderFormRef = ref(null)
const orderRules = ref({
  mode_type: [
    { required: true, message: "未填必填项", trigger: "blur" },
  ],
  balance_search_value: [
    { required: true, message: "未填必填项", trigger: "blur" },
  ],
  commission_settle_type: [
    { required: true, message: "请选择佣金结算模式", trigger: "blur" },
  ],
  commission_settle_value: [
    { required: true, message: "请输入佣金结算值", trigger: "blur" },
  ],
  number: [
    { required: true, message: "请输入任务数量", trigger: "blur" },
  ],
});
const saveOrder = async () => {
  await orderFormRef.value.validate((valid: any, fields: any) => {
    if (valid) {
      try {
        orderSaveStatus.value = true
        setTimeout(() => {
          orderSaveStatus.value = false
          // getMemberQuery(1, {})
          orderDialogStatus.value = false

        }, 2000)
      } catch (error) {
        orderSaveStatus.value = false
      }
    } else {
      console.log('error submit!', fields)
    }
  })

}

const formOder = ref({
  mode_type: null,
  balance_search_type: null,
  balance_search_value: null,
  commission_settle_type: null,
  commission_settle_value: null,
  number: null
})


const baseSchema: Widget[] = [
  {
    type: "select",
    label: "模式",
    key: "mode_type",
    rules: { required: true },
  },

  {
    type: "upload",
    label: "匹配模式",
    key: "site_logo",
    rules: { required: true },
    child: [
      {
        type: "select",
        key: "username",
      },
      {
        type: "ui",
        vm: h("div", "---"),
      },
      {
        type: "input-number",
        key: "username",
      },
    ],
  },
  {
    type: "upload",
    label: "佣金结算模式",
    key: "site_logo",
    rules: { required: true },
    child: [
      {
        type: "select",
        key: "username",
      },
      {
        type: "ui",
        vm: h("div", "---"),
      },
      {
        type: "input-number",
        key: "username",
      },
    ],
  },
  {
    type: "input-number",
    label: "任务数量",
    key: "site_name",
    rules: { required: true },
  },
]

</script>

<template>
  <ELprodialog destroy-on-close v-model="orderDialogStatus" :footer="false" :dialog-width="500" title="一键批量生成订单"
    dialogHeight="500">
    <div>
      <el-form :model="formOder" :rules="orderRules" ref="orderFormRef">
        <div class="flex">
          <el-form-item :label="$t('userConfig.mode')" prop="mode_type">
            <fms-select size="small" v-model="formOder.mode_type" :key-name="'dict_label'" :val-name="'dict_value'" />
          </el-form-item>
          <el-form-item :label="$t('userConfig.matemode')" prop="balance_search_type">
            <fms-select size="small" v-model="formOder.balance_search_type" :key-name="'dict_label'"
              :val-name="'dict_value'" />
          </el-form-item>

        </div>
        <el-form-item prop="balance_search_value" class=" w-full">
          <el-alert :closable="false" class="my-2" v-if="formOder.mode_type == 'overlay'" type="warning"
            :title="formOder.balance_search_type == 'amount' ? ' 请输入商品匹配金额，以英文“,”隔开 ' : '匹配值小数点保留两位，以英文 “,” 隔开'">
          </el-alert>
          <el-alert :closable="false" class="my-2" type="warning" v-else
            :title="`${formOder.balance_search_type == 'amount' ? ' 请输入商品匹配金额 ' : '匹配值小数点保留两位'}`">
          </el-alert>
          <div class="my-2 w-full">
            <el-input size="small" v-model="formOder.balance_search_value" v-if="formOder.mode_type == 'overlay'"
              :placeholder="`${formOder.balance_search_type == 'amount' ? ' 请输入商品匹配金额，以英文“,”隔开 ' : '匹配值小数点保留两位，以英文 “,” 隔开'}`" />
            <fms-input-number style="width: 100% !important;" v-else :min="0" v-model="formOder.balance_search_value"
              :precision="2"
              :placeholder="`${formOder.balance_search_type == 'amount' ? ' 请输入商品匹配金额 ' : '匹配值小数点保留两位'}`"></fms-input-number>
          </div>
        </el-form-item>
        <div class="flex">
          <el-form-item :label="$t('userConfig.moneymode')" prop="commission_settle_type">
            <fms-select size="small" v-model="formOder.commission_settle_type" :key-name="'dict_label'"
              :val-name="'dict_value'" />
          </el-form-item>
          <el-form-item prop="commission_settle_value">
            <fms-input-number :min="0" size="small" v-model="formOder.commission_settle_value" placeholder="请输入" />
          </el-form-item>
        </div>
        <el-form-item prop="number" label="任务数量">
          <fms-input-number :min="0" size="small" v-model="formOder.number" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <!-- <el-alert title="以小数点隔开" type="error" /> -->
    </div>

    <template #footer>
      <el-button type="primary" :loading="orderSaveStatus" @click="saveOrder">
        保存
      </el-button>
      <el-button @click="orderDialogStatus = false"> 取消 </el-button>
    </template>
  </ELprodialog>
  <ELprodialog destroy-on-close v-model="parentDialogStatus" :footer="false" :dialog-width="1300" title="查看上级"
    dialogHeight="500">
    <f-table format v-horizontal-scroll ref="pageOrigin" :queryparameters="{
      id: queryId
    }" :systemRecordloader="getParentArray" :smartFilter="[
      {
        scheme: 'username',
        title: `${$t('用户.用户名')}`,
        mixText: 3,
        placeholder: `${$t('用户.请输入用户名')}`,
        type: 'input',
        value: route.query.username || '',
      },
      {
        scheme: 'invite_code',
        title: `${$t('用户.邀请码')}`,
        mixText: 3,
        placeholder: `${$t('用户.请输入邀请码')}`,
        type: 'input',
        value: route.query.username || '',
      },
    ]">
      <template #default="attrs">
        <el-table-column type="expand">
          <template #default="props">
            <div m="4">
              <el-table TableConfig :data="props.row.children">
                <el-table-column label="字典名称" prop="dict_label" />
                <el-table-column label="字典值" prop="dict_value" />
                <el-table-column label="备注" prop="remark" />
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('用户.id')" prop="id"></el-table-column>
        <el-table-column :label="$t('用户.用户名')" prop="username"></el-table-column>
        <el-table-column :label="$t('用户.手机号')" prop="mobile" v-slot="{ row }">
          <blockLable :text="row.username" :maxWidth="200"></blockLable>
        </el-table-column>
        <el-table-column :label="$t('用户.用户类型')" prop="sys_type_name" v-slot="{ row }">
          <blockLable :text="row.nickname" :maxWidth="200"></blockLable>
        </el-table-column>
        <el-table-column :label="$t('用户.会员等级')" prop="level_name" v-slot="{ row }">
          <blockLable :text="row.invite_code" :maxWidth="200"></blockLable>
        </el-table-column>
        <el-table-column :label="$t('用户.所属代理')" prop="agent_username">
        </el-table-column>
        <el-table-column :label="$t('用户.邀请码')" prop="invite_code" align="center" width="200" v-slot="{ row }">
          <el-link type="primary">{{ row.email }}</el-link>
        </el-table-column>
      </template>
    </f-table>

  </ELprodialog>
  <ELprodialog destroy-on-close v-model="childDialogStatus" :footer="false" :dialog-width="1300" title="账单下级"
    dialogHeight="500">
    <f-table format v-horizontal-scroll ref="pageOrigin" :queryparameters="{
      id: queryId
    }" :systemRecordloader="getChildArray" :smartFilter="[
      {
        scheme: 'username',
        title: `${$t('用户.用户名')}`,
        mixText: 3,
        placeholder: `${$t('用户.请输入用户名')}`,
        type: 'input',
        value: route.query.username || '',
      },
      {
        scheme: 'invite_code',
        title: `${$t('用户.邀请码')}`,
        mixText: 3,
        placeholder: `${$t('用户.请输入邀请码')}`,
        type: 'input',
        value: route.query.username || '',
      },
    ]">
      <template #default="attrs">
        <el-table-column :label="$t('用户.id')" prop="id"></el-table-column>
        <el-table-column :label="$t('用户.用户名')" prop="username"></el-table-column>
        <el-table-column :label="$t('用户.手机号')" prop="mobile" v-slot="{ row }">
          <blockLable :text="row.username" :maxWidth="200"></blockLable>
        </el-table-column>
        <el-table-column :label="$t('用户.用户类型')" prop="sys_type_name" v-slot="{ row }">
          <blockLable :text="row.sys_type_name" :maxWidth="200"></blockLable>
        </el-table-column>
        <el-table-column :label="$t('用户.会员等级')" prop="level_name" v-slot="{ row }">
          <blockLable :text="row.invite_code" :maxWidth="200"></blockLable>
        </el-table-column>
        <el-table-column :label="$t('用户.所属代理')" prop="agent_username">
        </el-table-column>
        <el-table-column :label="$t('用户.邀请码')" prop="invite_code" align="center" width="200" v-slot="{ row }">
          <el-link type="primary">{{ row.invite_code }}</el-link>
        </el-table-column>
        <el-table-column :label="$t('用户.邀请人数')" prop="invite_code" align="center" width="200" v-slot="{ row }">
          <el-link type="primary">{{ row.invite_num }}</el-link>
        </el-table-column>
      </template>
    </f-table>

  </ELprodialog>
  <!-- 正常form loading -->
  <ELprodialog destroy-on-close v-model="billstatus" :footer="false" :dialog-width="600" title="账单变化"
    dialogHeight="270">
    <billForm ref="billFormRef" :form-data="bill"></billForm>
    <template #footer>
      <el-button type="primary" v-bind:loading="saveStatus" @click="billConfigFormChange">
        保存
      </el-button>
      <el-button @click="billstatus = false"> 取消 </el-button>
    </template>
  </ELprodialog>
  <ELprodialog destroy-on-close v-model="changeGroupStatus" :footer="false" :dialog-width="600" title="策略组变更"
    dialogHeight="270">
    <el-form>
      <el-form-item label="原有策略组">
        {{ appendInfo.task_plan_group_name }}
      </el-form-item>
      <el-form-item label="切换策略组">
        <fms-select size="small" v-model="appendForm.task_group_id" :options="__task_group" :key-name="'group_name'"
          :val-name="'id'" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" v-bind:loading="saveStatus" @click="changeGroup">
        保存
      </el-button>
      <el-button @click="changeGroupStatus = false"> 取消 </el-button>
    </template>
  </ELprodialog>
  <!-- getTacticsSelect({ all: 1 }); -->
  <billConfigForm @save="billConfigFormChange"></billConfigForm>
  <userInfoForm @save="userInfoFormChange"></userInfoForm>
  <userConfigForm @save="saveGoodsClassify" />
  <insetConfigForm @save="saveConfigForm"></insetConfigForm>

  <!-- 特殊Dialog无法用到配置组件 -->
  <ELprodialog :footer="false" destroy-on-close :title="$t('userConfig.editUser')" v-model="userEditInfoStatus">
    <div>
      <el-tabs class="demo-tabs" v-model="activeName">
        <el-tab-pane :label="$t('userConfig.baseinfo')" name="user">
        </el-tab-pane>
        <el-tab-pane :label="$t('userConfig.veryinfo')" name="names">
        </el-tab-pane>
        <el-tab-pane :label="$t('userConfig.bankInfo')" name="bank">
          <!-- <userViewModel v-if="userEditInfoStatus" :formData="userInfoData.info" ref="bankViewModelRef"></userViewModel> -->
        </el-tab-pane>
        <!-- <verifyInfo ref="nameViewModelRef"></verifyInfo> -->
      </el-tabs>
      <div class="overflow-y-auto">
        <userViewModel v-if="activeName == 'user'" :formData="userInfoData.info" ref="userViewModelRef"
          form-type="edit">
        </userViewModel>
        <verifyInfo v-if="activeName == 'names'" :formData="userInfoData.name" ref="nameViewModelRef"></verifyInfo>
        <bankInfoModel v-if="activeName == 'bank'" :formData="userInfoData.bank" ref="bankViewModelRef"></bankInfoModel>
      </div>
    </div>
    <template #footer>
      <el-button type="primary" @click="submitForm"> 保存 </el-button>
      <el-button @click="userEditInfoStatus = false"> 取消 </el-button>
    </template>
  </ELprodialog>
  <f-table format v-horizontal-scroll ref="pageOrigin" :systemRecordloader="getmemberList" :smartFilter="[
    {
      scheme: 'username',
      title: '用户名',
      mixText: 3,
      placeholder: '请输入查询的用户名称',
      type: 'input',
      value: route.query.username || '',
    },
    ...smartUserSerachGroup,
  ]">
    <template #header-action-append-button-gourp="{
      refreshTrigger,
      refreshTriggerAllParams,
    }">
      <el-button v-has="`user:index:create`" type="primary" @click="() => userInfoForm.open({}, '创建用户')">{{
        $t("default.create")
      }}</el-button>
    </template>
    <template #default="attrs">
      <!-- <el-table-column type="selection" width="55" /> -->
      <el-table-column :label="$t('table.id')" prop="id" fixed="left"></el-table-column>
      <el-table-column :label="`用户类型`" prop="sys_type_label"></el-table-column>
      <el-table-column :label="$t('table.username')" prop="username" v-slot="{ row }">
        <blockLable :text="row.username" :maxWidth="200"></blockLable>
      </el-table-column>
      <el-table-column :label="$t('table.nickname')" prop="nickname" v-slot="{ row }">
        <blockLable :text="row.nickname" :maxWidth="200"></blockLable>
      </el-table-column>
      <el-table-column :label="`邀请码`" prop="nickname" v-slot="{ row }">
        <blockLable :text="row.invite_code" :maxWidth="200"></blockLable>
      </el-table-column>
      <el-table-column :label="$t('table.mobile')" prop="mobile">
      </el-table-column>
      <el-table-column :label="$t('table.email')" prop="email" align="center" width="200" v-slot="{ row }">
        <el-link type="primary">{{ row.email }}</el-link>
      </el-table-column>
      <el-table-column :label="`所属上级`" prop="parent_username"></el-table-column>
      <el-table-column :label="$t('userConfig.brushmode')" prop="mode_type"></el-table-column>
      <el-table-column :label="$t('userConfig.userlevel')" prop="level" v-slot="{ row }">
        <el-tag>
          {{ row?.level?.level_name ?? "无等级" }}
        </el-tag>
      </el-table-column>
      <el-table-column v-slot="{ row }" label="账户余额" prop="create_by">
        {{ row.account.balance }}
      </el-table-column>
      <el-table-column v-slot="{ row }" label="是否实名" prop="verify_status" sortabl>
        <el-tag :type="row.verify_status === 0 ? 'danger' : 'success'">
          {{ row.verify_status === 0 ? "未实名" : "已实名" }}
        </el-tag>
      </el-table-column>
      <el-table-column align="center" label="注册时间" prop="create_time" width="200"></el-table-column>
      <el-table-column v-slot="{ row }" v-has="`user:index:configSw`" align="center" label="是否启用用户配置" prop="create_time"
        width="200">
        <el-switch v-model="row.config_task_status" :inactive-value="0" :active-value="1" @change="async () => {
          changeConfigTaskStatus(row)
            .then((res) => {
              message.success('操作成功');
            })
            .catch((e) => { })
            .finally(() => {
              attrs.refreshTrigger();
            });
        }
          "></el-switch>
      </el-table-column>
      <!-- <el-table-column v-slot="{ row }" fixed="right" align="center" width="100" label="查看上级" #="{ attrs }">
        <el-button @click=" childDialog(row.id)" type="primary">{{ $t('用户.查看上级') }}</el-button>
      </el-table-column> -->
      <!-- <el-table-column v-slot="{ row }" fixed="right" align="center" width="100" label="查看下级" #="{ attrs }">
        <el-button @click=" parentDialog(row.id)" type="primary">{{ $t('用户.查看下级') }}</el-button>
      </el-table-column> -->
      <el-table-column v-slot="{ row }" fixed="right" align="center" width="140" label="操作" #="{ attrs }">
        <fms-dropdown>
          <el-button>
            更多操作<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-if="permsJudge(`user:index:inset`)" @click="getInsetQuery(row.id, row)">
                <el-button type="primary" text>{{
                  $t("userConfig.inset")
                }}</el-button>
              </el-dropdown-item>
              <el-dropdown-item v-if="permsJudge(`user:index:addTactics`)" @click="appendMember(row)">
                <el-button type="primary" text>{{
                  `追加策略组`
                }}</el-button>
              </el-dropdown-item>
              <!-- <el-dropdown-item v-has="`user:index:addTactics`" @click="openOrderCreateTick(row)">
                <el-button type="primary" text>{{
                  `一键批量生成订单`
                }}</el-button>
              </el-dropdown-item> -->
              <el-dropdown-item v-if="permsJudge(`user:index:userConfig`)" @click="getMemberQuery(row.id, row)">
                <el-button type="primary" text>{{
                  $t("userConfig.userconfig")
                }}</el-button>
              </el-dropdown-item>
              <el-dropdown-item v-if="permsJudge(`user:index:userEdit`)" @click="editUserInfo(row)">
                <el-button type="primary" text>{{
                  $t("userConfig.useredit")
                }}</el-button>
              </el-dropdown-item>
              <el-dropdown-item v-if="permsJudge(`user:index:billInfo`)" @click="getBillQuery(row)">
                <el-button type="primary" text>{{
                  $t("userConfig.billchange")
                }}</el-button>
              </el-dropdown-item>
              <el-dropdown-item v-if="permsJudge(`user:index:resetPw`)" divided @click="
                onMessageBoxDelete(
                  {
                    id: row.id,
                    type: 'login',
                  },
                  () => {
                    // refreshTrigger()
                    // message.success('重置成功')
                  }
                )
                ">
                <el-button text type="danger">重置密码</el-button>
              </el-dropdown-item>
              <el-dropdown-item v-if="permsJudge(`user:index:resetPayPw`)" @click="
                onResetPayPassord(
                  {
                    id: row.id,
                    type: 'pay',
                  },
                  () => {
                    // refreshTrigger()
                    // message.success('重置成功')
                  }
                )
                ">
                <el-button text type="danger">重置支付密码</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>


          </template>
        </fms-dropdown>
      </el-table-column>
    </template>
  </f-table>
</template>
