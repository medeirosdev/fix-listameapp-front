import { createAsyncThunk } from '@reduxjs/toolkit';

import { login } from '~/modules/auth/services/api/session';
import { setStorageItem } from '~/modules/auth/services/storage/storagePersist';
import { SessionStatus } from '~/modules/auth/state/slices/authSlices';
import { userActions } from '~/modules/auth/state/slices/userSlices';
import { loadUser } from '~/modules/auth/state/thunks/userThunks';
import { ILoginRequest } from '~/modules/auth/types/api/session';
import { getTokenFromStorage } from '~/modules/auth/utils/getAuthFromStorage';

export const createSession = createAsyncThunk(
  'auth/createSession',
  async (credentials: ILoginRequest, { dispatch, rejectWithValue }) => {
    try {
      const data = await login(credentials);
      const { token, user } = data;
      await dispatch(userActions.setUser(user));
      await setStorageItem({ key: 'auth', value: token, safe: true });

      return {
        token,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { dispatch }) => {
    const token = await getTokenFromStorage();
    await dispatch(loadUser());

    const status: SessionStatus = token ? 'SESSION_AUTHENTICATED' : 'GUEST';

    return {
      token,
      status,
    };
  },
);
