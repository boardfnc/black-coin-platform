import { fetch } from '../../_fetch';

import type { IPurchaseRequest, IPurchaseResponse } from './purchase.types';
import type { OptionsType } from '../../_fetch/types';

export async function purchaseService(params: IPurchaseRequest, options?: OptionsType) {
  const response = await fetch<IPurchaseResponse>('/coin/purchase', {
    method: 'POST',
    params,
    ...options,
  });

  return response;
}
