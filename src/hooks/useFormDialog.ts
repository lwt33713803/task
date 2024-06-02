
import { DefineComponent, defineComponent, h, provide, ref, watch } from 'vue';
import TemplateDetail from '@/components/block/TemplateDetail.vue';
import { isProxy } from 'vue';
import { isArray } from 'lodash';

interface UseanyDetailComponent extends DefineComponent {
  onSaveChange: (stu?: any, isDetail?: boolean) => Promise<any>;
  onHideChange: () => void;
}

interface options {
  title?: string,
  isloading: boolean,
  isIteration: boolean
}
class DetailComponent {
  private dialogStatus = ref(false); // 是否打开dialog
  private isForDetail = ref(false);
  private editany: Ref<any> | undefined;
  private callback: ((stu: any) => void) | undefined;
  private goodsForm = ref({});
  private componentData = ref({});
  private ruleFormRef = ref<any[]>([]);
  private templateDetailRef = ref<any>(null);
  private _isForm = ref<any>(null);
  public isVm = true
  public component: UseanyDetailComponent;

  constructor(form: DefineComponent, options: { title?: string, isloading?: boolean, isIteration?: boolean, isAction?: boolean, isForm: boolean, isFooter: boolean } = {}) {
    //@ts-ignore
    if (isArray(form)) {
      this.isVm = false
    }
    const { title = '标题', isloading = true, isIteration = false, isAction = true, isForm = true, isFooter = true } = options;
    this._isForm.value = isForm
    this.component = defineComponent(() => {
      return () =>
        h(
          TemplateDetail,
          {
            title,
            ref: this.templateDetailRef,
            modelValue: this.dialogStatus.value,
            'onUpdate:modelValue': (v: boolean) => {
              this.dialogStatus.value = v;
            },
            isAction,
            isloading,
            ruleFormRef: this.ruleFormRef,
            isForDetail: this.isForDetail.value,
            isIteration,
            editany: this.editany?.value,
            onSave: this.callback,
            formComponent: form,
            formComponentsData: this.componentData,
            isVm: this.isVm,
            schema: form,
            isFooter: isFooter,
            isForm: isForm
          },
        );
    });

    this.component.open = this.onSaveChange.bind(this);
    this.component.hide = this.onHideChange.bind(this);
    this.component.instance = this._getComponetInstance.bind(this);


  }
  private isVueInstance(obj: any) {
    if (!obj) { return false }
    return typeof obj.template === 'string' || typeof obj.render === 'function'
  }
  private _getComponetInstance(): void {
    return this.templateDetailRef.value
  }

  public getComponent(): any[] {
    return [this.component];
  }
  public getComponentHook(): [UseanyDetailComponent, (form: any) => void, () => void] {
    return [this.component, this.component.open, this.component.hide];
  }

  private _setComponetInstance(): void {
    return this.templateDetailRef.value
  }

  private onSaveChange(initial: any): Promise<any> {
    // console.log(this.templateDetailRef.value, 'change')
    // if (this._isForm.value) {
    this.templateDetailRef.value.setComponentValue({
      ...initial
    })
    // }
    this.dialogStatus.value = true;



    return new Promise((resolve) => {
      this.callback = resolve;
    });
  }

  private onHideChange(): void {
    this.dialogStatus.value = false;
  }
}

export default DetailComponent;
