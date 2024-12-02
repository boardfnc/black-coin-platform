import type { IBaseWithPageResponse } from '../_fetch/types';

export interface IDealingsManagerDetailsRequest {
  page: number;
  per_page: number;
  search_keyword?: string;
  search_type?: string;
  delng_se?: string;
  delng_sttus?: string[];
  created_at_start?: string;
  created_at_end?: string;
}

export interface IDealingsManagerDetailsResponse extends IBaseWithPageResponse {
  data: Array<{
    ca_delng_dtls_id: number;
    mngr_id: number;
    delng_se: string;
    delng_sttus: string;
    delng_no: string;
    rcpmny_bank: string;
    rcpmny_dpstr: string;
    rcpmny_acnutno: string;
    bank: string;
    dpstr: string;
    acnutno: string;
    hold_qy: number;
    delng_qy: number;
    bnus_qy: number;
    compt_qy: number;
    pymnt_am: number;
    created_at: string;
    compt_dd: string;
  }>;
}

export interface IDealingsManagerDetailsHistoryRequest {
  page: number;
  per_page: number;
  orderby?: Array<'created_at'>;
}

export interface IDealingsManagerDetailsHistoryResponse extends IBaseWithPageResponse {
  data: Array<{
    ca_delng_dtls_chghst_id: number;
    ca_delng_dtls_id: number;
    mngr_id: number;
    delng_sttus: string;
    hold_qy: number;
    delng_qy: number;
    bnus_qy: number;
    compt_qy: number;
    pymnt_am: number;
    created_at: string;
    reg_ip: string;
  }>;
}
