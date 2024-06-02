/**
 * Check if an element has a class
 * @param {HTMLElement} ele
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele: HTMLElement, cls: string) {
  return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

/**
 * Add class to element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function addClass(ele: HTMLElement, cls: string) {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function removeClass(ele: HTMLElement, cls: string) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path);
  return isExternal;
}

/**
 * auth: Dyn
 * 数组对象去重 - 唯一值
 * 事例：duplicateById([{id: 1, name: 'jack'}, {id: 2, name: 'rose'}, {id: 1, name: 'jack'}])
 * 结果：[{id: 1, name: 'jack'}, {id: 2, name: 'rose'}]
 */

export const rearrangement = (list: any[], key: string | number) => [...list.reduce((prev, cur) => prev.set(cur[key], cur), new Map()).values()];



/**
 * auth: Dyn
 * 数组取交集 
 * 事例：intersection([1, 2, 3, 4], [2, 3, 4, 7, 8], [1, 3, 4, 9])
 * 结果：[3, 4]
 */

export const intersection = (a: any[], ...arr: any[]) => [...new Set(a)].filter((v) => arr.every((b) => b.includes(v)));

/**
 * auth: Dyn
 * 日期转换：YYYY-MM-DD 格式
 * @param date: 时间戳、length: 时间戳位数
 * Math.round(date * 1000)
 */
export const formatYmd = (date: any, length: number) => {
  const result_date = length === 10 ? Math.round(date * 1000) : date;
  return new Date(result_date).toISOString().slice(0, 10)
}

/**
 * auth: Dyn
 * 时间转换：YYYY-MM-DD hh:mm:ss 格式
 *  * @param date: 时间戳、length: 时间戳位数
 */
export const formatTime = (date: any, length: number) => {
  const result_date = length === 10 ? Math.round(date * 1000) : date;
  const left_date = new Date(result_date).toISOString().slice(0, 10);
  const right_date = new Date(result_date).toISOString().slice(11, 19);
  return `${left_date} ${right_date}`
}




/**
 * @author: Dyn
 * @description 删除无效属性：删除对象内的 undefined、null,不包括字符串
 * @param obj: {name: '', age: undefined, sex: null}
 * @returns  { name: '' }
 */
export const removeNullUndefined = (obj: {} | any) => {
  Object.entries(obj).reduce((a: any, [k, v]: any) => (v === null ? a : ((a[k] = v), a)), {})
}


/**
 * @author: Dyn
 * @description 16进制的颜色转换成rgb
 * @param color: #00ffff
 * @returns  [0, 255, 255]
 */

export const hexToRgb = (hex: any) => hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_: any, r: any, g: any, b: any) => `#${r}${r}${g}${g}${b}${b}`).substring(1).match(/.{2}/g).map((x: any) => parseInt(x, 16));


/**
 * @author: Dyn
 * @description 特殊 el 组件 v-has 指令控制不了，特用此方法进行 v-if 判断
 */
export const permsJudge = (value: string) => {
  let perms = JSON.parse(localStorage.getItem("roleNodes") as string);
  for (let item of perms) {
    if (item === value) {
      return true;
    }
  }
  return false;
}










