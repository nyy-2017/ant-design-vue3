import { Persistent, BasicKeys } from '@/utils/cache/persistent';
import { CacheTypeEnum, TOKEN_KEY, REFTOKEN_KEY } from '@/store/enums/cacheEnum';
// import projectSetting from '@/settings/projectSetting';

// const { permissionCacheType } = projectSetting;
// const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;

const isLocal = CacheTypeEnum.LOCAL;

export function getToken() {
  return getAuthCache(TOKEN_KEY);
}

export function getRefToken() {
  return getAuthCache(REFTOKEN_KEY);
}

export function getAuthCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
  return fn(key) as T;
}

export function setAuthCache(key: BasicKeys, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
  return fn(key, value, true);
}

export function clearAuthCache(immediate = true) {
  const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession;
  return fn(immediate);
}
