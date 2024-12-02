import type { IBaseResponse, IBaseWithPageResponse } from '../_fetch/types';

export interface IMembersRequest {
  sbscrb_dt_start?: string;
  sbscrb_dt_end?: string;
  search_type?: 'login_id' | 'prtnr_nm' | 'code';
  search_keyword?: string;
  mber_grd?: string;
  mber_sttus?: number;
  page: number;
  per_page: number;
  orderby?: Array<'sbscrb_dt'>;
}

export interface IMembersResponse extends IBaseWithPageResponse {
  data: Array<{
    mber_id: number;
    mngr_id: number;
    mber_sttus: string;
    login_id: string;
    mber_grd: string;
    hold_coin: number;
    rcpmny_am: number;
    defray_am: number;
    sbscrb_dt: string;
    last_conect_dt: string;
    last_conect_ip: string;
  }>;
}

export interface IMemberRequest {
  id: number;
}

export interface IMemberResponse extends IBaseResponse {
  mber_id: number;
  mngr_id: number;
  mber_sttus: string;
  login_id: string;
  esntl_key: string;
  mp_no: string;
  bank: string;
  dpstr: string;
  acnutno: string;
  mber_grd: string;
  passiv_grd_at: string;
  hold_coin: number;
  rcppay_co: number;
  rcpmny_am: number;
  defray_am: number;
  tot_delng_am: number;
  confm_sttus: string;
  confm_dt: string;
  sbscrb_dt: string;
  sbscrb_ip: string;
  last_conect_dt: string;
  last_conect_ip: string;
  last_conect_os: string;
  last_conect_brwsr: string;
}

export interface IMemberDealingsRequest {
  id: number;
  stats_de_start?: string;
  stats_de_end?: string;
}

export interface IMemberDealingsResponse extends IBaseResponse {
  fee_am: number;
  purchs_am: number;
  sle_am: number;
}

export interface IMemberPasswordUpdateRequest {
  id: number;
  password: string;
}

export type TMemberPasswordUpdateResponse = IBaseResponse;

export interface IMemberStatusUpdateRequest {
  id: number;
  mber_sttus: string;
}

export type TMemberStatusUpdateResponse = IBaseResponse;

export interface IMemberAccountNumberUpdateRequest {
  id: number;
  acnutno: string;
  bank: string;
  dpstr: string;
}

export type TMemberAccountNumberUpdateResponse = IBaseResponse;

export interface IMemberGradeUpdateRequest {
  id: number;
  mber_grd: string;
}

export type TMemberGradeUpdateResponse = IBaseResponse;

export interface IMemberRetrievalRequest {
  mber_id: number;
  rtrvl_coin: number;
  memo: string;
}

export type TMemberRetrievalResponse = IBaseResponse;

export interface IMemberPaymentRequest {
  mber_id: number;
  pymnt_coin: number;
  memo: string;
}

export type TMemberPaymentResponse = IBaseResponse;

export interface IMemberGradeResponse extends IBaseResponse {
  data: {
    grd_comput_stdr_id: number;
    mngr_id: number;
    comput_stdr_se: string;
    vvip_stdr: number;
    vip_stdr: number;
    gnrl_stdr: number;
  };
}

export interface IMemberGradePutRequest {
  comput_stdr_se: string;
  vvip_stdr: number;
  vip_stdr: number;
  gnrl_stdr: number;
}

export type TMemberGradePutResponse = IBaseResponse;

export interface IMemberMyPageResponse extends IBaseResponse {
  data: {
    mngr_id: number;
    mngr_se: string;
    mngr_sttus: string;
    login_id: string;
    code: string;
    mp_no: string;
    prtnr_nm: string;
    site_adres: string;
    bank: string;
    dpstr: string;
    acnutno: string;
    csby_fee: number;
    purchs_fee: number;
    sle_fee: number;
    hold_coin: number;
    tot_purchs_am: number;
    tot_sle_am: number;
    sbscrb_dt: string;
    sbscrb_ip: string;
    last_conect_dt: string;
    last_conect_ip: string;
    last_conect_os: string;
    last_conect_brwsr: string;
  };
}

export interface IMemberMyPageDealingsRequest {
  stats_de_start?: string;
  stats_de_end?: string;
}

export interface IMemberMyPageDealingsResponse extends IBaseResponse {
  data: {
    fee_am: number;
    purchs_am: number;
    sle_am: number;
  };
}

export interface IMemberMyPagePasswordUpdateRequest {
  password: string;
}

export type TMemberMyPagePasswordUpdateResponse = IBaseResponse;

export interface IMemberMyPageAccountUpdateRequest {
  prtnr_nm: string;
  mp_no: string;
  site_adres: string;
}

export type TMemberMyPageAccountUpdateResponse = IBaseResponse;

export interface IMemberMyPageAccountNumberUpdateRequest {
  acnutno: string;
  bank: string;
  dpstr: string;
}

export type TMemberMyPageAccountNumberUpdateResponse = IBaseResponse;

export interface IMemberRetrievalMembersRequest {
  created_at_start?: string;
  created_at_end?: string;
  search_type?: 'login_id';
  search_keyword?: string;
  mber_grd?: string;
  mber_sttus?: string;
  page: number;
  per_page: number;
  orderby?: Array<'created_at'>;
}

export interface IMemberRetrievalMembersResponse extends IBaseWithPageResponse {
  data: Array<{
    mber_rirvl_dtls_id: number;
    mber_id: number;
    login_id: string;
    mber_sttus: string;
    mber_grd: string;
    rirvl_login_id: string;
    hold_coin: number;
    tot_purchs_am: number;
    tot_sle_am: number;
    rtrvl_coin: number;
    created_at: string;
  }>;
}
