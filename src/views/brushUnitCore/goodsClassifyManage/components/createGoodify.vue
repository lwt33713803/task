
<script setup lang="ts">
import { FormInstance } from "element-plus";
import type { PropType } from "vue";
import { inject, ref, watch } from "vue";
const props = defineProps({
  isForDetail: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "save"]);
const goodsForm = inject("goodsForm");
const ruleFormRef = inject("ruleFormRef") as FormInstance;

function doSave() {
  emit("save", goodsForm);
  // emit('update:modelValue', false)
}
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    console.log(formEl);
    if (valid) {
      doSave();
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<template>
  <el-dialog append-to-body width="500px" title="分类设置" v-bind="$attrs">
    <slot name="test"> </slot>

    <template #footer>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        保存
      </el-button>
      <el-button type="primary" plain @click="emit('update:modelValue', false)">
        取消
      </el-button>
    </template>
  </el-dialog>
</template>
