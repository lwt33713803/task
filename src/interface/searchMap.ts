
import { getBankList, getmemberListDefault } from '@/api/user/userAdmin';
import { SmartFilterInput, SmartFilterInputOriginSelect, SmartFilterInputSelect } from '@/components/Elgroup/ElTableSearchGroup/ElTableSearchGroup'
import { cloneDeep } from 'lodash';

// 商品编号
export const smartFilterGoodsId: SmartFilterInput = { scheme: 'id', title: '商品编号', mixText: 0, placeholder: '请输入商品编号', type: 'input' };
// 商品名称
export const smartFilterGoodsName: SmartFilterInputOriginSelect = { scheme: 'goods_name', title: '商品名称', mixText: 0, placeholder: '请输入商品名称', type: 'input', };
//商品价格
export const smartFilterGoodsPrice: SmartFilterInput = { scheme: 'price', title: '商品价格', mixText: 0, placeholder: '请输入商品名称', type: 'input' };
// 商品状态
export const smartFilterGoodsStatus: SmartFilterInputSelect = {
  scheme: 'status', title: '商品状态', mixText: 3, placeholder: '请选择商品状态', type: 'select', options: dictMap['启用/禁用']

};
// 创建时间
export const smartFilterDate: SmartFilterInputOriginSelect = { scheme: 'create_time', title: '创建时间', mixText: 3, placeholder: '请选择创建时间', type: 'date', };
// 用户名
export const smartFilterUserName: SmartFilterInput = { scheme: 'username', title: '用户名', mixText: 3, placeholder: '请输入查询的用户名称', type: 'input', };
// 昵称
export const smartFilterNickName: SmartFilterInput = { scheme: 'nickname', title: '昵称', mixText: 3, placeholder: '请输入查询的用户昵称', type: 'input', };
// 手机号
export const smartFilterPhoneNum: SmartFilterInput = { scheme: 'phone_num', title: '手机号', mixText: 3, placeholder: '请输入查询的手机号', type: 'input', };
// 策略名称
export const smartFilterGroupName: SmartFilterInput = { scheme: 'group_name', title: '策略名称', mixText: 10, placeholder: '请输入查询的策略名称', type: 'input', };
// 创建人
export const smartFilterCreator: SmartFilterInput = { scheme: 'admin_id', title: '创建人', mixText: 5, placeholder: '请输入查询人的名称', type: 'input', };
// 策略状态
export const smartFilterCreateStatus: SmartFilterInputSelect = { scheme: 'status', title: '策略状态', mixText: 5, placeholder: '请选择策略状态', type: 'input', };
// 操作时间
export const smartFilterOperateTime: SmartFilterInputSelect = { scheme: 'update_time', title: '操作时间', mixText: 5, placeholder: '请选择操作时间', type: 'date', };
//邮箱
export const smartFilterEmail: SmartFilterInput = { scheme: 'email', title: '邮箱号', mixText: 5, placeholder: '请输入邮箱', type: 'input' };
//用户等级
export const smartFilterLeval: SmartFilterInputSelect = {
  scheme: 'level_id', title: '用户等级', mixText: 5, placeholder: '请选择用户等级', type: 'select', options: {
    action: getGradeList,
    nameProperty: 'id',
    valueProperty: 'level_name',
    path: "data"
  }
};
//是否为代理
export const smartFilterIsProxy: SmartFilterInputSelect = { scheme: 'Proxy', title: '是否为代理', mixText: 5, placeholder: '请选择是否为代理', type: 'select', options: dictMap.是否 };
//是否实名
export const smartFilterIsreal: SmartFilterInputSelect = { scheme: 'is_verify', title: '是否实名', mixText: 5, placeholder: '请选择是否实名', type: 'select', options: dictMap.是否 };
//所属上级
export const smartFilterUpId: SmartFilterInput = { scheme: 'parent_id', title: '所属上级', mixText: 5, placeholder: '请输入上级id', type: 'input' };
//所属上级
export const smartFilterProxyId: SmartFilterInput = {
  scheme: 'agent_id', title: '所属代理', mixText: 5, placeholder: '请选择代理', type: 'select',
  options: {
    action: getmemberAgent,
    valueProperty: 'username',
    nameProperty: 'id',
  },
  originRequest: getmemberAgent,
  key: 'username',
  name: 'username',
  name_label: '代理名称'
};


export const goodsClssify = {
  goodsClassifyName: { scheme: 'category_name', title: '分类名称', placeholder: '请输入分类名称', type: 'input' },
  goodsClassifyType: { scheme: 'create_time', title: '分类状态', placeholder: '请选择分类状态', type: 'input' }
}

export const tacticsClassify = {
  // name: { scheme: 'group_name', title: '策略组名称', placeholder: '请输入名称', type: 'input' },
  user: { scheme: 'admin_id', title: '创建人', placeholder: '请输入创建人', type: 'input' },
  status: { scheme: 'status', title: '策略组状态', placeholder: '请选择状态', type: 'select', options: dictMap[`启用/禁用`] },
  date: { scheme: 'update_time', title: '操作时间', placeholder: '请选择', type: 'date' },
}

export const ordersClssify = {
  number: { scheme: 'order_sn', title: '订单编号', placeholder: '请输入订单编号', type: 'input' },
  rules: { scheme: 'rule_type', title: '规则类型', placeholder: '请选择规则类型', type: 'select', options: dictMap.商品订单规则类型 },
  productName: { scheme: 'goods_name', title: '商品名称', placeholder: '请输入产品名称', type: 'input' },
  state: { scheme: 'status', title: '订单状态', placeholder: '请选择订单状态', type: 'select', options: dictMap.商品订单状态 },
  // name: { scheme: 'nickname', title: '用户名', placeholder: '请输入用户名', type: 'input', value: '' },
  create: { scheme: 'create_time', title: '生成时间', mixText: 5, placeholder: '请选择生成时间', type: 'date', },
  finish: { scheme: 'update_time', title: '完成时间', mixText: 5, placeholder: '请选择完成时间', type: 'date', },

}

export const rulesClssify = {
  number: { scheme: 'name', title: '角色名称', placeholder: '请输入角色名称', type: 'input' },
  quantity: { scheme: 'sort', title: '权重', placeholder: '请输入权重信息', type: 'input' },
  status: { scheme: 'status', title: '状态', placeholder: '请选择状态', type: 'select', options: dictMap['显示/隐藏'] },
}
/*
* Author：Dyn
* Description：客服管理
* parameters：messageName 客服名称、agentName 代理名称
*/
export const messageClassify = {
  messageName: { scheme: 'name', title: '客服名称', mixText: 10, placeholder: '请输入客服名称', type: 'input' },
  agentName: { scheme: 'agent_name', title: '代理名称', mixText: 10, placeholder: '请输入代理名称', type: 'input' },
}

/*
* Author：Dyn
* Description：文章管理
*/
export const articleClassify = {
  title: { scheme: 'title', title: '标题', mixText: 10, placeholder: '请输入标题', type: 'input' },
  operator: { scheme: 'username', title: '操作人', mixText: 10, placeholder: '请输入', type: 'input' }
}


/*
* Author：Dyn
* Description：消息公告
*/
export const noticeClassify = {
  title: { scheme: 'title', title: '标题', mixText: 10, placeholder: '请输入标题', type: 'input' },
  operator: { scheme: 'username', title: '操作人', mixText: 10, placeholder: '请输入', type: 'input' },
}


/*
* Author：john
* Description：帐变记录
*/
export const accountOperationsClassify = {
  username: { scheme: 'username', title: '账号', mixText: 10, placeholder: '请输入', type: 'input' },
  trade_type: { scheme: 'trade_type', title: '账变类型', mixText: 3, placeholder: '请选择', type: 'select', options: dictMap.用户资金交易类型 },
}


/*
* Author：john
* Description：单页
*/
export const pagesClassify = {
  title: { scheme: 'title', title: '标题', mixText: 10, placeholder: '请输入', type: 'input' },
  page_type: { scheme: 'single_page_cate', title: '单页类型', mixText: 3, placeholder: '请选择', type: 'select', options: dictMap.单页类型 },
}





/*
* Author：Dyn
* Description：审批管理
* parameters： 客服名称、agentName 代理名称
*/
export const approvalClassify = {
  name: { scheme: 'audit_flow_name', title: '审批流名称', placeholder: '请输入名称', type: 'input' },
  status: { scheme: 'audit_status', title: '审批状态', mixText: 3, placeholder: '请选择审批状态', type: 'select', options: dictMap.审核记录审核状态 },
  methods: { scheme: 'audit_type', title: '审批类型', mixText: 10, placeholder: '请选择审批类型', type: 'select', options: dictMap.审批流记录类型 },
}

/*
* Author：Dyn
* Description：大转盘
*/
export const rewardClassify = {
  name: { scheme: 'member_username', title: '用户名', placeholder: '请输入', type: 'input' },
  reward: { scheme: 'reward_type', title: '奖品名称', mixText: 10, placeholder: '请选择奖品名称', type: 'select', options: dictMap.大转盘奖项 }
}

/*
* Author：John
* Description：分享拉新
*/
export const shareClassify = {
  name: { scheme: 'username', title: '用户名', placeholder: '请输入', type: 'input' },
}

//允许访问的对象
let smartFilterProperties = {
  smartFilterGoodsStatus,
  smartFilterGoodsId,
  smartFilterGoodsName,
  smartFilterDate,
  goodsClssify
};

export const InputStatus = ({ target, KeyReplace, text }: { KeyReplace?: string, text: string, target: any }) => {
  const property: any = smartFilterProperties[target] as any;
  if (KeyReplace) {
    property.scheme = KeyReplace
  }
  if (text) {
    //@ts-ignore
    property.title = text ?? ""
  }
  property.placeholder = `${property.type == 'input' ? '请输入' : '请选择'} ${text}`
  return property
}
export const mergeText = (target: string, text: string) => {
  //@ts-ignore
  let propertys = cloneDeep(smartFilterProperties[target])
  if (text) {
    //@ts-ignore
    propertys.title = text ?? ""
    propertys.placeholder = `请输入${text}`
  }
  propertys.placeholder = `${propertys.type == 'input' ? '请输入' : '请选择'} ${text}`
  return propertys
}

export const smartUserSerachGroup = [
  smartFilterEmail, smartFilterLeval, mergeText('smartFilterGoodsStatus', '用户状态'),
  smartFilterIsreal, smartFilterProxyId, {
    scheme: 'parent_username', title: '所属上级', placeholder: '请选择所属上级', type: 'select', options: {
      action: getmemberListDefault,
      valueProperty: 'username',
      nameProperty: 'id',
    },
    key: 'username',
    name: 'username',
    name_label: '上级名称'
  },
  {
    scheme: 'mode_type', title: '刷单模式', placeholder: '请选择刷单模式', type: 'select', options: dictMap.用户刷单模式,
  }, { scheme: 'create_time', title: '注册时间', mixText: 3, placeholder: '请选择注册时间', type: 'date', }
]
