import { fetch } from '../../_fetch';

import type { IDealingsRequest, IDealingsResponse } from './dealings.types';
import type { OptionsType } from '../../_fetch/types';

export async function dealingsService(params: IDealingsRequest, options?: OptionsType) {
  const response = await fetch<IDealingsResponse>('/coin/dealings-details', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}
