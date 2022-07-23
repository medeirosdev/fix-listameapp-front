import AsyncStorage from '@react-native-async-storage/async-storage';

type PersistParams = {
  key: string;
  value: string;
  safe?: boolean;
};

const STORAGE_PREFIX = 'LISTAME_';

export const setStorageItem = async (params: PersistParams): Promise<void> => {
  const { key: cleanKey, value, safe = false } = params;
  const key = STORAGE_PREFIX.concat(cleanKey);
  if (safe) return await _setSafeStorageItem(key, value);
  return await AsyncStorage.setItem(key, value);
};

export const getStorageItem = async (
  params: Omit<PersistParams, 'value'>,
): Promise<string | null> => {
  const { key: cleanKey, safe } = params;
  const key = STORAGE_PREFIX.concat(cleanKey);
  if (safe) return await _getSafeStorageItem(key);
  return await AsyncStorage.getItem(key);
};

const _setSafeStorageItem = async (
  cleanKey: string,
  value: string,
): Promise<void> => {
  const key = STORAGE_PREFIX.concat(cleanKey);
  return await AsyncStorage.setItem(key, value);
};

const _getSafeStorageItem = async (
  cleanKey: string,
): Promise<string | null> => {
  const key = STORAGE_PREFIX.concat(cleanKey);
  return await AsyncStorage.getItem(key);
};
