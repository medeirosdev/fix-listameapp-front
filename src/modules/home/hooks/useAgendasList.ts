import { QueryKey, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { agendasApi } from '~/modules/home/services/api/agendasApi';

export interface IUseAgendasListParams {
  isProfile?: boolean;
  search?: string;
}

export const useAgendasList = (params: IUseAgendasListParams = {}) => {
  const { isProfile = false, search } = params;
  const {
    data: listAgendasResponse,
    isLoading,
    error,
  } = useQuery(['listAgendas', isProfile], getAgenda);

  async function getAgenda({ queryKey }: { queryKey: QueryKey }) {
    const [_, isProfile] = queryKey;
    const agenda = isProfile
      ? await agendasApi.profileList()
      : await agendasApi.list();
    return agenda;
  }

  const agendas = useMemo(() => {
    if (search)
      return listAgendasResponse?.filter((agenda) =>
        agenda.name.toLowerCase().match(new RegExp(search, 'i')),
      );
    return listAgendasResponse;
  }, [search]);

  return {
    agendas,
    isLoading,
    error,
    fetchAgendas: () => {},
  };
};
