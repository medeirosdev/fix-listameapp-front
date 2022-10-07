import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

const MAX_RETRIES = 3;
const ONE_HOUR_IN_MILLISECONDS = 1000 * 60 * 60;

export function createApplicationQueryClient(isRetriesEnabled = true) {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: isRetriesEnabled
          ? (count, _error) => count < MAX_RETRIES
          : false,
        staleTime: 1000,
      },
    },
  });
}

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

export const queryClient = createApplicationQueryClient();
persistQueryClient({
  queryClient,
  persister: asyncStoragePersister,
});
