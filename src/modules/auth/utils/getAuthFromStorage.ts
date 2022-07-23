import { getStorageItem } from '~/modules/auth/services/storage/storagePersist';

export const getTokenFromStorage = async () => {
  const token = await getStorageItem({ key: 'auth', safe: true });
  return token || '';
};
