import { createSlice } from '@reduxjs/toolkit';
import { SerializedApiError } from '~/app/utils/http/interceptors/createSerializedApiErrorInterceptor';
import {
  createSession,
  restoreSession,
} from '~/modules/auth/state/thunks/authThunks';

export type SessionStatus =
  | 'GUEST'
  | 'SESSION_RESTORING'
  | 'NETWORK_ERROR'
  | 'SESSION_AUTHENTICATED'
  | 'SESSION_ERROR'
  | 'SESSION_PENDING';

export interface AuthSliceState {
  status: SessionStatus;
  error?: SerializedApiError;
  token?: string;
}

const initialState = {
  status: 'SESSION_RESTORING',
  token: '',
  error: undefined,
} as AuthSliceState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.token = initialState.token;
      state.error = initialState.error;
      state.status = initialState.status;
    },
  },

  extraReducers(builder) {
    builder.addCase(createSession.pending, (state) => {
      state.status = 'SESSION_PENDING';
      state.error = undefined;
      state.token = '';
    });

    builder.addCase(createSession.fulfilled, (state, { payload }) => {
      state.status = 'SESSION_AUTHENTICATED';
      state.error = undefined;
      state.token = payload?.token;
    });

    builder.addCase(createSession.rejected, (state, { payload }) => {
      state.status = 'SESSION_ERROR';
      state.token = '';
      state.error = payload as SerializedApiError;
    });

    builder.addCase(restoreSession.fulfilled, (state, { payload }) => {
      state.status = payload.status as AuthSliceState['status'];
      state.token = payload.token;
    });

    builder.addCase(restoreSession.rejected, (state) => {
      state.status = 'GUEST';
      state.token = '';
    });
  },
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;
