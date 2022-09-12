import { api } from '~/app/services/api/api';
import { AgendaFilterParams } from '~/modules/home/services/api/agendasApi';
import { IAgenda } from '~/modules/schedule/types/agendas';
import { ISchedulesListItem } from '~/modules/schedule/types/appointments';

const BASE_URL = '/appointments';

const list = async (): Promise<ISchedulesListItem[]> => {
  const endpoint = BASE_URL.concat('/profile');
  const { data } = await api.get(endpoint);
  return data;
};

export type AppointmentsApiFilterParams = {
  agendaIds: AgendaFilterParams;
  startDate: string;
  endDate: string;
};

type AppointmentsApiFilter = (
  params: AppointmentsApiFilterParams,
) => Promise<ISchedulesListItem[]>;

const filter: AppointmentsApiFilter = async (params) => {
  const endpoint = BASE_URL.concat('/profile');

  const { data } = await api.get(endpoint, {
    params,
  });
  return data;
};

const findByAgendaId = async (id: IAgenda['id']) => {
  const endpoint = BASE_URL.concat(`/${id}`);

  const { data } = await api.get(endpoint);
  return data;
};

export const appointmentsApi = {
  list,
  filter,
  findByAgendaId,
};
