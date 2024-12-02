import type { IBaseWithPageResponse } from '../_fetch/types';

export interface IAdminManagerDetailsRequest {
  created_at_start?: string;
  created_at_end?: string;
  search_type?: string;
  search_keyword?: string;
  mber_grd?: string[];
  delng_se?: string[];
  page: number;
  per_page: number;
  orderby?: string[];
}

export interface IAdminManagerDetailsResponse extends IBaseWithPageResponse {
  data: Array<{
    delng_fee_dtls_id: number;
    mber_id: number;
    login_id: string;
    nm: string;
    mngr_id: number;
    prtnr_nm: string;
    code: string;
    mber_delng_dtls_id: number;
    ca_delng_dtls_id: number;
    created_at: string;
    delng_se: string;
    delng_no: string;
    mber_grd: string;
    csby_fee_policy: number;
    purchs_fee_policy: number;
    sle_fee_policy: number;
    csby_fee: number;
    purchs_fee: number;
    sle_fee: number;
    fee_blce: number;
    ca_coin_blce: number;
  }>;
}
