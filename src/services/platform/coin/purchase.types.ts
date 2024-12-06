import type { IBaseResponse, IBaseWithPageResponse } from '../../_fetch/types';

export interface IPurchaseRequest {
  delng_qy: number;
}

export interface IPurchaseResponse extends IBaseWithPageResponse {
  data: {
    rcpmny_bank: string;
    rcpmny_dpstr: string;
    rcpmny_acnutno: string;
    rcpmny_am: number;
    created_at: string;
  };
}

export interface IPurchaseCancelRequest {
  id: number;
}

export interface IPurchaseCompletionRequest {
  id: number;
}

export type TPurchaseCancelResponse = IBaseResponse;

export type TPurchaseCompletionResponse = IBaseResponse;
