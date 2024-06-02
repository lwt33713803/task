
export default (jsonData: any[]): Record<string, any[]> => {
  const result: Record<string, any[]> = {};
  console.log(jsonData, 'jsonData')
  jsonData.forEach((item) => {
    result[item.dict_name] = item.child;
  });
  console.log(result, 'result')
  return result;
}
