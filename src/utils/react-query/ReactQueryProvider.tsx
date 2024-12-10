'use client';

import { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { IBaseResponse } from '@/services/_fetch/types';

import { useToast } from '@/hooks';
import { clientInformationKey } from '@/hooks/client';

function ReactQueryProvider({ children }: PropsWithChildren) {
  const [client] = useState(new QueryClient());

  const { open: openToast } = useToast();

  useEffect(() => {
    const hasToken = document.cookie
      .split(';')
      .map((cookie) => cookie.trim())
      .some((cookie) => cookie.startsWith('token='));

    client.setQueryData(clientInformationKey, {
      ...client.getQueryData(clientInformationKey),
      isLogin: !!hasToken,
    });
  }, [client]);

  if (typeof window === 'undefined' && client == null) return children;

  const openToastErrorMessage = (error: Error | IBaseResponse) => {
    openToast({
      type: 'error',
      message: error.message || '알 수 없는 오류가 발생했습니다.',
    });
  };

  client.setDefaultOptions({
    queries: {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retryOnMount: true,
      staleTime: 30000,
      retry: 1,
    },
    mutations: {
      retry: 1,
      onError: (error) => openToastErrorMessage(error),
    },
  });

  return (
    <QueryClientProvider client={client}>
      {children}

      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
