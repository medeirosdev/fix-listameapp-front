import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SerializedApiError } from '~/app/utils/http/interceptors/createSerializedApiErrorInterceptor';
import { loadUser } from '~/modules/auth/state/thunks/userThunks';
import { IUser } from '~/modules/auth/types/user';

export type UserStatus =
  | 'NO_USER'
  | 'USER_SUCCESS'
  | 'USER_PENDING'
  | 'USER_ERROR';

export interface UserSliceState {
  status: UserStatus;
  error?: SerializedApiError;
  user: IUser | null;
}

const initialState = {
  status: 'NO_USER',
  user: null,
} as UserSliceState;

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserSliceState['user']>) => {
      state.status = 'USER_SUCCESS';
      state.user = action.payload;
      state.error = undefined;
    },
    reset: (state) => {
      state.user = initialState.user;
      state.error = initialState.error;
      state.status = initialState.status;
    },
  },

  extraReducers(builder) {
    builder.addCase(loadUser.pending, (state) => {
      state.status = 'USER_PENDING';
      state.error = undefined;
      state.user = null;
    });

    builder.addCase(loadUser.fulfilled, (state, { payload }) => {
      state.status = 'USER_SUCCESS';
      state.error = undefined;
      state.user = payload;
    });

    builder.addCase(loadUser.rejected, (state, { payload }) => {
      state.status = 'USER_ERROR';
      state.error = payload as SerializedApiError;
      state.user = null;
    });
  },
});

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
