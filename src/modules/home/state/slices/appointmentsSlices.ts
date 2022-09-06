import { createSlice } from '@reduxjs/toolkit';
import { SerializedApiError } from '~/app/utils/http/interceptors/createSerializedApiErrorInterceptor';
import { loadAppointmentsThunks } from '~/modules/home/state/thunks/appointmentsThunks';
import { ISchedulesListItem } from '~/modules/schedule/types/appointments';

export type AppointmentsStatus =
  | 'NO_APPOINTMENTS_PROFILE'
  | 'APPOINTMENTS_SUCCESS'
  | 'APPOINTMENTS_PENDING'
  | 'APPOINTMENTS_ERROR';

export interface AppointmentsSliceState {
  status: AppointmentsStatus;
  error?: SerializedApiError;
  appointmentsList: ISchedulesListItem[] | null;
}

const initialState = {
  status: 'NO_APPOINTMENTS_PROFILE',
  appointmentsList: null,
  error: undefined,
} as AppointmentsSliceState;

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    reset: (state) => {
      state.appointmentsList = initialState.appointmentsList;
      state.error = initialState.error;
      state.status = initialState.status;
    },
  },

  extraReducers(builder) {
    builder.addCase(loadAppointmentsThunks.pending, (state) => {
      state.status = 'APPOINTMENTS_PENDING';
      state.error = undefined;
      state.appointmentsList = null;
    });

    builder.addCase(loadAppointmentsThunks.fulfilled, (state, { payload }) => {
      state.status = 'APPOINTMENTS_SUCCESS';
      state.error = undefined;
      state.appointmentsList = payload.appointmentsList;
    });

    builder.addCase(loadAppointmentsThunks.rejected, (state, { payload }) => {
      state.status = 'APPOINTMENTS_ERROR';
      state.error = payload as SerializedApiError;
      state.appointmentsList = null;
    });
  },
});

export const appointmentsActions = appointmentsSlice.actions;
export const appointmentsReducer = appointmentsSlice.reducer;
