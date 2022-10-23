import Axios from 'axios';
import { env } from '~/app/env';
import { createSerializedApiErrorInterceptor } from '~/app/utils/http/interceptors/createSerializedApiErrorInterceptor';

export const guestApi = Axios.create({
  baseURL:  env.BASE_API_URL,
});

guestApi.interceptors.response.use(
  undefined,
  createSerializedApiErrorInterceptor,
);
