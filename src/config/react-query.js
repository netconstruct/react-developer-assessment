import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const ReactQueryClient = ({children}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 15000,
        refetchOnWindowFocus: false,
        retry: 1,
        notifyOnChangePropsExclusions: ['isStale']
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};