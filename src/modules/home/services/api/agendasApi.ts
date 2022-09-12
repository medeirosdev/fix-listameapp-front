import { api } from '~/app/services/api/api';
import { IAgenda } from '~/modules/schedule/types/agendas';

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

export const agendasApi = {
  list,
  profileList,
  filter,
  findById,
};
