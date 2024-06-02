
import { DefineComponent, defineComponent, h, ref, provide, watch, Ref } from 'vue';
import TemplateDetail from '@/components/block/TemplateDetail.vue';

interface UseanyDetailComponent extends DefineComponent {
  onSaveChange: (stu?: any, isDetail?: boolean) => Promise<any>;
  onHideChange: () => void;
}

export default function useanyDetail(
  formEntity: any,
  form: DefineComponent,
  title = '',
  isIteration?: boolean,
  _isloading?: boolean
): UseanyDetailComponent {
  const showDetail = ref(false);
  const isForDetail = ref(false);
  const editany = ref<any>();
  let callback: (stu: any) => void;

  const onSaveChange = (stu?: any): Promise<any> => {
    showDetail.value = true;
    editany.value = stu;

    return new Promise((resolve) => {
      callback = resolve;
    });
  };

  const onHideChange = (): void => {
    showDetail.value = false;
  };

  const goodsForm = formEntity;
  const componentData = formEntity;

  const ruleFormRef = ref<any[]>([]);
  provide('ruleFormRef', ruleFormRef);
  provide('isIteration', isIteration);

  watch(goodsForm, (newValue) => {
    console.log(newValue);
    // 在 goodsForm 变化时执行的逻辑
    // 可以在这里进行其他操作，比如调用 onSave 方法等
  });

  const component: UseanyDetailComponent = defineComponent(() => {
    return () =>
      h(
        TemplateDetail,
        {
          title,
          modelValue: showDetail.value,
          'onUpdate:modelValue': (v: boolean) => {
            showDetail.value = v;
          },
          isloading: _isloading,
          'onUpdate:onSaveStatus': (v: boolean) => {
          },
          isForDetail: isForDetail.value,
          isIteration: isIteration,
          editany: editany.value,
          onSave: callback,
          isVm: true,
          formComponent: form,
          formComponentsData: componentData,
        },
        {
          test: () => h(form, { datas: goodsForm }),
        }
      );
  });

  component.open = onSaveChange;
  component.hide = onHideChange;

  return component;
}
