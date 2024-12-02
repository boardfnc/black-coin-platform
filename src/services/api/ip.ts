'use server';

import { fetch } from '../_fetch';

import type { IIPResponse } from './ip.types';
import type { OptionsType } from '../_fetch/types';

export async function ipService(options?: OptionsType) {
  const response = await fetch<IIPResponse>('/api/ip', {
    method: 'GET',
    ...options,
  });

  return response;
}
