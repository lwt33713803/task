export const formatDate = (value: any) => {//10位时间戳转换
    let date = new Date(parseInt(value) * 1000);
    let y: any = date.getFullYear();
    let m: any = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    let d: any = date.getDate();
    d = d < 10 ? "0" + d : d;
    let h: any = date.getHours();
    h = h < 10 ? "0" + h : h;
    let minute: any = date.getMinutes();
    let second: any = date.getSeconds();
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    return y + "-" + m + "-" + d + " " + h + ":" + minute;
}

export const deWeight = (arr: [], uniId: string) => {
    const res = new Map();
    return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1));
}