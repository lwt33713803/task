
export enum statusEnum {
  show = 1,
  hide,
}

export interface goodsNameType {
  category_name: string;
  category_pic: string | unknown;
  sort: string | number;
  status: statusEnum;
}
