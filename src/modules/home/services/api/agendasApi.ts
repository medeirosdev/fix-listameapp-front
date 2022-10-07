import { api } from '~/app/services/api/api';
import { IAgenda, IUserAgenda } from '~/modules/schedule/types/agendas';

const BASE_URL = '/agendas';

export type AgendaFilterParams = IAgenda['id'][];

const list = async (): Promise<IAgenda[]> => {
  const endpoint = BASE_URL.concat('/');
  const { data } = await api.get(endpoint);
  return data;
};

const profileList = async (): Promise<IAgenda[]> => {
  const endpoint = BASE_URL.concat('/profile');
  const { data } = await api.get(endpoint);
  return data;
};

const filter = async (agendasIds: AgendaFilterParams): Promise<IAgenda[]> => {
  const endpoint = BASE_URL.concat('/filter');
  const { data } = await api.post(endpoint, { agendasIds });
  return data;
};

const findById = async (agendaId: IAgenda['id']): Promise<IAgenda> => {
  const endpoint = BASE_URL.concat(`/${agendaId}`);
  const { data } = await api.get(endpoint);
  return data;
};

const follow = async (agendaId: IAgenda['id']): Promise<IUserAgenda> => {
  const endpoint = BASE_URL.concat(`/follow/${agendaId}`);
  const { data } = await api.post(endpoint);
  return data;
};

const unfollow = async (agendaId: IAgenda['id']): Promise<IUserAgenda> => {
  const endpoint = BASE_URL.concat(`/unfollow/${agendaId}`);
  const { data } = await api.delete(endpoint);
  return data;
};

const getFollowers = async (
  agendaId: IAgenda['id'],
): Promise<IUserAgenda[]> => {
  const endpoint = BASE_URL.concat(`/followers/${agendaId}`);
  const { data } = await api.get(endpoint);
  return data;
};

export const agendasApi = {
  list,
  profileList,
  filter,
  findById,
  follow,
  unfollow,
  getFollowers,
};
