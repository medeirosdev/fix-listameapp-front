import Axios from 'axios';
import { env } from '~/app/env';
import { addAuthorizationHeaderInterceptor } from '~/app/utils/http/interceptors/authorization';
import { createSerializedApiErrorInterceptor } from '~/app/utils/http/interceptors/createSerializedApiErrorInterceptor';

export const api = Axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.request.use(addAuthorizationHeaderInterceptor);
api.interceptors.response.use(undefined, createSerializedApiErrorInterceptor);
