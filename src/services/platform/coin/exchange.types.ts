import type { IBaseResponse } from '../../_fetch/types';

export interface IExchangeCheckResponse extends IBaseResponse {
  data: {
    money: number;
    hold_coin: number;
  };
}

export interface IExchangeCoinRequest {
  exchng_qy: number;
}

export type TExchangeCoinResponse = IBaseResponse;

export interface IExchangeMoneyRequest {
  exchng_qy: number;
}

export type TExchangeMoneyResponse = IBaseResponse;
