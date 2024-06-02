<template>
    <el-dialog v-model="SHOW_FLAG" :title="$t('default.delete')" width="30%" class="!rounded-2xl custom-dialog" @close="close">
        <div style="display: flex; align-items: center; justify-content: center;">
            {{ $t(`agency.del_title`) }}：
            <el-select-v2 v-model="del_form.new_agent_id" filterable :options="user_opt" :placeholder="$t(`placeholder_select`)" />
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" :disabled="!LOADING && !del_form.new_agent_id" @click="delConfirm">{{ $t('default.delete') }}</el-button>
                <el-button @click="close">{{ $t('default.cancel') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { getAgencyGroupList, getAgencyList, delAgencyGroupList, delAgencyList } from '@/api/agency/index';
const emit = defineEmits(['upData']);
const SHOW_FLAG = ref<boolean>(false);
const LOADING = ref<boolean>(false);
const user_opt = ref<any[]>([]);
const page_type = ref<any>('');
const del_form = reactive({
    id: undefined,
    new_agent_id: undefined
})


const show = (item: any, type: string) => {
    console.log(`item`, item)
    del_form.id = item.id;
    page_type.value = type;
    SHOW_FLAG.value = true;
    LOADING.value = true;
    type === 'child' ? handleList(item.id, item.group_id) : handleList(item.id)
}

// const handleGroupList = (id: number | string) => {
//     getAgencyGroupList().then((data) => {
//         const result = data.map((item: any) => {
//             return {
//                 label: item.group_name,
//                 value: item.id
//             }
//         })
//         // 删除 -》 不包括当前ID项
//         user_opt.value = result.filter((obj: any) => obj.value !== id);
//         LOADING.value = false;
//     })
// }

const handleList = (id: number | string, group_id?: number | undefined) => {
    console.log(`group_id`, group_id)
    getAgencyList({ all: 1, group_id }).then((data) => {
        const result = data.map((item: any) => {
            return {
                label: item.username,
                value: item.id
            }
        })
        // 删除 -》 不包括当前ID项
        user_opt.value = result.filter((obj: any) => obj.value !== id);
        LOADING.value = false;
    })
}

const delConfirm = () => {
    page_type.value === 'child' ? delItem() : delGroupItem()
}

const delGroupItem = () => {
    return delAgencyGroupList(del_form).then(({ code }) => {
        ElMessage.success('删除成功')
        close()
        emit('upData')
    })
}


const delItem = () => {
    return delAgencyList(del_form).then(({ code }) => {
        ElMessage.success('删除成功')
        close()
        emit('upData')
    })
}



const close = () => {
    SHOW_FLAG.value = false;
    page_type.value = ''
    Object.keys(del_form).forEach(key => del_form[key] = undefined);
    console.log('del_form', del_form)
}

defineExpose({
    show,
})

</script>