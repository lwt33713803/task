import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { useUserStoreHook } from '@/store/modules/user';
import md5 from 'js-md5';

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});
function removeUndefinedKeys(obj) {
  const result = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }
  return result;
}
// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStoreHook();
    const keys = "YXpk7u0wq|X+J?x1";
    if (userStore.token) {
      config.headers.authorization = userStore.token;
    }
    let times = new Date().getTime();
    config.headers.lang = 'zh-cn';
    config.headers.timestamp = times;
    if (config.method === 'post') {
      //签名
      let signStr = "";
      if (removeUndefinedKeys(config.data)) {
        Object.keys(config.data).sort().map(item => {
          signStr += item.toLowerCase() + "=" + config.data[item] + "&";
        })
      }
      // encodeURIComponent()
      config.headers.sign = md5(fixedEncodeURIComponent((signStr + "timestamp=" + times + keys)))
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
const fixedEncodeURIComponent = (str: string) => {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data;
    if (code === 1) {
      return response.data;
    }
    // 响应数据为二进制流处理(Excel导出)
    if (response.data instanceof ArrayBuffer) {
      return response;
    }

    ElMessage.error(msg || '系统出错');
    return Promise.reject(new Error(msg || 'Error'));
  },
  (error: any) => {
    console.log('error', error)
    if (error.response.data) {
      console.log('error.response.data', error.response.data)
      const { code, msg } = error.response.data;
      // token 过期,重新登录
      if (code === 'A0230') {
        ElMessageBox.confirm('当前页面已失效，请重新登录', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          // localStorage.clear();
          // window.location.href = '/';
        });
      } else {
        ElMessage.error(msg || '系统出错');
      }
    }
    return Promise.reject(error.message);
  }
);


// 导出 axios 实例
export default service;
