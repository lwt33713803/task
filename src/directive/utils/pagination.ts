import { Directive, DirectiveBinding } from 'vue';

/**
 * 按钮防抖
 */
export const setPage: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {

      let timer:any = null;

      el.addEventListener('current-change', () => {
        console.log('1111');
      })
  }
};


