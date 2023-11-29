import {QueryClient} from '@tanstack/react-query';

export const QUERY_CLIENT = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      retryOnMount: true,
    },
  },
});
