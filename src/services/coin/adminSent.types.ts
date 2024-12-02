import type { IBaseWithPageResponse } from '../_fetch/types';

export interface IAdminSentDetailsRequest {
  created_at_start?: string;
  created_at_end?: string;
  search_type?: string;
  search_keyword?: string;
  mber_grd?: string[];
  page: number;
  per_page: number;
  orderby?: string[];
}

export interface IAdminSentDetailsResponse extends IBaseWithPageResponse {
  data: Array<{
    mber_exchng_dtls_id: number;
    mber_id: number;
    login_id: string;
    nm: string;
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
