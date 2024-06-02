<template>
  <f-table ref="pageOrigin" :systemRecordloader="getUserCommissions">
    <template #default="attrs">
      <el-table-column v-slot="{ $index }" label="编号" sortable>
        {{ $index + 1 }}</el-table-column
      >
      <el-table-column label="分润名称" prop="name"></el-table-column>

      <el-table-column v-slot="{ row }" label="分润比例" prop="ratio_info">
        <div class="grid grid-cols-2 gap-5 color-gray-500 text-2 font-bold">
          <template v-for="radio in row.ratio_info">
            <span
              class="b-1 border-color-gray-200 text-center h-10 lh-10 rd-1"
              >{{ radio.name }}</span
            >
            <span class="b-1 border-color-gray-200 text-center h-10 lh-10 rd-1"
              >{{ radio.ratio }}(%)</span
            >
          </template>
        </div>
      </el-table-column>
      <el-table-column v-slot="{ row }" label="操作人" prop="update_by">
        <el-tag>{{ row.update_by }}</el-tag>
      </el-table-column>
      <el-table-column label="操作时间" prop="update_time"> </el-table-column>
      <el-table-column
        v-slot="{ row }"
        fixed="right"
        width="200"
        label="操作"
        #="{ attrs }"
      >
        <el-button v-has="`system:shareProfit:edit`" type="primary" @click="handleEdit(row)">编辑</el-button>
      </el-table-column>
    </template>
  </f-table>

  <!-- create Dialog -->
  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="30%"
    class="!rounded-2xl custom-dialog"
    :before-close="closeChange"
  >
    <div class="crated-form">
      <el-form ref="ruleFormRef" :model="dialogForm" label-position="left">
        <fmsFormItem label="分润名称:" prop="name">
          <fmsInput
            v-model="dialogForm.name"
            placeholder=""
            disabled
            style="width: 90%"
          />
        </fmsFormItem>
        <fmsFormItem label="分润比例:" prop="ratio_info">
          <el-table TableConfig :data="ratio_info" table-layout="fixed">
            <el-table-column prop="name" label="代理等级"> </el-table-column>
            <el-table-column prop="ratio" label="比例">
              <template #default="{ row }">
                <fmsInput v-model="row.ratio" placeholder="请输入" />
              </template>
            </el-table-column>
            <!-- <el-table-column fixed="right" label="操作" width="120">
              <template #default="{ row }">
                <el-button type="primary" size="small" @click="edit(row)"
                  >编辑</el-button
                >
              </template>
            </el-table-column> -->
          </el-table>
        </fmsFormItem>
      </el-form>
      <div class="icon_fx">
        <el-icon style="font-size: 25px; margin-right: 10px" @click="addagent">
          <CirclePlusFilled />
        </el-icon>
        <el-icon :size="25" @click="reduceRule">
          <RemoveFilled />
        </el-icon>
      </div>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeChange">取 消</el-button>
        <el-button type="primary" @click="handleConfirm(ruleFormRef)"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { getUserCommissions, divideCommissionedit } from "@/api/user/index";
import type { FormInstance } from "element-plus";
import { resetObject } from "@/utils/reset";

const dialogTitle: Ref<string> = ref("编辑");
const dialogVisible: Ref<boolean> = ref(false);
const ruleFormRef = ref();
const pageOrigin = ref();
const ratio_info = ref([]);
const ids = ref();
const dialogForm = reactive({
  ids: "",
  name: "",
});
let data = reactive({});
const reduceRule = () => {
  if (ratio_info.value.length > 1) {
    ratio_info.value.splice(ratio_info.value.length - 1, 1);
  } else {
    return;
  }
};
const closeChange = () => {
  resetObject(dialogForm);
  ratio_info.value = [];
  dialogVisible.value = false;
};
const handleConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (!valid) return;

    const obj = {
      id: ids.value,
      ratio_info: JSON.stringify(ratio_info.value),
    };

    divideCommissionedit(obj)
      .then((res: any) => {
        console.log("res", res);
        if (res.code == 1) {
          ElMessage.success(`修改成功`);
          dialogVisible.value = false;
          pageOrigin.value.refreshTrigger();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const handleEdit = (row: any | undefined) => {
  ids.value = row.id;
  dialogForm.name = row.name;
  ratio_info.value = [...row.ratio_info];
  dialogVisible.value = true;
};

const addagent = () => {
  ratio_info.value.push({
    name: ratio_info.value[ratio_info.value.length - 1].name
      ? +ratio_info.value[ratio_info.value.length - 1].name + 1
      : 1,
    ratio: "",
  });
};
</script>
<style lang="scss" scoped>
.order-sn {
  white-space: nowrap;
}

.goods-name {
  width: 200px;
  height: 64px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
}

.el-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

:deep(.el-form-item__content) {
  width: 70%;
}

:deep(.el-form-item__label) {
  text-align: right;
  margin-bottom: 0 !important;
  // margin-right: 1rem;
  width: 10%;
}

:deep .el-form-item__content {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap !important;

  .el-table {
    flex: 1;
  }
}

.icon_fx {
  text-align: right;
}

.ratio_wrap:last-child {
  border-bottom: none;
}
</style>
