'use server';

import { fetch } from '../../_fetch';

import type { IDatesRequest, IDatesResponse } from './dates.types';
import type { OptionsType } from '../../_fetch/types';

export async function datesService(params: IDatesRequest, options?: OptionsType) {
  const response = await fetch<IDatesResponse>('/statistics/dates', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}
