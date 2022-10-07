import Axios from 'axios';
import { env } from '~/app/env';
import { createSerializedApiErrorInterceptor } from '~/app/utils/http/interceptors/createSerializedApiErrorInterceptor';

export const guestApi = Axios.create({
  baseURL: 'http://localhost:3333',
});

guestApi.interceptors.response.use(
  undefined,
  createSerializedApiErrorInterceptor,
);
