'use server';

import { cookies } from 'next/headers';

import { fetch } from '../../_fetch';

import type { IBaseResponse, OptionsType } from '../../_fetch/types';

export async function logoutService(options?: OptionsType) {
  const response = await fetch<IBaseResponse>('/auth/logout', {
    method: 'DELETE',
    ...options,
  });

  const cookie = await cookies();
  cookie.delete('token');
  cookie.delete('auto-login');

  return response;
}
