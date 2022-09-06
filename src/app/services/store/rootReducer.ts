import { combineReducers } from 'redux';
import { authReducer } from '~/modules/auth/state/slices/authSlices';
import { userReducer } from '~/modules/auth/state/slices/userSlices';
import { agendasReducer } from '~/modules/home/state/slices/agendasSlices';
import { appointmentsReducer } from '~/modules/home/state/slices/appointmentsSlices';

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  appointments: appointmentsReducer,
  agendas: agendasReducer,
});
