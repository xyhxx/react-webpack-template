import {QueryCache, QueryClient} from '@tanstack/react-query';

export const QUERY_CLIENT = new QueryClient({
  queryCache: new QueryCache({
    onError(_, {queryKey}) {
      setTimeout(() => QUERY_CLIENT.removeQueries({queryKey}), 100);
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      gcTime: 0,
      retryOnMount: true,
    },
  },
});
