<template>
  <f-table ref="pageOrigin" :smartFilter="[noticeClassify.title, noticeClassify.operator]"
    :system-recordloader="getNoticeList">
    <template #header-action-append-button-gourp="{ refreshTrigger,getSelection,refreshTriggerAllParams }">
      <el-button v-has="`system:messageNotice:create`" type="primary" @click="form_dialog_ref.show()">创 建</el-button>
      <el-button 
        v-has="`system:messageNotice:batchDelete`"
        type="danger"
        @click="onMessageBoxDelete(getSelection().map((i) => i.id).join(','), () => {
        refreshTriggerAllParams()
      })">{{ $t('default.deletes') }}</el-button>
    </template>
    <template #default="attrs">
      <el-table-column type="selection" />
      <el-table-column label="消息名称" prop="title" width="150" />
      <el-table-column v-slot="{ row }" label="消息内容" width="400">
        <el-popover :content="row.content" :width="300" placement="bottom-end" trigger="hover" effect="dark">
          <template #reference>
            <div class="ellipsis">{{ row.content }}</div>
          </template>
        </el-popover>
      </el-table-column>
      <el-table-column v-slot="{ row }" label="接收人" width="150" align="center">
        <el-button round @click="userViewRef.show(row.id)">查看接收人</el-button>
      </el-table-column>
      <el-table-column v-slot="{ row }" label="操作人" width="120">
        <el-tag>{{ row.admin_name }}</el-tag>
      </el-table-column>
      <el-table-column v-slot="{ row }" label="消息类型" width="150">
        <el-text type="success" style="font-weight: 600;">{{ row.type_text }}</el-text>
      </el-table-column>
      <el-table-column v-slot="{ row }" v-has="`system:messageNotice:status`" label="状态" prop="status" width="120">
        <el-switch v-model="row.status" :inactive-value="0" :active-value="1" @change="switchChange(row)" />
      </el-table-column>
      <el-table-column v-slot="{ row }" label="生效时间" prop="send_time" width="180">
        {{ formatDate(row.send_time) }}
      </el-table-column>
      <el-table-column label="操作时间" prop="update_time" width="180" />
      <el-table-column v-slot="{ row }" fixed="right" label="操作" #="{attrs}" width="200">
        <el-button v-has="`system:messageNotice:edit`" type="primary" @click="form_dialog_ref.show(row)">编 辑</el-button>
        <el-button 
          v-has="`system:messageNotice:delete`"
          type="danger" @click="onMessageBoxDelete(row.id, () => {
          attrs.refreshTrigger()
        })">删 除</el-button>
      </el-table-column>
    </template>
  </f-table>

  <!-- create Dialog -->
  <form-dialog ref="form_dialog_ref" @up-data="pageOrigin.refreshTrigger()"/>


  <!-- 查看接收人 -->
  <user-view ref="userViewRef" />
</template>


<script setup lang="ts">
import { getNoticeList, delNotice, setStatus } from '@/api/system/notice';
import { noticeClassify } from '@/interface/searchMap'
import { useTableSelection } from '@/hooks/useTableSelect';
import { useTableDelete } from '@/hooks/useTableDelete';
import { formatDate } from "@/utils/filterDate";
import type { FormInstance } from 'element-plus';

import userView from "./components/userView.vue";
import FormDialog from "./components/FormDialog.vue";


const { onDelete, onMessageBoxDelete } = useTableDelete(delNotice, { details: '确认删除选中项目', type: 'error' })
const form_dialog_ref = ref()
const pageOrigin = ref<FormInstance | any>();
const userViewRef = ref()



const switchChange = (row: any) => {
  const { id, status } = row;
  setStatus({ id, status }).then((res: any) => ElMessage.success('切换成功'))
}

</script>

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

.dialog-footer {
  text-align: center;
}

._pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: .8rem 0 1.2rem;
}


:deep(.el-form-item__content) {
  width: 70%;
}

:deep(.el-form-item__label) {
  text-align: right !important;
  margin-bottom: 0 !important;
  margin-right: 1rem;
  width: 18%;
}

.ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
