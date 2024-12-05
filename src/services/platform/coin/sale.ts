import { fetch } from '../../_fetch';

import type { ISaleRequest, ISaleResponse } from './sale.types';
import type { OptionsType } from '../../_fetch/types';

export async function saleService(params: ISaleRequest, options?: OptionsType) {
  const response = await fetch<ISaleResponse>('/coin/sale', {
    method: 'POST',
    params,
    ...options,
  });

  return response;
}
