import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { FileInfo } from './types';

/**
 * 上传文件
 *
 * @param file
 */
export function uploadFileApi(file: File): AxiosPromise<FileInfo> {
  const formData = new FormData();
  formData.append('file', file);
  return request({
    url: '/admin/system.upload/image',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

/**
 * 上传文件
 *
 * @param file
 */
export function checkImportGoods(file: File): AxiosPromise<FileInfo> {
  const formData = new FormData();
  formData.append('excel', file);
  return request({
    url: '/admin/brush.goods/import',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

/**
 * 删除文件
 *
 * @param filePath 文件完整路径
 */
export function deleteFileApi(filePath?: string) {
  return request({
    url: '/api/v1/files',
    method: 'delete',
    params: { filePath: filePath }
  });
}

/**
 * 删除文件
 *
 * @param filePath 文件完整路径
 */
export function downTemplateFile() {
  return request({
    url: '/admin/brush.goods/tpl',
    method: 'get',
  });
}