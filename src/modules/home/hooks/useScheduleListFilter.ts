import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import {
  appointmentsApi,
  AppointmentsApiFilterParams,
} from '~/modules/home/services/api/appointmentsApi';
import {
  agendaDatesFilterAtom,
  agendasCheckedIdsAtom,
  agendaSelectedFiltersCountAtom,
} from '~/modules/home/state/atoms/agendaFilterAtoms';
import { ISchedulesListItem } from '~/modules/schedule/types/appointments';

export const useScheduleListFilter = () => {
  const agendaDateFilterRange = useAtomValue(agendaDatesFilterAtom);
  const agendaCheckedIds = useAtomValue(agendasCheckedIdsAtom);
  const agendaFiltersActiveCount = useAtomValue(agendaSelectedFiltersCountAtom);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [filteredList, setFilteredList] = useState<ISchedulesListItem[]>([]);

  async function handleAppointmentsFilter() {
    if (!agendaFiltersActiveCount) return;
    setIsFilterLoading(true);
    let params: AppointmentsApiFilterParams = {} as AppointmentsApiFilterParams;

    if (agendaCheckedIds?.length) params.agendaIds = agendaCheckedIds;
    if (agendaDateFilterRange?.start?.value)
      params.startDate = agendaDateFilterRange.start.value;
    if (agendaDateFilterRange?.end?.value)
      params.endDate = agendaDateFilterRange.end.value;

    try {
      const filtered = await appointmentsApi.filter(params);
      setFilteredList(filtered);
    } catch (error) {
      console.log(error);
      setFilteredList([]);
    } finally {
      setIsFilterLoading(false);
    }
  }

  useEffect(() => {
    handleAppointmentsFilter();
  }, [agendaCheckedIds, agendaDateFilterRange]);

  return {
    filtersActiveCount: agendaFiltersActiveCount,
    filteredList,
    isFilterLoading,
  };
};
