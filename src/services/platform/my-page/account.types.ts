import type { IBaseResponse } from '@/services/_fetch/types';

export interface IAccountResponse extends IBaseResponse {
  data: {
    login_id: string;
    mp_no: string;
    nm: string;
    bank: string;
    dpstr: string;
    acnutno: string;
    mber_grd: string;
    hold_coin: number;
    purchase_count: number;
    sale_count: number;
    cancel_count: number;
  };
}

export interface IAccountPasswordUpdateRequest {
  password: string;
}

export interface IAccountContactUpdateRequest {
  mp_no: string;
}
