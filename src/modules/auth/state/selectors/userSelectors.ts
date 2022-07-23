import { RootState } from '~/app/services/store';

export const currentUserSelector = (state: RootState) => state.user.user;
