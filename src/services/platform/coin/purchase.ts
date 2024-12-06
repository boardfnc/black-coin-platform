import { fetch } from '../../_fetch';

import type {
  IPurchaseCancelRequest,
  IPurchaseCompletionRequest,
  IPurchaseRequest,
  IPurchaseResponse,
  TPurchaseCancelResponse,
  TPurchaseCompletionResponse,
} from './purchase.types';
import type { OptionsType } from '../../_fetch/types';

export async function purchaseService(params: IPurchaseRequest, options?: OptionsType) {
  const response = await fetch<IPurchaseResponse>('/coin/purchase', {
    method: 'POST',
    params,
    ...options,
  });

  return response;
}

export async function purchaseCancelService(params: IPurchaseCancelRequest, options?: OptionsType) {
  const response = await fetch<TPurchaseCancelResponse>(`/coin/purchase/cancel/${params.id}`, {
    method: 'PUT',
    params,
    ...options,
  });

  return response;
}

export async function purchaseCompletionService(params: IPurchaseCompletionRequest, options?: OptionsType) {
  const response = await fetch<TPurchaseCompletionResponse>(`/coin/purchase/completion/${params.id}`, {
    method: 'PUT',
    params,
    ...options,
  });

  return response;
}
