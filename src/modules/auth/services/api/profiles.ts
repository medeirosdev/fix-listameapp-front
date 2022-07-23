import { api } from '~/app/services/api/api';

import { IUser } from '~/modules/auth/types/user';

export const getUserProfiles = async () => {
  const { data } = await api.get<IUser>('/profiles');
  return data;
};
