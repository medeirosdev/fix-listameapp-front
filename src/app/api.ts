import Axios from 'axios';
import { addAuthorizationHeaderInterceptor } from '~/app/utils/http/interceptors/authorization';

import { env } from './env';

export const api = Axios.create({
  baseURL: env.BASE_URL,
});

api.interceptors.request.use(addAuthorizationHeaderInterceptor);
