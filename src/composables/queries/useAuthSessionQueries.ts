import { authClient } from '@/lib/auth-client.ts';
import { useMutation, useQuery, useQueryClient, isServer } from '@tanstack/vue-query';
import { experimental_createQueryPersister } from '@tanstack/query-persist-client-core'

export function useAuthSessionQueries() {
  const queryClient = useQueryClient();
  
  const { data: sessionData, isFetching: isFetchingSession } = useQuery({
    queryKey: ['auth-session'],
    queryFn: () => authClient.getSession().then(res => res.data),
    staleTime: Infinity,
    persister: isServer
      ? Promise.resolve
      : experimental_createQueryPersister({storage: window.localStorage}).persisterFn
  });

  const { mutateAsync: signOutUser, isPending: isSigningOut } = useMutation({
    mutationFn: () => authClient.signOut(),
    onSuccess: async (res) => {
      // console.log('resultado signout exitoso');
      // console.log(res);
      // window.location.reload();
      // console.log(res.data);
      // console.log(res.error);
      // // Get all cached queries (without any specific filter)
      // const allCachedQueries = queryClient.getQueryCache().findAll();
      // console.log({allCachedQueries});
      // const myAuthQuery = queryClient.getQueryCache().find({ queryKey: ['auth-session'] });
      // myAuthQuery?.invalidate();
      // console.log({myAuthQuery});
      window.location.href = '/login';
      // await queryClient.invalidateQueries({ queryKey: ['auth-session'] });
      // console.log('query invalidated?');
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