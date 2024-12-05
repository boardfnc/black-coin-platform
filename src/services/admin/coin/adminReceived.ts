import { fetch } from '../../_fetch';

import type {} from './adminPurchase.types';
import type { IAdminReceivedDetailsRequest, IAdminReceivedDetailsResponse } from './adminReceived.types';
import type { OptionsType } from '../../_fetch/types';

export async function adminReceivedDetailsService(params: IAdminReceivedDetailsRequest, options?: OptionsType) {
  const response = await fetch<IAdminReceivedDetailsResponse>('/coin/admin-received-details', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}
