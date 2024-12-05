'use server';

import { fetch } from '../../_fetch';

import type {
  IDealingsManagerDetailsHistoryRequest,
  IDealingsManagerDetailsHistoryResponse,
  IDealingsManagerDetailsRequest,
  IDealingsManagerDetailsResponse,
} from './dealings.types';
import type { OptionsType } from '../../_fetch/types';

export async function dealingsManagerDetailsService(params: IDealingsManagerDetailsRequest, options?: OptionsType) {
  const response = await fetch<IDealingsManagerDetailsResponse>(`/dealings/manager-details`, {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function dealingsManagerDetailsHistoryService(
  params: IDealingsManagerDetailsHistoryRequest,
  options?: OptionsType,
) {
  const response = await fetch<IDealingsManagerDetailsHistoryResponse>(`/dealings/manager-detail/history`, {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}
