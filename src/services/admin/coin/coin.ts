'use server';

import { fetch } from '../../_fetch';

import type {
  ICoinDealingsFeeDetailsRequest,
  ICoinDealingsFeeDetailsResponse,
  ICoinPurchaseManagerCancelRequest,
  ICoinPurchaseManagerCompletionRequest,
  ICoinPurchaseManagerRequest,
  ICoinPurchaseManagerResponse,
  ICoinPurchaseManagersRequest,
  ICoinPurchaseManagersResponse,
  ICoinReceivedDetailsRequest,
  ICoinReceivedDetailsResponse,
  ICoinSaleManagerCancelRequest,
  ICoinSaleManagerRequest,
  ICoinSaleManagerResponse,
  ICoinSaleManagersRequest,
  ICoinSaleManagersResponse,
  ICoinSentDetailsRequest,
  ICoinSentDetailsResponse,
  TCoinPurchaseManagerCancelResponse,
  TCoinPurchaseManagerCompletionResponse,
  TCoinSaleManagerCancelResponse,
} from './coin.types';
import type { OptionsType } from '../../_fetch/types';

export async function coinDealingsFeeDetailsService(params: ICoinDealingsFeeDetailsRequest, options?: OptionsType) {
  const response = await fetch<ICoinDealingsFeeDetailsResponse>('/coin/dealings-fee-details', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function coinPurchaseManagersService(params: ICoinPurchaseManagersRequest, options?: OptionsType) {
  const response = await fetch<ICoinPurchaseManagersResponse>('/coin/purchase-managers', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function coinPurchaseManagerService(params: ICoinPurchaseManagerRequest, options?: OptionsType) {
  const response = await fetch<ICoinPurchaseManagerResponse>('/coin/purchase-manager', {
    method: 'POST',
    params,
    body: JSON.stringify(params),
    ...options,
  });

  return response;
}

export async function coinPurchaseManagerCancelService(
  params: ICoinPurchaseManagerCancelRequest,
  options?: OptionsType,
) {
  const response = await fetch<TCoinPurchaseManagerCancelResponse>(`/coin/purchase-manager/cancel/${params.id}`, {
    method: 'PUT',
    params,
    body: JSON.stringify(params),
    ...options,
  });

  return response;
}

export async function coinPurchaseManagerCompletionService(
  params: ICoinPurchaseManagerCompletionRequest,
  options?: OptionsType,
) {
  const response = await fetch<TCoinPurchaseManagerCompletionResponse>(
    `/coin/purchase-manager/completion/${params.id}`,
    {
      method: 'PUT',
      params,
      body: JSON.stringify(params),
      ...options,
    },
  );

  return response;
}

export async function coinReceivedDetailsService(params: ICoinReceivedDetailsRequest, options?: OptionsType) {
  const response = await fetch<ICoinReceivedDetailsResponse>('/coin/received-details', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function coinSaleManagersService(params: ICoinSaleManagersRequest, options?: OptionsType) {
  const response = await fetch<ICoinSaleManagersResponse>('/coin/sale-managers', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function coinSaleManagerService(params: ICoinSaleManagerRequest, options?: OptionsType) {
  const response = await fetch<ICoinSaleManagerResponse>(`/coin/sale-manager`, {
    method: 'POST',
    params,
    body: JSON.stringify(params),
    ...options,
  });

  return response;
}

export async function coinSaleManagerCancelService(params: ICoinSaleManagerCancelRequest, options?: OptionsType) {
  const response = await fetch<TCoinSaleManagerCancelResponse>(`/coin/sale-manager/cancel/${params.id}`, {
    method: 'PUT',
    params,
    body: JSON.stringify(params),
    ...options,
  });

  return response;
}

export async function coinSentDetailsService(params: ICoinSentDetailsRequest, options?: OptionsType) {
  const response = await fetch<ICoinSentDetailsResponse>('/coin/sent-details', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}
