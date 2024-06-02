


/**
 * 分段的游标
 */
export interface PageCursor {
  page: number | null;
  list_rows: number | null;
}

/**
 * 远程分页的Promise
 */
export type RemotePagePromise<D> = Promise<RemotePageResponse<D>>;
/**
 * 远程数据的格式
 */
export interface RemotePageResponse<D> {
  push: any;
  [x: string]: any;
  data: {
    /**
  * 当前分段的数据。
  */
    data: D[];

    /**
     * 页面分段的元信息 TODO 看后端代码是否有这个字段再确认
     */
    total?: number;
  },
  msg: string,
  code: any

}
export interface RemotePageResponseObj<D> {
  push: any;
  [x: string]: any;
  data: {
    /**
  * 当前分段的数据。
  */
    data: D;

    /**
     * 页面分段的元信息 TODO 看后端代码是否有这个字段再确认
     */
    total?: number;
  },
  msg: string,
  code: any

}

export type FilterParams = Record<string, string | number | boolean>;


// , filterParams: FilterParams 看业务需求是否加入
export declare type SystemRecordloaderFunction<D, C = undefined | Function> = (pageCursor: PageCursor, condition: C) => RemotePagePromise<D>;

export type LayoutString =
  | 'sizes,prev, pager, next,total,jumper'
  | 'sizes,prev, pager, next,total'
  | 'sizes,prev, pager, next'
  | 'sizes,prev, pager'
  | 'sizes,prev'
  | 'prev, pager'
  | 'prev';

/**
 * 
 * 控制器实体类
 */

import { Ref } from 'react';

export interface ElPageConfig<D, C> {
  /**
   * 是不是立即开始加载
   */
  autoStart?: boolean;


  pageSize?: number;

  /**
   * 查询条件
   */
  queryparameters?: Ref<C>;
  smartFilterParams?: Ref<C>

}

export interface ElRecordBox<D> {
  record: D; //数据
  // index: number; //当前索引
}

export interface SlotAttrsLoaderType {
  recordBoxList: any[],
  refreshCurrentTrigger: () => void;
  refreshTrigger: () => void;
  pageController: RemoteRecord;

}
export interface ElPageState {
  itemCount: Ref<number | undefined>;

  pageCursor: Ref<PageCursor>;

  /**
   * 是不是在加载中
   */
  dataMatchCursor: Ref<boolean>;
}

export interface ElPageController {
  /**
   * 重新加载刷新一下页面
   */
  refresh: (holdPageIndex?: boolean) => Promise<void>;
  /**
   * 重新加载刷新一下页面并清空数据
   */
  refreshAll: (holdPageIndex?: boolean) => Promise<void>;
  /**
   * 开始加载
   * 当 autoStart 设置成 false 的时候，需要手动调用这个方法来开始加载
   */
  start: () => Promise<void>;

  /**
   * 修改每页的大小
   * @param pageSize
   */
  changePageSize: (pageSize: number) => Promise<void>;

  /**
   * 修改当前的页码
   * @param pageIndex
   */
  changePageIndex: (pageIndex: number) => Promise<void>;

  //TODO 要能显示总数
}

export interface ElPageInstance<D> {
  /**
   * 页面控制器
   */
  pageController: ElPageController;

  pageState: ElPageState;

  recordBoxList: ElRecordBox<D>[];
}

