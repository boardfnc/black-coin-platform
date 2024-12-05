import type { IBaseWithPageResponse } from '../../_fetch/types';

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
