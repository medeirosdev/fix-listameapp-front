import { RootState } from '~/app/services/store';

export const selectAppointmentsList = (state: RootState) => {
  console.info({ list: state.appointments.appointmentsList });
  return state.appointments.appointmentsList || [];
};
export const selectAppointmentsListLoading = (state: RootState) =>
  state.appointments.status === 'APPOINTMENTS_PENDING';
export const selectAppointmentsListError = (state: RootState) =>
  state.appointments.error;
