'use server';

import { fetch } from '../_fetch';

import type { IAdminDatesRequest, IAdminDatesResponse } from './adminDates.types';
import type { OptionsType } from '../_fetch/types';

export async function adminDatesService(params: IAdminDatesRequest, options?: OptionsType) {
  const response = await fetch<IAdminDatesResponse>('/statistics/admin-dates', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}
