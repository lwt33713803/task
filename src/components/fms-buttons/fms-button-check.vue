<!-- 查看 -->
<template>
  <el-dialog
    v-model="dialogVisible"
    :before-close="handleClose"
    v-bind="$attrs"
    width="70%"
  >
    <div class="tables-container">
      <fmsTable
        :data="props.checkData"
        :pagination-flag="false"
        :search-flag="false"
      >
        <fmsTableColumn
          prop="title"
          label="消息标题"
          width="140"
        ></fmsTableColumn>
        <fmsTableColumn
          prop="message_type"
          label="消息类型"
          width="100"
        ></fmsTableColumn>
        <fmsTableColumn
          prop="message_content"
          label="消息内容"
          width="130"
        ></fmsTableColumn>
        <fmsTableColumn
          prop="message_aims"
          label="接收人"
          width="140"
        ></fmsTableColumn>
        <fmsTableColumn
          prop="send_time"
          label="生效时间"
          width="180"
        ></fmsTableColumn>
        <fmsTableColumn prop="status" label="状态" width="140"></fmsTableColumn>
        <fmsTableColumn
          prop="operation_member"
          label="操作人"
          width="120"
        ></fmsTableColumn>
        <fmsTableColumn
          prop="operation_time"
          label="操作时间"
          width="150"
        ></fmsTableColumn>
        <fmsTableColumn
          prop="annexes"
          label="附件"
          width="180"
        ></fmsTableColumn>
      </fmsTable>
    </div>

    <template #header>
      <span>查看信息</span>
    </template>

    <template #footer>
      <el-button hover:color-black @click="actionCancel">
        {{ props.buttonCancel }}
      </el-button>
      <el-button bg-red color-white hover:color-black @click="actionConfirm">
        {{ props.buttonConfirm }}
      </el-button>
    </template>

    <template v-for="(item, key, index) in $slots" :key="index" #[key]>
      <slot :name="key"></slot>
    </template>
  </el-dialog>
  <fmsButton v-dclick="click" class="button-check">
    {{ props.buttonTitle }}
  </fmsButton>
</template>
<script lang="ts">
export default { name: "FmsButtonCheck" };
</script>

<script setup lang="ts">
import fmsButton from "./fms-button.vue";
import { useDebounceFn } from "@vueuse/core";
const emit = defineEmits(["actionCancel", "actionConfirm"]);
const dialogVisible: Ref<boolean> = ref(false);
const click = () => {
  dialogVisible.value = true;
  console.log("查看详情按钮点击");
};

const props = withDefaults(
  defineProps<{
    buttonTitle?: string;
    buttonConfirm?: string;
    buttonCancel?: string;
    checkData: number[];
  }>(),
  {
    buttonTitle: "查看",
    buttonConfirm: "确认",
    buttonCancel: "取消",
  }
);

const actionCancel = useDebounceFn(
  () => {
    handleClose();
    emit("actionCancel");
  },
  500,
  { maxWait: 5000 }
);

const actionConfirm = useDebounceFn(
  () => {
    handleClose();
    emit("actionConfirm");
  },
  500,
  { maxWait: 5000 }
);

const handleClose = () => {
  dialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
.button-check {
  margin: 0;
}
rect {
  width: 100px;
  height: 40px;
  fill: gold;
  transition: fill 0.3s linear, width 0.5s linear;
}
rect:hover {
  fill: red;
  width: 120px;
}
#rect1 {
  fill: url(#Gradient1);
}
.stop1 {
  stop-color: red;
}
.stop2 {
  stop-color: black;
  stop-opacity: 0;
}
.stop3 {
  stop-color: blue;
}
</style>
