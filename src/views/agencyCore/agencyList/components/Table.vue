<template>
  <div class="m-user-table">
    <div class="header">
      <el-form-item :label="$t(`tactics.username`)" prop="username">
        <el-input v-model="form.username" :placeholder="$t(`placeholder_input`) + $t(`table.username`)" />
      </el-form-item>
      <el-form-item :label="$t(`status`)" prop="status">
        <fms-select v-model="form.status" :placeholder="$t(`placeholder_select`)" :options="dictMap[`启用/禁用`]" :key-name="`dict_label`"
          :val-name="`dict_value`" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleGetAgencyList(form)" :icon="Search">{{ $t(`budget.search`) }}</el-button>
        <el-button @click="reset">{{ $t(`budget.refresh`) }}</el-button>
      </el-form-item>
    </div>
    <div class="footer">
      <div class="util">
        <el-button
            v-has="`agency:index:create`"
            type="primary" @click="child_agency_ref.show()"><el-icon size="14"
            style="margin-right: 0.25rem"><el-icon-plus /></el-icon>{{ $t(`agency.create_agency`) }}</el-button>
      </div>
      <div class="table-inner">
        <el-table TableConfig v-loading="LOADING" :data="table_data" style="width: 100%; height: 100%" border
          :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }" stripe
          :element-loading-text="`${$t('loading_text')}...`" :element-loading-svg="svg">
          <el-table-column v-slot="{ $index }" :label="$t(`id`)" width="80">
            {{ $index + 1 }}
          </el-table-column>
          <el-table-column prop="id" :label="$t('agency.agency_id')" />
          <el-table-column prop="username" :label="$t(`tactics.username`)"/>
          <el-table-column prop="invite_code" :label="$t(`agency.extension_code`)"/>
          <el-table-column v-slot="{ row }" label="推广链接">
            <el-link @click="copyChange(row.invite_info.url)">{{ row.invite_info.url }}</el-link>
          </el-table-column>
          <el-table-column v-slot="{ row }" v-has="`agency:index:status`" :label="$t(`status`)">
            <el-switch v-model="row.status" :inactive-value="0" :active-value="1" @change="switchChange(row)" />
          </el-table-column>
          <el-table-column prop=" operator" :label="$t(`backlogCore.operation`)" fixed="right" width="250">
            <template #default="scope">
              <el-button v-has="`agency:index:edit`" type="primary" size="small" @click="child_agency_ref.show(scope.row)">
                {{ $t(`default.edit`) }}
              </el-button>
              <el-button  v-has="`agency:index:delete`" @click="del_dialog_ref.show(scope.row, `child`)" type="danger" size="small">
                {{ $t(`default.delete`) }}
              </el-button>
              <el-button  v-has="`agency:index:resetPw`" @click="resetPass(scope.row)" type="warning" size="small">
                {{ $t(`agency.reset_password`) }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <div class="flex justify-between items-center width-100">
          <div class="ml-3">
            <el-pagination layout="sizes,slot" class="my-6 float-right ml-1"
              :current-page="page_index" :page-size="page_size" background :hide-on-single-page="false" :total="total"
              @size-change="handleSizeChange" @current-change="handleCurrentChange">
              <div class="text-[#667788] ml-2">
                共 {{ total || 0 }} 条记录
              </div>
            </el-pagination>
          </div>
          <el-pagination layout=" prev, pager, next, jumper" class="my-6 float-right ml-1"
            :current-page="page_index" :page-size="page_size" background :hide-on-single-page="false" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>

    <ChildAgencyDialog ref="child_agency_ref" @up-data="handleGetAgencyList(form)" />
    <DelDialog ref="del_dialog_ref" @up-data="handleGetAgencyList(form)" />
  </div>
</template>
<script lang="ts" setup>
import { ElMessageBox, ElMessage, FormInstance } from "element-plus";
import Clipboard from 'clipboard';
import { Search } from "@element-plus/icons-vue";
import { getAgencyList, resetPassWord, setStatus } from "@/api/agency/index";
import ChildAgencyDialog from "./ChildAgencyDialog.vue";
import DelDialog from "./DelDialog.vue";
const child_agency_ref = ref();
const del_dialog_ref = ref();
const table_data = ref([]);
const total = ref<number>(0);
const LOADING = ref(false);
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
const form = reactive({
  username: "",
  status: undefined,
  all: 0,
  page: 1,
  list_rows: 10,
  group_id: undefined,
});

const page_index = ref()
const page_size = ref([10, 20, 30, 40, 50, 60])


const reset = () => {
  form.username = "";
  form.status = undefined;
  form.page = 1;
  form.list_rows = 10;
  handleGetAgencyList(form);
};

const getList = async (data: any) => {
  const { id: group_id } = data;
  form.group_id = group_id;
  handleGetAgencyList(form);
};

const resetPass = (row: any) => {
  const { id } = row;
  ElMessageBox.confirm("你确定要重置当前密码?", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    draggable: true,
  })
    .then(() => {
      handleRestPass(id);
    })
    .catch(() => { });
};

const handleRestPass = (id: number) => {
  resetPassWord(id).then(({ code }) => {
    if (code === 1) return ElMessage.success("成功重置密码");
  });
};

const handleGetAgencyList = (params: any) => {
  LOADING.value = true;
  getAgencyList({ ...params }).then((res: any) => {
    table_data.value = res.data;
    total.value = res.total;
    LOADING.value = false;
  });
};

const handleCurrentChange = (val: number) => {
  form.page = val;
  handleGetAgencyList(form);
};

const handleSizeChange = (val: number) => {
  form.list_rows = val;
  handleGetAgencyList(form);
}

const handleUpdate = () => {
  handleGetAgencyList(form);
};

const switchChange = (row: any) => {
  const { id, status } = row;
  setStatus({ id, status }).then((res) => ElMessage.success("切换成功"));
};

const copyChange = (url:string) => {
  Clipboard.copy(url);
  return ElMessage.success("成功复制～")
}

defineExpose({
  getList,
});
</script>
<style lang="scss" scoped>
@import "../index";

.m-user-table {
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  width: calc(100% - 230px);

  .header {
    display: flex;
    justify-content: space-between;
  }

  .footer {
    flex: 1;
    display: flex;
    padding: 16px;
    flex-direction: column;
    border-radius: 4px;
    overflow: hidden;
    background: white;
    box-shadow: 0 0 12px rgb(0 0 0 / 5%);
    position: relative;
    box-sizing: border-box;

    .util {
      margin-bottom: 15px;
      display: flex;
      justify-content: flex-end;
      flex-shrink: 0;
    }

    .table-inner {
      flex: 1;
      position: relative;
      overflow: auto;
    }

    .table {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  .pagination {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
    box-sizing: border-box;
    flex-shrink: 0;
  }
}

.width-100 {
  width: 100%;
}
</style>
