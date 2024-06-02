<script lang="ts">
    export default { name: "FmsPagination" };
</script>

<script setup lang="ts">
    const is_disabled:Ref<boolean> = ref(false)
    function changePage(){
        is_disabled.value = true;
        setTimeout(() => {
            is_disabled.value = false;
        }, 300);
    }
</script>

<template>
   <el-pagination :disabled="is_disabled" background prev-text="上一页" next-text="下一页" layout="prev, pager, next, jumper" :total="100" @current-change="changePage" />
</template>

<style lang="scss" scoped>
 .el-pagination{
    :deep(.el-pager){
        li{
            width: 40px;
            height: 38px;
            border-radius: 5px;
            cursor: pointer;
            background-color: #fff;
            &:not(.is-active):hover{
                background-color: rgba(55,125,255,0.1)!important;
                box-shadow: 0px 4px 8px 0px rgba(140,152,164,0.1);
                color: rgba(55,125,255,1);
            }
        }
        li.is-active{
            box-shadow: 0px 4px 8px 0px rgba(55,125,255,0.2);
        }
		li.is-disabled{
           background-color: #fff;
		   color: #000;
        }
        li.is-disabled.is-active{
            background-color: rgba(55,125,255,1)!important;
            color: #fff;
        }
    }
    :deep(button){
        background-color: #fff!important;
        width: 40px;
        height: 38px;
    }
    :deep(.el-pagination__jump){
        height: 38px;
    }
 }
</style>
