
export function processDate(date: Date, type: number, format?: string): number | string {
  if (type === 1) {
    // 转换为 00:00:00 的时间戳
    const timestamp = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    return format ? formatTime(new Date(timestamp), format) : timestamp;
  } else if (type === 2) {
    // 转换为 23:59:59 的时间戳
    const timestamp = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59).getTime();
    return format ? formatTime(new Date(timestamp), format) : timestamp;
  } else {
    throw new Error('error');
  }
}

function formatTime(date: Date, format: string): string {
  const year = date.getFullYear().toString().padStart(4, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');

  return format
    .replace('yyyy', year)
    .replace('MM', month)
    .replace('dd', day)
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second);
}