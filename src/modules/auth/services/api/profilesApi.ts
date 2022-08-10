import { api } from '~/app/services/api/api';

import { IUser } from '~/modules/auth/types/user';

const BASE_URL = '/profiles';

const getUserProfiles = async () => {
  const endpoint = BASE_URL.concat('/');
  const { data } = await api.get<IUser>(endpoint);
  return data;
};

export const profilesApi = {
  getUserProfiles,
};
