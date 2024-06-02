
import { defineComponent, h, ref } from "vue";
import anyDetail from "./createGoodify.vue";
import form from "./form.vue";
export default function useanyDetail(formEntity: any) {
  const showDetail = ref(false);
  const isForDetail = ref(false);
  const editany = ref<any>();
  let callback: (stu: any) => void;

  const onSaveChange = (stu?: any, isDetail = false): Promise<any> => {
    showDetail.value = true;
    editany.value = stu;
    isForDetail.value = isDetail;

    return new Promise((resolve) => {
      callback = resolve;
    });
  };
  const onHideChange = () => (showDetail.value = false);
  const goodsForm = formEntity;
  const ruleFormRef = ref(null);
  provide("goodsForm", goodsForm);
  provide("ruleFormRef", ruleFormRef);
  watch(goodsForm, (newValue) => {
    // 在 goodsForm 变化时执行的逻辑
    // 可以在这里进行其他操作，比如调用 onSave 方法等
    console.log(1);
    console.log(newValue);
  });

  const component = defineComponent(() => {
    return () =>
      h(
        anyDetail,
        {
          modelValue: showDetail.value,
          "onUpdate:modelValue": (v: boolean) => (showDetail.value = v),
          isForDetail: isForDetail.value,
          editany: editany.value,
          onSave: callback,
        },
        { test: () => h(form, { goodsForm }) }
      );
  });

  component.onSaveChange = onSaveChange;
  component.onHideChange = onHideChange;
  return component;
}
