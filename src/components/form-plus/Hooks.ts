export default function ($emit: any) {

    /**
    * 常规组件change事件
    */
    const commonChange = (item: any, index: any, value: any, data: any) => {
        $emit('change', item, index, value, data);
    };


    /**
    * 判断是空值
    */
    const isEmptyValue = (value: any) => {
        return value === null || value == undefined;
    };

    return {
        commonChange,
        isEmptyValue,
    };
}