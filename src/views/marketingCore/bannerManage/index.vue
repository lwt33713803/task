<script setup lang="ts">
import { getBannerList, delBanner, setStatus } from "@/api/system/banner";
import FormDialog from "./components/FormDialog.vue";
import { useTableDelete } from "@/hooks/useTableDelete";
import { ElMessage, type FormInstance } from "element-plus";
import { ref } from "vue";
const { onDelete, onMessageBoxDelete } = useTableDelete(delBanner, {
  details: "确认删除选中项目",
  type: "error",
});
const formRef = ref();
const pageOrigin = ref<FormInstance | any>();

const handleUpdate = () => {
  pageOrigin.value.refreshTrigger();
};

const switchChange = (row: any) => {
  const { id, status } = row;
  setStatus({ id, status }).then((res: any) => ElMessage.success("切换成功"));
};
//多语言
import useLangsHooks from "../../../hooks/apis/useLangsHooks";
const { optoionLans } = useLangsHooks();
</script>

<template>
  <f-table
    format
    ref="pageOrigin"
    :system-recordloader="getBannerList"
    :is-show-default-btn="false"
    :height="650"
  >
    <template
      #header-action-append-button-gourp="{
        refreshTrigger,
        refreshTriggerAllParams,
        getSelection,
      }"
    >
      <el-button v-has="`marketing:banner:create`" type="primary" @click="formRef.show()">创 建</el-button>
      <el-button
        v-has="`marketing:banner:batchDelete`"
        @click="
          onMessageBoxDelete(
            getSelection()
              .map((i) => i.id)
              .join(','),
            () => {
              refreshTriggerAllParams();
            }
          )
        "
        type="danger"
        >{{ $t("default.deletes") }}</el-button
      >
    </template>
    <template #default="attrs">
      <el-table-column type="selection" />
      <el-table-column label="排序" prop="sort" width="100"></el-table-column>
      <el-table-column v-slot="{ row }" label="图片" prop="image_url">
        <el-image
          class="w-50 h-25 b-1 rd-1 p-1 border-color-gray-300"
          :src="row.image_url"
          fit="contain"
          :preview-teleported="true"
          :preview-src-list="[row.image_url]"
          :hide-on-click-modal="true"
        />
      </el-table-column>
      <el-table-column v-slot="{ row }" label="语言">
        <div class="flex gap-3 flex-wrap">
          <el-tag :type="row.lang_list.includes(lang.value)?'success':'danger'" v-for="lang in optoionLans">
            {{ lang.label }}</el-tag
          >
        </div>
      </el-table-column>
      <el-table-column v-slot="{ row }" label="跳转地址" prop="url">
        <el-link :href="row.url" target="_blank">{{ row.url }}</el-link>
      </el-table-column>
      <el-table-column label="创建时间" prop="create_time" sortable />
      <el-table-column
        v-slot="{ row }"
        fixed="right"
        label="操作"
        #="{ attrs }"
      >
        <el-button v-has="`marketing:banner:edit`" type="primary" @click="formRef.show(row)">编 辑</el-button>
        <el-button  
          v-has="`marketing:banner:delete`"
          type="danger"
          @click="
            onMessageBoxDelete(row.id, () => {
              attrs.refreshTrigger();
            })
          "
          >删 除</el-button
        >
      </el-table-column>
    </template>
  </f-table>

  <!-- Dialog -->
  <FormDialog ref="formRef" @update="handleUpdate" />
</template>

<style scoped lang="scss">
@import "./index.scss";
</style>
