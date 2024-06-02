
export enum DateCountryEnum {
  u = "美国",
  c = "中国"
}

export const dateMap: Readonly<Record<DateCountryEnum, any>> = {
  [DateCountryEnum.u]: 'YYYY-MM-DD HH:mm:ss',
  [DateCountryEnum.c]: 'YYYY-MM-DD HH:mm:ss',

}