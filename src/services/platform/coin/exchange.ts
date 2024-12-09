import { fetch } from '../../_fetch';

import type {
  IExchangeCheckResponse,
  IExchangeCoinRequest,
  IExchangeMoneyRequest,
  TExchangeCoinResponse,
  TExchangeMoneyResponse,
} from './exchange.types';
import type { OptionsType } from '../../_fetch/types';

export async function exchangeCheckService(options?: OptionsType) {
  const response = await fetch<IExchangeCheckResponse>('/coin/exchange/check', {
    method: 'GET',
    ...options,
  });

  return response;
}

export async function exchangeCoinService(params: IExchangeCoinRequest, options?: OptionsType) {
  const response = await fetch<TExchangeCoinResponse>('/coin/exchange/coin', {
    method: 'POST',
    params,
    ...options,
    body: JSON.stringify(params),
  });

  return response;
}

export async function exchangeMoneyService(params: IExchangeMoneyRequest, options?: OptionsType) {
  const response = await fetch<TExchangeMoneyResponse>('/coin/exchange/money', {
    method: 'POST',
    params,
    ...options,
    body: JSON.stringify(params),
  });

  return response;
}
