

export default function () {
    /**
   * 唯一性校验
   * @param data
   * @returns {Promise<unknown>}
   * @constructor
  */
    const UniquePromise = (data: any) => {
        return new Promise((resolve: any) => {
            resolve(data);
        });
    };

    /**
     *  生成单个字段的验证规则
     *  @param item 字段信息
     *  @returns {[]}
    */
    const getRules = (item: any) => {
        const tempList = [];
        // 验证必填
        if (item.isNull === 1) {
            if (item.formType === 'detail_table') {
                tempList.push({
                    validator: ({ item }: any, value: any, callback: any) => {
                        if (getDetailTableIsEmpty(item.fieldExtendList, value)) {
                            callback(new Error(item.name + '不能为空'));
                        } else {
                            callback();
                        }
                    },
                    item: item,
                    trigger: ['blur', 'change']
                });
            } else if (item.formType === 'checkbox' || item.formType === 'dep-select') {
                tempList.push({
                    validator: ({ item }: any, value: any, callback: any) => {
                        if (!isArray(value) || value.length === 0) {
                            callback(new Error(item.name + '不能为空'));
                        } else {
                            const emptyObj = value.find((valueItem: any) => isEmpty(valueItem));
                            emptyObj === '' ? callback(new Error(item.name + '不能为空')) : callback();
                        }
                    },
                    item: item,
                    trigger: ['blur', 'change']
                });
            } else {
                tempList.push({
                    required: true,
                    message: item.name + '不能为空',
                    trigger: ['blur', 'change']
                });
            }
        }

        // 验证唯一
        if (item.isUnique === 1 && UniquePromise) {
            const validateUnique = (rule: any, value: any, callback: any) => {
                if (isEmpty(value)) {
                    callback();
                } else {
                    // 验证唯一
                    UniquePromise({
                        field: item,
                        rule: rule,
                        value: value
                    }).then(() => {
                        callback();
                    }).catch(msg => {
                        callback(new Error(msg || '验证出错'));
                    });
                }
            };
            tempList.push({
                validator: validateUnique,
                item: item,
                trigger:
                    item.formType === 'checkbox' || item.formType === 'select' ?
                        ['change', 'blur'] :
                        ['blur']
            });
        }

        return tempList;
    };

    /**
* 判断明细表格是否是空
* @param {*} fieldList
* @param {*} valueObj
*/
    const getDetailTableIsEmpty = (fieldList: any, valueObjs: any) => {
        for (let index = 0; index < valueObjs.length; index++) {
            const valueObj = valueObjs[index];
            if (judgeFormValueIsEmpty(fieldList, valueObj)) {
                return true;
            }
        }
        return false;
    };

    /**
      * 判断对象值是否是空
      */
    const judgeFormValueIsEmpty = (fieldList: any, valueObj: any) => {
        for (let index = 0; index < fieldList.length; index++) {
            const field = fieldList[index];
            const value = valueObj[field.fieldName];
            if (field.formType === 'location') {
                if (isObject(value) && (!isEmpty(value.lat) || !isEmpty(value.lng) ||
                    !isEmpty(value.address))) {
                    return false;
                }
            } else if (!isEmpty(value)) {
                return false;
            }
        }
        return true;
    };

    let isObject = (value: any) => {
        return value != null && (typeof value == 'object' || typeof value == 'function')
    }
    let isArray = (value: any) => {
        return value != null && (Object.prototype.toString.call(value) === '[object Array]')
    }
    let isEmpty = (value: any) => {
        if (value == null) return true;

        if (typeof value === 'boolean') return false;

        if (typeof value === 'number') return !value;

        if (value instanceof Error) return value.message === '';

        switch (Object.prototype.toString.call(value)) {
            // String or Array
            case '[object String]':
            case '[object Array]':
                return !value.length;

            // Map or Set or File
            case '[object File]':
            case '[object Map]':
            case '[object Set]': {
                return !value.size;
            }
            // Plain Object
            case '[object Object]': {
                return !Object.keys(value).length;
            }
        }

        return false;
    }

    return {
        UniquePromise,
        getRules
    };
}

