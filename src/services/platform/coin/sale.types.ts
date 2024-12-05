import type { IBaseWithPageResponse } from '../../_fetch/types';

export interface ISaleRequest {
  delng_qy: number;
}

export interface ISaleResponse extends IBaseWithPageResponse {
  data: {
    bank: string;
    dpstr: string;
    acnutno: string;
    pymnt_am: number;
    created_at: string;
  };
}
