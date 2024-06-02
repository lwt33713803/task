<script setup lang="ts">
import { articleClassify } from "@/interface/searchMap";
import {
  getArticleList,
  delArticle,
  setStatus,
  queryDesc,
} from "@/api/system/article";
import { getLangs } from "@/api/system/signpage";
import FormDialog from "./components/FormDialog.vue";
import { useTableDelete } from "@/hooks/useTableDelete";
import { formatDate } from "@/utils/filterDate";
import type { FormInstance } from "element-plus";

const { onMessageBoxDelete } = useTableDelete(delArticle, {
  details: "确认删除选中项目",
  type: "error",
});
const form_dialog_ref = ref();
const pageOrigin = ref<FormInstance | any>();
const switchChange = (row: any) => {
  const { id, status } = row;
  setStatus({ id, status }).then((res: any) => ElMessage.success("切换成功"));
};

onMounted(async () => {
  await getLangsForSelect();
});

const optoionLans = ref([]);
const currentLang = ref("");
//获取语言信息
const getLangsForSelect = () => {
  getLangs()
    .then((res) => {
      optoionLans.value = res;
      currentLang.value = res.filter((item) => item.is_default == 1)[0].value;
    })
    .catch((err) => {});
};

const editChange = async (item: any) => {
  const data = await queryDesc(item.id,item.lang);
  form_dialog_ref.value.show(data);
};
</script>

<template>
  <f-table
    format
    ref="pageOrigin"
    :systemRecordloader="getArticleList"
    :smartFilter="[articleClassify.title, articleClassify.operator]"
  >
    <template
      #header-action-append-button-gourp="{
        refreshTrigger,
        getSelection,
        refreshTriggerAllParams,
      }"
    >
      <el-button v-has="`system:article:create`" type="primary" @click="form_dialog_ref.show()"
        >创 建</el-button
      >
      <el-button
        v-has="`system:article:batchDelete`"
        type="danger"
        @click="
          onMessageBoxDelete(
            getSelection()
              .map((i) => i.id)
              .join(','),
            () => {
              refreshTriggerAllParams();
            }
          )">{{ $t("default.deletes") }}</el-button
      >
    </template>
    <template #default="attrs">
      <el-table-column type="selection" />
      <el-table-column label="标题" prop="title" />
      <el-table-column
        v-slot="{ row }"
        label="操作人"
        prop="update_by.username"
      >
        <el-tag>{{ row.update_by.username }}</el-tag>
      </el-table-column>
      <el-table-column v-slot="{ row }" label="启用语言">
        {{
          row.lang_list
            .map((res: any) => {
              return optoionLans.filter((item) => item?.value == res)[0]?.label;
            })
            .toString()
        }}
      </el-table-column>
      <el-table-column v-slot="{ row }" label="生效时间">
        {{ formatDate(row.effective_time) }}
      </el-table-column>
      <el-table-column label="操作时间" prop="create_time" />
      <el-table-column
        v-slot="{ row }"
        fixed="right"
        label="操作"
        #="{ attrs }"
      >
        <el-button v-has="`system:article:edit`" type="primary" @click="editChange(row)">编 辑</el-button>
        <el-button
          v-has="`system:article:delete`"
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

  <!-- create Dialog -->
  <FormDialog ref="form_dialog_ref" @update="pageOrigin.refreshTrigger()" />
</template>

<style scoped lang="scss">
.crated-form {
  padding: 0 4rem;
  box-sizing: border-box;
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
  margin-right: 1rem;
  width: 15%;
}

:deep(.el-overlay-dialog) {
  overflow: hidden !important;
}

.ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tool-tip {
  width: 400px !important;
}

:deep(.w-e-text-container) {
  img {
    max-width: 100%;
  }

  video {
    max-width: 100%;
  }
}
</style>
