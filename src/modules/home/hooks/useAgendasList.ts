import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '~/app/hooks/useAppDispatch';
import { AgendaFilterParams } from '~/modules/home/services/api/agendasApi';
import {
  selectAgendasList,
  selectAgendasListError,
  selectAgendasListLoading,
} from '~/modules/home/state/selectors/agendasSelectors';
import { loadAgendasListThunk } from '~/modules/home/state/thunks/agendasThunk';

export const useAgendasList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchAgendas();
  }, []);

  const agendas = useSelector(selectAgendasList);
  const isLoading = useSelector(selectAgendasListLoading);
  const error = useSelector(selectAgendasListError);

  async function fetchAgendas(agendasIds?: AgendaFilterParams) {
    await dispatch(loadAgendasListThunk(agendasIds));
  }

  return {
    agendas,
    isLoading,
    error,
    fetchAgendas,
  };
};
