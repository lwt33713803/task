import request from "@/utils/requestContorller";
import { AxiosPromise } from 'axios';
import { CaptchaResult, LoginData, LoginResult, tokenResult } from './types';

/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApi(data: LoginData): AxiosPromise<LoginResult> {
  return request.post('/admin/system.auth/issueToken', data);
}

/**
 * 注销API
 */
export function logoutApi() {
  return request.delete('/api/v1/auth/logout')
}


/**
 * v.1 获取验证码
 */
export async function getCaptcha(): AxiosPromise<CaptchaResult> {
  return request.get('/admin/captcha/get')
}

/**
 * v.1 获取登录 token
 */
export async function getLogin(data: LoginData): AxiosPromise<tokenResult> {
  return request.post('/admin/system.auth/issueToken', {...data})
}

/**
 * v.1 注销登录
 */
export function cancelLogin(): AxiosPromise<any> {
  return request.post('/admin/system.auth/logout')
}




