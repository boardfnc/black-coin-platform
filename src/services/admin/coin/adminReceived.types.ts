import type { IBaseWithPageResponse } from '../../_fetch/types';

export interface IAdminReceivedDetailsRequest {
  created_at_start?: string;
  created_at_end?: string;
  search_type?: string;
  search_keyword?: string;
  mber_grd?: string[];
  delng_se?: string[];
  page?: number;
  per_page?: number;
  orderby?: string[];
}

export interface IAdminReceivedDetailsResponse extends IBaseWithPageResponse {
  data: Array<{
    mber_exchng_dtls_id: number;
    mber_id: number;
    login_id: string;
    nm: string;
    created_at: string;
    mngr_id: number;
    prtnr_nm: string;
    code: string;
    exchng_se: string;
    mber_grd: string;
    ca_coin_bnt: number;
    mber_coin_bnt: number;
    send_coin_qy: number;
    receive_coin_qy: number;
    send_money_qy: number;
    receive_money_qy: number;
  }>;
}
