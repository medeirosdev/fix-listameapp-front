import { RootState } from '~/app/services/store';

export const selectAgendasList = (state: RootState) => state.agendas.agendas;
export const selectAgendasListLoading = (state: RootState) =>
  state.agendas.status === 'AGENDAS_PENDING';
export const selectAgendasListError = (state: RootState) => state.agendas.error;
