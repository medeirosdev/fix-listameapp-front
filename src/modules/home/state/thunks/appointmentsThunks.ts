import { createAsyncThunk } from '@reduxjs/toolkit';
import { appointmentsApi } from '~/modules/home/services/api/appointmentsApi';

export const loadAppointmentsThunks = createAsyncThunk(
  'appointments/loadAppointmentsThunks',
  async (_, { rejectWithValue }) => {
    try {
      const appointmentsList = await appointmentsApi.list();
      return { appointmentsList };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
