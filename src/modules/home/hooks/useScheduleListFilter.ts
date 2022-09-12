import { useAtomValue } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { useEffect, useState } from 'react';
import {
  appointmentsApi,
  AppointmentsApiFilterParams,
} from '~/modules/home/services/api/appointmentsApi';
import {
  agendaCheckedFilterAtom,
  agendaDatesFilterAtom,
  agendasCheckedIdsAtom,
  agendaSelectedFiltersCountAtom,
  isFilteringAtom,
} from '~/modules/home/state/atoms/agendaFilterAtoms';
import { ISchedulesListItem } from '~/modules/schedule/types/appointments';

export const useScheduleListFilter = () => {
  const agendaDateFilterRange = useAtomValue(agendaDatesFilterAtom);
  const agendaCheckedIds = useAtomValue(agendasCheckedIdsAtom);
  const agendaFiltersActiveCount = useAtomValue(agendaSelectedFiltersCountAtom);
  const resetIsFilteringAtom = useResetAtom(isFilteringAtom);
  const resetAgendaDatesFilterAtom = useResetAtom(agendaDatesFilterAtom);
  const resetAgendaCheckedFilterAtom = useResetAtom(agendaCheckedFilterAtom);

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
      console.error(error);
      setFilteredList([]);
    } finally {
      setIsFilterLoading(false);
    }
  }

  function resetFilters() {
    resetIsFilteringAtom();
    resetAgendaDatesFilterAtom();
    resetAgendaCheckedFilterAtom();
  }

  useEffect(() => {
    handleAppointmentsFilter();
  }, [agendaCheckedIds, agendaDateFilterRange]);

  return {
    filtersActiveCount: agendaFiltersActiveCount,
    filteredList,
    isFilterLoading,
    resetFilters,
  };
};
