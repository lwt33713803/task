
enum ErrorCode {
  /**
   * 成功
   */
  SUCCESS = 1,
  /**
   * 参数错误
   */
  INVALID_PARAMETER = 40001,
  /**
   * 数据验证错误
   */
  DATA_VALIDATION_FAILED = 40002,
  /**
   * 未开通相关权限
   */
  UNAUTHORIZED_ACCESS = 40003,
  /**
   * 网关请求不存在
   */
  GATEWAY_REQUEST_NOT_FOUND = 40004,
  /**
   * 请求方式不允许
   */
  DISALLOWED_REQUEST_METHOD = 40005,
  /**
   * 身份验证错误
   */
  AUTHENTICATION_ERROR = 40006,
  /**
   * 签名验证失败
   */
  SIGNATURE_VALIDATION_FAILED = 40007,
  /**
   * 数据不存在
   */
  DATA_NOT_FOUND = 40008,
  /**
   * 数据已存在
   */
  DATA_ALREADY_EXISTS = 40009,
  /**
   * 操作失败
   */
  OPERATION_FAILED = 40010,
  /**
   * 系统异常
   */
  SYSTEM_EXCEPTION = 40011,
  /**
   * 次数限制错误
   */
  LIMIT_EXCEEDED = 40012,
  /**
   * 超时错误
   */
  TIMEOUT_ERROR = 40013,
  /**
   * 限额错误
   */
  QUOTA_EXCEEDED = 40014,
  /**
   * 其他错误
   */
  OTHER_ERROR = 40015,
  /**
   * 数据库错误
   */
  DATABASE_ERROR = 10501,
}
const ErrorMessages = {
  [ErrorCode.SUCCESS]: '成功',
  [ErrorCode.INVALID_PARAMETER]: '参数错误',
  [ErrorCode.DATA_VALIDATION_FAILED]: '数据验证错误',
  [ErrorCode.UNAUTHORIZED_ACCESS]: '未开通相关权限',
  [ErrorCode.GATEWAY_REQUEST_NOT_FOUND]: '网关请求不存在',
  [ErrorCode.DISALLOWED_REQUEST_METHOD]: '请求方式不允许',
  [ErrorCode.AUTHENTICATION_ERROR]: '身份验证错误',
  [ErrorCode.SIGNATURE_VALIDATION_FAILED]: '签名验证失败',
  [ErrorCode.DATA_NOT_FOUND]: '数据不存在',
  [ErrorCode.DATA_ALREADY_EXISTS]: '数据已存在',
  [ErrorCode.OPERATION_FAILED]: '操作失败',
  [ErrorCode.SYSTEM_EXCEPTION]: '系统异常',
  [ErrorCode.LIMIT_EXCEEDED]: '次数限制错误',
  [ErrorCode.TIMEOUT_ERROR]: '超时错误',
  [ErrorCode.QUOTA_EXCEEDED]: '限额错误',
  [ErrorCode.OTHER_ERROR]: '其他错误',
  [ErrorCode.DATABASE_ERROR]: '数据库错误',
};

export { ErrorCode, ErrorMessages };
