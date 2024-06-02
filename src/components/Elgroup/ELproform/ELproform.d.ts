import { VueElement } from "vue";


type WidgetComponentsType = 'ui' | 'input' | 'time' | 'daterange' | 'select' | 'date' | 'textarea' | 'autocomlpete' | 'image' | 'radio' | 'input-number' | 'checkbox' | 'switch' | 'upload' | 'upload-button'
type WidgeStatus = 'disebled' | 'edit' | 'preview' | 'hide'
type Options = {
  nameProperty?: string,
  valueProperty?: string,
  path?: string,
  action?: string | ((...args: any[]) => any);
  default: boolean
}
type ListenersType = {
  watch: string[],
  condition: string,
  set: {
    valeu: string
  }
}
type OmitChildType = 'label' | 'key'
type ChildResetType<L, K> = {
  label?: L, key?: K, vm?: any, options?: Options
}
type Child<L, K> = Omit<Widget, OmitChildType> & ChildResetType<L, K>
type RulesTrigger = 'blur' | 'change'
export type RulesType = {
  required: boolean,
  message?: string,
  trigger?: RulesTrigger,
  validator?: (rule: any, value: any, callback: any) => void
}
export type Widget = {
  label: string,
  type: WidgetComponentsType,
  key: string,
  status?: WidgeStatus,
  value?: string,
  options?: any[] | string | Options,
  nameProperty?: string,
  valueProperty?: string,
  path?: string,
  listeners?: ListenersType,
  rules?: RulesType | undefined,
  optionsData?: any[],
  linserve?: {
    watch: string[] | string,
    condition: string | Function,
    set: {
      value: string
    }
  },
  child?: Child<string, string>[]
}
type OptionalLabelWidget = Omit<Widget, "label"> & { label?: string };