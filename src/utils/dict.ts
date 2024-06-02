
type Dictionary = {
  id: number;
  dict_type: string;
  dict_label: string;
  dict_value: string;
  list_class: string | undefined;
  remark: string | undefined;

};

interface DictMap {
  "C端充值状态": Dictionary[];
  "C端提现状态": Dictionary[];
  "三方注册方式": Dictionary[];
  "产品类型": Dictionary[];
  "优惠券使用方式": Dictionary[];
  "优惠券类型": Dictionary[];
  "会员状态": Dictionary[];
  "会员认证审核状态": Dictionary[];
  "余额匹配模式": Dictionary[];
  "佣金结算方式": Dictionary[];
  "充值方式选择": Dictionary[];
  "充值订单审核状态": Dictionary[];
  "充值订单支付方式": Dictionary[];
  "充值订单支付状态": Dictionary[];
  "分佣提成方式": Dictionary[];
  "刷单模式": Dictionary[];
  "单页类型": Dictionary[];
  "启用/禁用": Dictionary[];
  "商品订单状态": Dictionary[];
  "商品订单规则类型": Dictionary[];
  "大转盘奖品状态": Dictionary[];
  "大转盘奖项": Dictionary[];
  "审批流记录类型": Dictionary[];
  "审核记录审核状态": Dictionary[];
  "性别": Dictionary[];
  "提现手续费": Dictionary[];
  "提现订单审核状态": Dictionary[];
  "提现订单订单支付状态": Dictionary[];
  "提现订单转账方式": Dictionary[];
  "文章类型": Dictionary[];
  "是否": Dictionary[];
  "显示/隐藏": Dictionary[];
  "消息分类": Dictionary[];
  "理财产品状态": Dictionary[];
  "理财订单状态": Dictionary[];
  "用户优惠券使用状态": Dictionary[];
  "用户实名认证类型": Dictionary[];
  "用户类型": Dictionary[];
  "用户资金交易类型": Dictionary[];
  "返还形式": Dictionary[];
  [key: string]: Dictionary[]; // 允许添加其他类型的字段
}
export function getOptionsFromLocalStorage(): DictMap {
  const optionsJson = localStorage.getItem('dictMap');
  try {
    const options = JSON.parse(optionsJson || '');
    // 检查是否存在 dictMap 属性
    if (options && options && typeof options === 'object') {
      return options;
    } else {
      throw new Error('Invalid options data');
    }
  } catch (error) {
    console.error('Error parsing options from local storage:', error);
    // 处理错误情况，返回默认值或其他逻辑
    return {};
  }
}
type Level = {
  id: string,
  level_name: string

}
export const dictMap = getOptionsFromLocalStorage() as DictMap || {}
export const levelList = localStorage.getItem('levelList') as Level[] || []
