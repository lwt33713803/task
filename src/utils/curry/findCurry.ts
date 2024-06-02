
/**
 * Remove  查找某个字段的柯里化函数
 *
 * @example
 * 
 * const findIndexByUuid = findIndexByProp('uuid')
 * const [ name,nameIndex ] = findIndexByProp('name')(nameMap)
 * 
 * @example
 * const findIndexByAge = findIndexByProp('age')
 * const findIndexByIndex = findIndexByProp('index')
 * 
 * const [ age ,ageIndex ] = findIndexByAge(ageMap)
 *
 * @param 第一个参数定义查询字段
 * @param 返回参数定义查询方法
 */


export default <T extends { [prop: string]: any }>(propName: keyof T = 'uuid') => {
  return (arr: T[], propValue: T[keyof T]): [T | null, number | null] | undefined => {
    if (!arr || !propValue) return [null, -1]
    const index = arr?.findIndex((item) => {
      return item[propName] == propValue
    });

    if (index === -1) {
      return [null, null];
    }
    //@ts-ignore
    return [arr[index] ?? [], index ?? -1];
  };
}

