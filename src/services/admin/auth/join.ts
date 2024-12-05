'use server';

import { fetch } from '../../_fetch';

import type { IJoinRequest, TJoinResponse } from './join.types';
import type { OptionsType } from '../../_fetch/types';

export async function joinService(data: IJoinRequest, options?: OptionsType) {
  const response = await fetch<TJoinResponse>('/auth/join', {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });

  return response;
}
