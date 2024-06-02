

<template>
  <el-input size="small" v-bind="{ ...$attrs, ...TableConfig }" v-model="result" :type="typeInputEnum[props.inputType]"
    placeholder="请输入" @input="inputChange">
    <template v-for="(item, key, index) in $slots" :key="index" #[key]>
      <slot :name="key"></slot>
    </template>
  </el-input>
</template>
<script lang="ts">
export default { name: "FmsInput" };
export enum typeInputEnum {
  "password",
  "text",
  "number",
}
</script>

<script setup lang="ts">
const result: Ref<string> = ref("");
const props = withDefaults(
  defineProps<{
    inputType?: typeInputEnum;
    title?: string;
  }>(),
  {
    inputType: typeInputEnum.text,
    title: "",
  }
);
interface EmitType {
  (e: "inputHandle", params: { value: string; title: string }): void;
}
const emit = defineEmits<EmitType>();
const inputChange = (value: any) => {
  const { title } = props;
  emit("inputHandle", { value, title });
};
</script>

<style lang="scss" scoped>
:deep(.el-input__wrapper) {
  border-radius: 5px;
  max-width: 150px !important;
  border: 1px solid rgba(231, 234, 243, 0.7);
  box-shadow: 0px 0px 0px 0px rgba(140, 152, 164, 0.15);
  transition: box-shadow 0.15s ease-in-out;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0px 0px 10px 0px rgba(140, 152, 164, 0.15);
  border: 1px solid rgba(231, 234, 243, 0.7);
  background: #ffffff;
  transition: box-shadow 0.15s ease-in-out;
}

:deep(.el-input__inner) {
  height: 42px;
}
</style>
