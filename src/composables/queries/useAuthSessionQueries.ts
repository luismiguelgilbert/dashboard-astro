import { authClient } from '@/lib/auth-client.ts';
// import { useMutation, useQuery, isServer } from '@tanstack/vue-query';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { experimental_createQueryPersister } from '@tanstack/query-persist-client-core';

export function useAuthSessionQueries() {
  const { data: sessionData, isFetching: isFetchingSession } = useQuery({
    queryKey: ['auth-session'],
    queryFn: () => authClient.getSession().then((res) => res.data),
    staleTime: Infinity,
    persister: experimental_createQueryPersister({
      storage: window.localStorage,
    }).persisterFn,
    // persister: isServer
    //   ? Promise.resolve
    //   : experimental_createQueryPersister({storage: window.localStorage}).persisterFnpersister: isServer
  });

  const { mutateAsync: signOutUser, isPending: isSigningOut } = useMutation({
    mutationFn: () => authClient.signOut(),
    onSuccess: async () => {
      window.location.href = '/login';
    },
    retry: 0, // Disable retries for this mutation
  });

  return {
    sessionData,
    isFetchingSession,
    signOutUser,
    isSigningOut,
  };
}
