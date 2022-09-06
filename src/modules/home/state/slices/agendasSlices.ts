import { createSlice } from '@reduxjs/toolkit';
import { SerializedApiError } from '~/app/utils/http/interceptors/createSerializedApiErrorInterceptor';
import { loadAgendasListThunk } from '~/modules/home/state/thunks/agendasThunk';
import { IAgenda } from '~/modules/schedule/types/agendas';

export type AppointmentsStatus =
  | 'NO_AGENDAS_PROFILE'
  | 'AGENDAS_SUCCESS'
  | 'AGENDAS_PENDING'
  | 'AGENDAS_ERROR';

export interface IAgendasSliceState {
  status: AppointmentsStatus;
  error?: SerializedApiError;
  agendas: IAgenda[];
}

const initialState = {
  status: 'NO_AGENDAS_PROFILE',
  agendas: [],
  error: undefined,
} as IAgendasSliceState;

const agendasSlice = createSlice({
  name: 'agendasSlices',
  initialState,
  reducers: {
    reset: (state) => {
      state.agendas = initialState.agendas;
      state.error = initialState.error;
      state.status = initialState.status;
    },
  },

  extraReducers(builder) {
    builder.addCase(loadAgendasListThunk.pending, (state) => {
      state.status = 'AGENDAS_PENDING';
      state.error = undefined;
      state.agendas = [];
    });

    builder.addCase(loadAgendasListThunk.fulfilled, (state, { payload }) => {
      state.status = 'AGENDAS_SUCCESS';
      state.error = undefined;
      state.agendas = payload.agendas;
    });

    builder.addCase(loadAgendasListThunk.rejected, (state, { payload }) => {
      state.status = 'AGENDAS_ERROR';
      state.error = payload as SerializedApiError;
      state.agendas = [];
    });
  },
});

export const agendasActions = agendasSlice.actions;
export const agendasReducer = agendasSlice.reducer;
