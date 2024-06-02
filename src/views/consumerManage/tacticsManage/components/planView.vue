<template>
  <el-dialog v-model="SHOW_FLAG" width="70%" class="!rounded-2xl custom-dialog" title="查看计划">
    <el-table TableConfig v-loading="LOADING" :data="list" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column :label="$t('order_id')" prop="index" />
      <el-table-column v-slot="{ row }" :label="$t('mode')">
        {{ row.mode_type === "default" ? $t('default_mode') : $t('overlay_mode') }}
      </el-table-column>
      <el-table-column v-slot="{ row }" :label="$t('tactics.matching_mode')">
        {{ row.balance_search_type === "amount" ? $t('fixed_amount') : $t('percentage') }}
      </el-table-column>
      <el-table-column :label="$t('matching_val')" prop="balance_search_value" />
      <el-table-column v-slot="{ row }" :label="$t('settle_mode')">
        {{ row.commission_settle_type === "amount" ? $t('fixed_amount') : $t('percentage')}}
      </el-table-column>
      <el-table-column :label="$t('settle_val')" prop="commission_settle_value" />
      <el-table-column :label="$t('change_gender')" prop="trigger_level_name" />
      <el-table-column :label="$t('change_strategy_group')" prop="trigger_group_name" />
      <el-table-column v-slot="{ row }" :label="$t('change_image')" prop="image">
        <span v-if="!row.image_url"></span>
        <el-image v-else :src="row.image_url" :preview-teleported="true" :preview-src-list="[row.image_url]"></el-image>
      </el-table-column>
      <el-table-column v-slot="{ row }" :label="$t('freeze_money')" prop="freeze_order">
        {{ row.freeze_order === 0 ?  $t('not_freeze') : $t('use_freeze')  }}
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
import { getTacticsInfo } from "@/api/goods/index";
const SHOW_FLAG = ref<boolean>(false);
const LOADING = ref<boolean>(false);
const list = ref<any[]>([]);

const show = (id: number) => {
  console.log(id);
  LOADING.value = true;
  SHOW_FLAG.value = true;
  getTacticsInfo({ group_id: id }).then(({ data }) => {
    list.value = data;
    LOADING.value = false;
  });
};

defineExpose({
  show,
});
</script>
