'use server';

import { cookies, headers } from 'next/headers';

import { cache } from 'react';

import { QueryClient } from '@tanstack/query-core';
import { UAParser } from 'ua-parser-js';

import { clientInformationKey } from '@/hooks/client';

export const generateQueryClient = cache(async () => new QueryClient());

export const isMobileDevice = async () => {
  const headersList = await headers();
  const ua = headersList.get('user-agent');

  const device = new UAParser(ua || '').getDevice();

  return device.type === 'mobile';
};

const getQueryClient = async () => {
  const cookieStore = await cookies();
  const queryClient = await generateQueryClient();

  const isLogin = !!cookieStore.get('token')?.value;
  const isMobile = await isMobileDevice();

  queryClient.setQueryData(clientInformationKey, {
    isLogin,
    isMobile,
  });

  return { queryClient, isLogin, isMobile };
};

export default getQueryClient;
