import type { App } from 'vue';

import { hasPerm } from './permission';
import {debounce} from './utils/debounce'
import {setPage} from './utils/pagination'

// 全局注册 directive
export function setupDirective(app: App<Element>) {
  // 使 v-hasPerm 在所有组件中都可用
  app.directive('hasPerm', hasPerm);

  //按钮防抖
  app.directive('dclick', debounce);
  //分页防抖
  app.directive('pchange', setPage);
}
