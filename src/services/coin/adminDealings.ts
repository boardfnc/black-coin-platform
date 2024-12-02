import { fetch } from '../_fetch';

import type { IAdminManagerDetailsRequest, IAdminManagerDetailsResponse } from './adminDealings.types';
import type { OptionsType } from '../_fetch/types';

export async function adminManagerDetailsService(params: IAdminManagerDetailsRequest, options?: OptionsType) {
  const response = await fetch<IAdminManagerDetailsResponse>('/coin/admin-dealings-fee-details', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}
