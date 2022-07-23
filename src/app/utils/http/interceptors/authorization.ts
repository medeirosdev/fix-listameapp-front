import { AxiosRequestConfig } from 'axios';
import { getTokenFromStorage } from '~/modules/auth/utils/getAuthFromStorage';

export async function addAuthorizationHeaderInterceptor(
  config: AxiosRequestConfig,
) {
  const token = await getTokenFromStorage();
  if (!token) {
    return config;
  }

  config.headers = Object.assign(config.headers || {}, {
    Authorization: 'Bearer '.concat(token),
  });

  return config;
}
