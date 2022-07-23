import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserProfiles } from '~/modules/auth/services/api/profiles';

export const loadUser = createAsyncThunk(
  'user/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      const user = await getUserProfiles();
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
