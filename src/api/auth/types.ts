/**
 * 登录请求参数
 */
export interface LoginData {
  /**
   * 用户名
   */
  username?: string;
  /**
   * 密码
   */
  password?: string;

  // /**
  //  * 验证码
  //  */
  code?: string;

  // /**
  //  * 验证码 hash
  //  */
  hash?: string;
}

/**
 * 登录响应
 */
export interface LoginResult {
  /**
   * 访问token
   */
  access_token?: string;
  /**
   * 过期时间(单位：毫秒)
   */
  expires_in?: number;
}

/**
 * 验证码响应
 */
// export interface CaptchaResult {
//   /**
//    * 验证码缓存key
//    */
//   verifyCodeKey: string;
//   /**
//    * 验证码图片Base64字符串
//    */
//   verifyCodeBase64: string;
// }

/**
 * v.1 验证码响应
 */
export interface CaptchaResult {
  /**
   * code：验证码code
   */
  code: string;
  /**
   * hash：验证码hash
   */
  hash: string;
  /**
   * expire：过期时间，单位秒
   */
  expire: string;
}

/**
 * v.1 登录 token 
 */
export interface tokenResult {
    /**
    * 访问token
    */
    access_token?: string;
    /**
     * 过期时间(单位：毫秒)
     */
    expires_in?: number;
}

/**
 * v.1 注销登录 token 
 */
// export interface cancelTokenResult {
//   /**
//   * code：验证码code
//   */
//   code?: string;
//   /**
//    * msg：报文
//    */
//   msg?: number;
//   /**
//    * msg：报文
//    */
//   msg?: number;
// }


