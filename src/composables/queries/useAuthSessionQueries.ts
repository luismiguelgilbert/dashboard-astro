import { authClient } from '@/lib/auth-client.ts';
import { useQuery, isServer } from '@tanstack/vue-query';
import { experimental_createQueryPersister } from '@tanstack/query-persist-client-core'

export function useAuthSessionQueries() {
  const {
    data: sessionData,
    isFetching: isFetchingSession,
  } = useQuery(
    {
      queryKey: ['auth-session'],
      queryFn: () => authClient.getSession().then(res => res.data),
      staleTime: Infinity,
      persister: isServer
        ? Promise.resolve
        : experimental_createQueryPersister({storage: window.localStorage}).persisterFn
    },
  );

  return {
    sessionData,
    isFetchingSession,
  };
}