import { isArray } from "@vue/shared"


export function defineListenerProp<F>(fallback?: any) {
  return {
    type: [Function, Array] as PropType<F | F[]>,
    default: fallback,
  }
}

export function call<P extends any[], R>(
  fn: ((...arg: P) => R) | ((...arg: P) => R)[],
  ...args: Parameters<(...arg: P) => R>
): R | R[] | undefined {
  if (Array.isArray(fn)) {
    return fn.map((f) => f(...args))
  }

  if (fn) {
    return fn(...args)
  }
}

interface MyObject {
  [key: string]: any;
}

export function processObject(obj: MyObject): MyObject {
  const processedObj: MyObject = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      let processedKey = key;

      if (processedKey.includes('replace')) {
        processedKey = processedKey.replace('replace', '');
        processedObj[processedKey] = obj[key];
      } else {
        processedObj[key] = obj[key];
      }
    }
  }

  return processedObj;
}

export function convertToDate(dateString: string): Date {
  alert(dateString)
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function convertToDateArray(dateString: string): Date[] {
  console.log(dateString, 'dateStringdateStringdateString')
  return dateString.split(',').map(convertToDate);
}
