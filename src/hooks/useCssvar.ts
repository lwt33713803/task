

/**
 * Remove  查找某个css变量并替换，在组件卸载的时候还原该值
 *
 * @example
 * 
 * 组件卸载改变值
 * 
 * useCssvar('--element-bg','#ffffff')
 * 
 * @example
 * 
 * 组件卸载不改变值
 * 
 *  useCssvar('--text-bg','#ffffff',false)
 *
 * @param 第一个参数定义查询字段
 * @param 返回参数定义查询方法
 * 
 */
import { onMounted, onUnmounted } from 'vue';

export default (variable: string, value: string, isReduction: boolean = true): void => {
  const originalValue = document.documentElement.style.getPropertyValue(variable);

  onMounted(() => {
    document.documentElement.style.setProperty(variable, value);
  });

  onUnmounted(() => {
    return isReduction && document.documentElement.style.setProperty(variable, originalValue);
  });

}