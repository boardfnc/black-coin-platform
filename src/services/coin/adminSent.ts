import { fetch } from '../_fetch';

import type { IAdminSentDetailsRequest, IAdminSentDetailsResponse } from './adminSent.types';
import type { OptionsType } from '../_fetch/types';

export async function adminSentDetailsService(params: IAdminSentDetailsRequest, options?: OptionsType) {
  const response = await fetch<IAdminSentDetailsResponse>('/coin/admin-sent-details', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}
