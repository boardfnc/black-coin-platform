'use client';

import { useEffect, useState } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { QueryKey } from '@tanstack/react-query';

export interface IClientInformationData {
  isLogin: boolean;
  isMobile: boolean;
}

export const clientInformationKey: QueryKey = ['CLIENT_INFORMATION'];

const useClient = () => {
  const queryClient = useQueryClient();

  const initialData = queryClient.getQueryData<IClientInformationData>(clientInformationKey);

  const { data } = useQuery<IClientInformationData | undefined>({
    queryKey: clientInformationKey,
    queryFn: async () => initialData,
    enabled: initialData != null,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const [isClient, setIsClient] = useState(false);
  const isLogin = (data && data.isLogin) || false;
  const isMobile = (data && data.isMobile) || false;

  useEffect(() => {
    setIsClient(true);
  }, []);

  return { isClient, isLogin, isMobile };
};

export default useClient;
