<template>
  <el-card class="m-dept-side">
    <el-button v-has="`agency:index:groupCreate`" class="create" type="primary" @click="createAgency"
      ><el-icon size="14" style="margin-right: 0.25rem"
        ><el-icon-plus /></el-icon
      >{{ $t(`agency.create_agency_group`) }}</el-button
    >
    <div class="filter-tree">
      <el-scrollbar class="scrollbar">
        <el-tree
          ref="tree_ref"
          :data="table_data"
          :props="defaultProps"
          icon-class="none"
          default-expand-all
          :expand-on-click-node="false"
        >
          <template #default="{ node, data }">
            <div
              class="node-wrap"
              :class="[node.data.id === select_id ? 'active' : '']"
              @click="selectChange(node, data)"
            >
              <span class="node-left">{{ node.label }}</span>
              <div v-if="data.id" class="node-right">
                <el-tag v-if="node.data.status === 0" type="warning"
                  >{{ $t(`agency.block_up`) }}</el-tag
                >
                <el-tag v-else type="success">{{ $t(`agency.normal`) }}</el-tag>
                <span class="node-btn">
                  <span v-has="`agency:index:groupEdit`" @click.stop="agency_dialog_ref.show(data)">{{ $t(`agency.edit`) }}</span>
                  <el-divider direction="vertical" />
                  <span v-has="`agency:index:groupDel`" @click.stop="del_dialog_ref.show(data)">{{ $t(`agency.del`) }}</span>
                </span>
              </div>
            </div>
          </template>
        </el-tree>
      </el-scrollbar>
    </div>
    <AgencyDialog ref="agency_dialog_ref" @up-data="initList" />
  </el-card>

  <!-- del -->
  <DelDialog ref="del_dialog_ref" @up-data="initList" />
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import { ElTree } from "element-plus";
import AgencyDialog from "./AgencyDialog.vue";
import DelDialog from "./DelDialog.vue";
import { getAgencyGroupList } from "@/api/agency/index";

const emit = defineEmits(["change"]);

const table_data = ref<any[]>([]);
const agency_dialog_ref = ref();
const del_dialog_ref = ref();
const select_id = ref();

const tree_ref = ref<InstanceType<typeof ElTree>>();

const defaultProps = {
  children: "children",
  label: "group_name",
  value: "id",
};

const initList = async () => {
  let data = await getAgencyGroupList();
  data.unshift({
    group_name: "全部",
    id: "",
  });
  table_data.value = data;
  const { id } = table_data.value[0];
  select_id.value = id;
  emit("change", table_data.value[0]);
};

const createAgency = () => {
  agency_dialog_ref.value.show();
};

const selectChange = (node: any, data: any) => {
  const { id } = node.data;
  select_id.value = id;
  emit("change", data);
};

onBeforeMount(async () => {
  initList();
});
</script>

<style lang="scss" scoped>
@import "../index.scss";

:deep(.el-tree-node__content) {
  height: auto;
}
</style>
