import type { IBaseResponse, IBaseWithPageResponse } from '../../_fetch/types';

export interface ICoinDealingsFeeDetailsRequest {
  created_at_start?: string;
  created_at_end?: string;
  search_type?: 'delng_no' | 'login_id' | 'nm';
  search_keyword?: string;
  mber_grd?: string[];
  delng_se?: string[];
  orderby?: string[];
  page: number;
  per_page: number;
}

export interface ICoinDealingsFeeDetailsResponse extends IBaseWithPageResponse {
  data: Array<{
    delng_fee_dtls_id: number;
    mber_id: number;
    login_id: string;
    nm: string;
    mngr_id: number;
    mber_delng_dtls_id: number;
    ca_delng_dtls_id: number;
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
    created_at: string;
  }>;
}

export interface ICoinPurchaseManagersRequest {
  created_at_start?: string;
  created_at_end?: string;
  search_type?: string;
  search_keyword?: string;
  delng_sttus?: string[];
  page: number;
  per_page: number;
  orderby?: string[];
}

export interface ICoinPurchaseManagersResponse extends IBaseWithPageResponse {
  data: Array<{
    ca_delng_dtls_id: number;
    mngr_id: number;
    delng_se: string;
    delng_sttus: string;
    delng_no: string;
    rcpmny_bank: string;
    compt_dd: string;
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
  }>;
}

export interface ICoinPurchaseManagerRequest {
  delng_qy: number;
}

export interface ICoinPurchaseManagerResponse extends IBaseResponse {
  data: {
    rcpmny_bank: string;
    rcpmny_dpstr: string;
    rcpmny_acnutno: string;
    rcpmny_am: string;
    created_at: string;
  };
}

export interface ICoinPurchaseManagerCancelRequest {
  id: number;
}

export type TCoinPurchaseManagerCancelResponse = IBaseResponse;

export interface ICoinPurchaseManagerCompletionRequest {
  id: number;
}

export type TCoinPurchaseManagerCompletionResponse = IBaseResponse;

export interface ICoinReceivedDetailsRequest {
  created_at_start?: string;
  created_at_end?: string;
  search_type?: 'login_id' | 'nm';
  search_keyword?: string;
  mber_grd?: string[];
  orderby?: string[];
  page: number;
  per_page: number;
}

export interface ICoinReceivedDetailsResponse extends IBaseWithPageResponse {
  data: Array<{
    mber_exchng_dtls_id: number;
    mber_id: number;
    login_id: string;
    nm: string;
    mngr_id: number;
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

export interface ICoinSaleManagersRequest {
  created_at_start?: string;
  created_at_end?: string;
  search_type?: 'delng_no';
  search_keyword?: string;
  delng_sttus?: string[];
  page: number;
  per_page: number;
  orderby?: string[];
}

export interface ICoinSaleManagersResponse extends IBaseWithPageResponse {
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
    compt_dt: string;
    acnutno: string;
    hold_qy: number;
    delng_qy: number;
    bnus_qy: number;
    compt_qy: number;
    pymnt_am: number;
    created_at: string;
  }>;
}

export interface ICoinSaleManagerRequest {
  delng_qy: number;
}

export interface ICoinSaleManagerResponse extends IBaseResponse {
  data: {
    created_at: string;
    bank: string;
    dpstr: string;
    acnutno: string;
    pymnt_am: string;
  };
}

export interface ICoinSaleManagerCancelRequest {
  id: number;
}

export type TCoinSaleManagerCancelResponse = IBaseResponse;

export interface ICoinSentDetailsRequest {
  created_at_start?: string;
  created_at_end?: string;
  search_type?: 'login_id' | 'nm';
  search_keyword?: string;
  mber_grd?: string[];
  page: number;
  per_page: number;
  orderby?: Array<'created_at'>;
}

export interface ICoinSentDetailsResponse extends IBaseWithPageResponse {
  data: Array<{
    mber_exchng_dtls_id: number;
    mber_id: number;
    login_id: string;
    nm: string;
    mngr_id: number;
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
