import { fetch } from '../../_fetch';

import type { ISaleCancelRequest, ISaleRequest, ISaleResponse, TSaleCancelResponse } from './sale.types';
import type { OptionsType } from '../../_fetch/types';

export async function saleService(params: ISaleRequest, options?: OptionsType) {
  const response = await fetch<ISaleResponse>('/coin/sale', {
    method: 'POST',
    params,
    ...options,
  });

  return response;
}

export async function saleCancelService(params: ISaleCancelRequest, options?: OptionsType) {
  const response = await fetch<TSaleCancelResponse>(`/coin/sale/cancel/${params.id}`, {
    method: 'PUT',
    params,
    ...options,
  });

  return response;
}
