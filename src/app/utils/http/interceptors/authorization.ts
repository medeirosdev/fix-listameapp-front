import { AxiosRequestConfig } from 'axios';

export async function addAuthorizationHeaderInterceptor(
  config: AxiosRequestConfig,
) {
  const token = 'some_token';
  if (!token) {
    return config;
  }

  config.headers = Object.assign(config.headers || {}, {
    Authorization: token,
  });

  return config;
}
