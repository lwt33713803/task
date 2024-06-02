

import { Ref, ref } from "vue";

export const refHaveValue = <T>(value: T): Ref<T> => {
  const refHolder: Ref<T | undefined> = ref<T | undefined>();
  refHolder.value = value;
  //TODO 这个方法，用于代替，vue3 的 export declare function ref<T = any>(): Ref<T | undefined>;
  return refHolder as Ref<T>;
};
/**
 * 响应式获取变量
 * @param query
 * @param loadRightNow
 * @return [blockList, loader, listNullable, loading] blockList: 一直有值的列表  loader 是加载hook   ，listNullable: 未来的值，loading: 是否正在加载
 */
export const refListVariableLoader = <T>(query: () => Promise<T[]>, loadRightNow?: (error: unknown) => void, wrapper?: (val: any) => any): [Ref<T[]>, () => Promise<T[]>, Ref<T[] | undefined>, Ref<boolean>] => {
  //TODO 这里不太确定是undefined 还是 ref<null,[]> 具体情况业务决定
  const listNullable: Ref<T[] | undefined> = ref<T[] | undefined>();
  const blockList: Ref<T[]> = refHaveValue<T[]>([]);
  const loading: Ref<boolean> = ref(false);
  const loader = async () => {
    listNullable.value = undefined;
    loading.value = true;
    blockList.value = [];
    const resultPromise = query();
    //TODO 这里记一下 更好的处理方式 await 
    listNullable.value = await resultPromise;
    blockList.value = listNullable.value;
    return resultPromise;
  };
  if (loadRightNow) {
    loader()
      .catch(loadRightNow)
      .finally(() => (loading.value = false));
  }
  return [blockList, loader, listNullable, loading];
};

export const refListFncLoader = async <T>(query: () => Promise<T[]>, wrapper?: (list: any) => void): any => {
  //TODO 这里不太确定是undefined 还是 ref<null,[]> 具体情况业务决定
  const listNullable: Ref<T[] | undefined> = ref<T[] | undefined>();
  const blockList: Ref<T[]> = refHaveValue<T[]>([]);
  const { data } = await query()
  //TODO 这里记一下 更好的处理方式 await 
  return wrapper(data)
};
export const refVariableLoader = <T>(query: () => Promise<T>, loadRightNow?: (error: unknown) => void): [Ref<T | undefined>, () => Promise<T>, Ref<RemoteRequestState>, ComputedRef<RemoteRequestFlatState>] => {
  const resultNullable: Ref<T | undefined> = ref<T | undefined>();
  const state: Ref<any> = ref('undo');
  const loader = async () => {
    resultNullable.value = undefined;
    state.value = 'loading';
    const resultPromise = query();
    resultPromise.then(() => (state.value = 'success')).catch(() => (state.value = 'failure'));
    resultNullable.value = await resultPromise;
    return resultPromise;
  };
  if (loadRightNow) {
    loader().catch(loadRightNow);
  }
  return [resultNullable, loader, state, requestFlatState(state)];
};