
import { RemotePageResponse } from '@/components/Elgroup/Elorigin/Elorgin';
import i18n from '@/lang';
import { ElMessageBoxOptions } from 'element-plus';
import { ref } from 'vue';
type MessageType = '' | 'success' | 'warning' | 'info' | 'error' ;
type MessageBoxHideType = '' | 'hide' | 'show'
interface DeleteSystemLoaderFn {
  (params: any): Promise<any>; // 根据实际情况确定参数类型和返回值类型
}
interface Options {
  title?: string,
  details?: string,
  type: MessageType,
	hide:MessageBoxHideType
}
interface UseTableDeleteResult {
  onDelete: (callback: () => void) => void;
  loading: Ref<boolean>
  onMessageBoxDelete: (row: string, callback: (res:any) => void) => void;
}

export function useTableDelete(
  deleteSystemLoader: any,
  messageOptions?: Options

): UseTableDeleteResult {
  const loading = ref(false); // 添加 loading 状态，默认为 false

  const onDelete = (params: string, callback: (res:any) => void): void => {
    loading.value = true; // 开始加载，将 loading 设置为 true
		
    deleteSystemLoader(params)
      .then((res: RemotePageResponse<any>) => {
        // 处理删除成功的逻辑
				console.log("000000");
        callback(res)
      })
      .catch(() => {
        // 处理删除失败的逻辑
      })
      .finally(() => {
        loading.value = false; // 异步操作完成，将 loading 设置为 false
      });
  };
  const onMessageBoxDelete = (params: string, callback: (res:any) => void) => {
    if (!params) {
      return ElMessage.error(`${i18n.global.t(`default.deleteErrorMessage`)}`)
    }
    ElMessageBox.confirm(
      messageOptions?.details,
      messageOptions?.title ?? '温馨提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: messageOptions?.type,
      }
    )
      .then(() => {
				deleteSystemLoader(params)
      .then((res: RemotePageResponse<any>) => {
        // 处理删除成功的逻辑
				console.log("000000");
        callback(res)
      })
      .catch(() => {
        // 处理删除失败的逻辑
      })
      .finally(() => {
        loading.value = false; // 异步操作完成，将 loading 设置为 false
      });
			if(messageOptions?.hide == 'hide' ) return 
        ElMessage({
          type: 'success',
          message: '操作成功',
        })
      })

  }
	
  return {
    loading,
    onDelete,
    onMessageBoxDelete
  };
}
