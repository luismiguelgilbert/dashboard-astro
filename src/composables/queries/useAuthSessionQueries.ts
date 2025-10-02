import { authClient } from '@/lib/auth-client.ts';
import { useMutation, useQuery, useQueryClient, isServer } from '@tanstack/vue-query';
import { experimental_createQueryPersister } from '@tanstack/query-persist-client-core'

export function useAuthSessionQueries() {
  const queryClient = useQueryClient();
  
  const { data: sessionData, isFetching: isFetchingSession } = useQuery(
    {
      queryKey: ['auth-session'],
      queryFn: () => authClient.getSession().then(res => res.data),
      staleTime: Infinity,
      persister: isServer
        ? Promise.resolve
        : experimental_createQueryPersister({storage: window.localStorage}).persisterFn
    },
  );

  const { mutateAsync: signOutUser, isPending: isSigningOut } = useMutation({
    mutationFn: () => authClient.signOut(),
    onSuccess: async (res) => {
      console.log('resultado signout exitoso')
      console.log(res);
      console.log(res.data);
      console.log(res.error);
      await queryClient.resetQueries({ queryKey: ['auth-session'] });
    },
    retry: 0, // Disable retries for this mutation
  });

  return {
    sessionData,
    isFetchingSession,
    signOutUser,
    isSigningOut
  };
}