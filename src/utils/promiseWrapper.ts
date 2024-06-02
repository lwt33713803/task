
export function promiseWrapper<T>(data: T, propName?: string): Promise<any> {
  return new Promise((resolve) => {
    if (propName) {
      resolve({ [propName]: data });
    } else {
      resolve(data);
    }
  });
}