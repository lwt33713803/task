import { AxiosRequestHeaders } from 'axios';

/**
 * 出现错误时的响应的body
 */
export declare interface ErrorResponseBody {
  /**
   * 错误代码
   */
  code: 200000;

  /**
   * 日期。
   * 2022-01-11 15:08:03.174
   */
  dateString: string;

  /**
   * 异常的扩展
   */
  exceptionExtends?: Record<string, unknown>;
  /**
   * 调试信息
   */
  devMessage: string;

  /**
   * 错误信息
   */
  errorMessage: string;

  /**
   * 异常栈
   */
  exceptionStacks: string;

  /**
   * 调用栈
   */
  callStacks: string;

  /**
   * 接受到的相应头映射
   * TODO 需要参考map的写法
   */
  headers: Record<string, string>;
  /**
   * 接受到的参数表映射
   * TODO 需要参考map的写法
   */
  params: Record<string, string>;

  /**
   * 每次情况的唯一id
   */
  requestId: string;

  /**
   * 状态实体
   * TODO 还需要优化一下名字。
   */
  status: unknown;

  /**
   * 系统时间。
   */
  systemDate: number;
}

export declare interface ResponseStatusCode {
  /**
   * http状态码
   */
  httpCode: number;

  /**
   * 服务端定义的状态码
   */
  serverCode?: number;
}

/**
 * 服务端用到的分页参数
 */
declare interface ServerPageParams {
  /**
   * 程序中永远坚持的一个原则，0代表第1页。
   */
  pageIndex: number;
  pageSize: number;
  skipCount: boolean;
}

/**
 * 请求服务的客户端
 */
export interface requestContorllerInteface {
  /**
   * get请求
   * @param url
   * @param params
   */
  get<T = any>(url: string, params?: any): Promise<T>;

  /**
   * get请求获取一个分页
   * @param url
   * @param pageParams 分页的参数
   * @param params 其它参数
   */
  // getScatterPage<T = any>(url: string, pageParams: ServerPageParams, params?: any): Promise<T>;

  /**
   * 删除操作。
   * TODO 还没有验证。
   * @param url
   * @param params
   */
  // delete<T = any>(url: string, params?: any): Promise<T>;

  /**
   * post请求
   * @param url
   * @param params
   */
  getRoute<T = any>(url: string, params?: any): Promise<T>;
  post<T = any>(url: string, params?: any): Promise<T>;
  delete<T = any>(url: string, params?: any): Promise<T>;
  // postFile<T = any>(url: string, file: File, params?: any): Promise<T>;

  /**
   * put请求
   * TODO 还没有验证。
   * @param url
   * @param params
   */
  // put<T = any>(url: string, params?: any): Promise<T>;

  /**
   * 根据命名空间创建一个url
   * @param namespace
   */
  // createUrl(namespace: string): string;

  /**
   * 获取每个请求用的headers
   */
  // getRequestHeaders(): AxiosRequestHeaders;
}
