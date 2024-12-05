import type { IBaseWithPageResponse } from '../../_fetch/types';

export interface IDealingsRequest {
  created_at_start?: string;
  created_at_end?: string;
  sale_se?: number;
  purchase_se?: number;
  cancel_se?: number;
  page: number;
  per_page: number;
  delng_se: number;
  orderby?: string;
}

export interface IDealingsResponse extends IBaseWithPageResponse {
  data: Array<{
    mber_delng_dtls_id: number;
    delng_se: string;
    delng_sttus: string;
    delng_no: string;
    rcpmny_bank: string;
    rcpmny_dpstr: string;
    rcpmny_acnutno: string;
    bank: string;
    dpstr: string;
    acnutno: string;
    mber_grd: string;
    hold_qy: number;
    delng_qy: number;
    bnus_qy: number;
    compt_qy: number;
    pymnt_am: number;
    cancl_req_dd: string;
    created_at: string;
  }>;
}
