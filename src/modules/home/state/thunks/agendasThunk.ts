import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AgendaFilterParams,
  agendasApi,
} from '~/modules/home/services/api/agendasApi';

export const loadAgendasListThunk = createAsyncThunk(
  'agendas/loadAgendasListThunk',
  async (agendasIds: AgendaFilterParams | undefined, { rejectWithValue }) => {
    try {
      let agendas = [];
      if (Array.isArray(agendasIds) && agendasIds?.length) {
        agendas = await agendasApi.filter(agendasIds);
      } else {
        agendas = await agendasApi.list();
      }
      return { agendas };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
