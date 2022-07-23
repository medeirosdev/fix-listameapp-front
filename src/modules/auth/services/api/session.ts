import { guestApi } from '~/app/services/api/guest';

import {
  ILoginRequest,
  ILoginResponse,
} from '~/modules/auth/types/api/session';

interface ILogin {
  (credentials: ILoginRequest): Promise<ILoginResponse>;
}

export const login: ILogin = async (credentials) => {
  const { data } = await guestApi.post('/sessions', credentials);
  return data;
};
