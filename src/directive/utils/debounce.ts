import { Directive, DirectiveBinding } from 'vue';

/**
 * 按钮防抖
 */
export const debounce: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {

      let timer:any = null;

      el.addEventListener('click', () => {
      let firstClick: Boolean = !timer;
      if (firstClick) {
        binding.value()
      }

      if (timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(() => {
        timer = null
        if (!firstClick) {
          binding.value()
        }
      }, 1000);
    })
  }
};


