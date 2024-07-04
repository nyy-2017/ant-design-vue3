// 创建 加密秘钥 缓存时间

import { isDevMode } from '@/utils/env'
 
// 加密的key
export const cacheCipher = {
  key: 'jiamikey',
  iv: 'jiamoiv'
}
 
// console.error('error', isDevMode()) // true
export const SHOULD_ENABLE_STORAGE_ENCRYPTION = !isDevMode()