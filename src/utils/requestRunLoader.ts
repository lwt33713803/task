
import { RemotePageResponse } from '@/components/Elgroup/Elorigin/Elorgin';
import to from 'await-to-js';

export async function executeMethods(api: Promise<RemotePageResponse<any>>, parmas: any, cb): Promise<void> {

  const [err, data] = await to<any>(api({ ...parmas }));
  return new Promise((resolve, reject) => {
    if (!err) {
      cb('hide'); return resolve(true)
    }
    else {
      cb('hideloading')
      return resolve(false)
    }
  })
}