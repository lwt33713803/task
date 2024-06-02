
/**
 * 智能过滤器的输入
 */
type InputType = 'date' | 'autoComplete' | 'input' | 'select'

export interface SmartFilterInput {
  /**
   * 搜索方法
   */
  scheme: string;

  /**
   * 显示的标题
   */
  title: string;

  /**
   * 最少要多少个字符才能搜索
   */
  mixText: number;

  /**
   * 提示语
   */
  placeholder?: string;
  /**
   * 类型
   */
  type: InputType
  /**
   * 类型
   */
  value?: string | number
}
interface actionObjectbranch {

}
interface optionInteface {
  action?: string | actionObjectbranch | ((...args: any[]) => any);

}
/**
 * 过滤器远程搜索
 */

export interface SmartFilterInputOriginSelect extends SmartFilterInput {
  originRequest: () => Promise<void> | any
}
export interface SmartFilterInputSelect extends SmartFilterInput {
  options?: optionInteface | any[] | string,
  nameProperty?: string,
  valueProperty?: string,
  path?: string
}
export interface SmartFilterInputDate extends SmartFilterInput {

}

export type SmartFilterParams = Record<string, string | number | boolean>;