import type { IBaseResponse, IBaseWithPageResponse } from '../_fetch/types';

export interface IAdminMemberRequest {
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

export interface IAdminMemberResponse extends IBaseWithPageResponse {
  data: Array<{
    mber_id: number;
    mngr_id: number;
    prtnr_nm: string;
    code: string;
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

export interface IAdminMemberIdRequest {
  id: number;
}

export interface IAdminMemberIdResponse extends IBaseResponse {
  data: {
    mber_id: number;
    mngr_id: number;
    prtnr_nm: string;
    code: string;
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
  };
}

export interface IAdminMemberDealingsRequest {
  id: number;
  stats_de_start?: string;
  stats_de_end?: string;
}

export interface IAdminMemberDealingsResponse extends IBaseResponse {
  data: {
    fee_am: number;
    purchs_am: number;
    sle_am: number;
  };
}

export interface IAdminMemberPasswordUpdateRequest {
  id: number;
  password: string;
}

export type IAdminMemberPasswordUpdateResponse = IBaseResponse;

export interface IAdminMemberStatusUpdateRequest {
  id: number;
  mber_sttus: string;
}

export type IAdminMemberStatusUpdateResponse = IBaseResponse;

export interface IAdminMemberAccountNumberUpdateRequest {
  id: number;
  bank: string;
  dpstr: string;
  acnutno: string;
}

export type IAdminMemberAccountNumberUpdateResponse = IBaseResponse;

export interface IAdminMemberGradeUpdateRequest {
  id: number;
  mber_grd: string;
}

export type IAdminMemberGradeUpdateResponse = IBaseResponse;

export interface IAdminMemberGradeInitializationRequest {
  id: number;
}

export type IAdminMemberGradeInitializationResponse = IBaseResponse;

export interface IAdminMemberRetrievalRequest {
  mber_id: number;
  pymnt_coin: number;
  memo: string;
}

export type IAdminMemberRetrievalResponse = IBaseResponse;

export interface IAdminMemberPaymentRequest {
  mber_id: number;
  pymnt_coin: number;
  memo: string;
}

export type IAdminMemberPaymentResponse = IBaseResponse;

export interface IAdminMemberGradesRequest {
  page: number;
  per_page: number;
  search_type?: 'prtnr_nm' | 'code';
  search_keyword?: string;
  orderby?: Array<'sbscrb_dt'>;
}

export interface IAdminMemberGradesResponse extends IBaseWithPageResponse {
  data: Array<{
    mngr_id: number;
    code: string;
    prtnr_nm: string;
    mber_count: number;
    comput_stdr_se: string;
    vvip_stdr: number;
    vip_stdr: number;
    gnrl_stdr: number;
  }>;
}

export interface IAdminMemberGradeIdRequest {
  id: number;
  comput_stdr_se: string;
  vvip_stdr: number;
  vip_stdr: number;
  gnrl_stdr: number;
}

export type IAdminMemberGradeIdResponse = IBaseResponse;

export interface IAdminMemberSubscribesRequest {
  sbscrb_dt_start?: string;
  sbscrb_dt_end?: string;
  search_type?: 'login_id' | 'prtnr_nm' | 'code';
  search_keyword?: string;
  confm_sttus?: number;
  page: number;
  per_page: number;
  orderby?: Array<'sbscrb_dt'>;
}

export interface IAdminMemberSubscribesResponse extends IBaseWithPageResponse {
  data: Array<{
    mber_id: number;
    mngr_id: number;
    prtnr_nm: string;
    code: string;
    login_id: string;
    mp_no: string;
    bank: string;
    dpstr: string;
    acnutno: string;
    confm_sttus: string;
    sbscrb_dt: string;
  }>;
}

export interface IAdminMemberSubscribeConsentRequest {
  mber_id: number;
}

export type IAdminMemberSubscribeConsentResponse = IBaseResponse;

export interface IAdminMemberSubscribeRejectionRequest {
  mber_id: number;
}

export type IAdminMemberSubscribeRejectionResponse = IBaseResponse;

export interface IAdminMemberRetrievalMembersRequest {
  created_dt_start?: string;
  created_dt_end?: string;
  search_type?: 'login_id' | 'prtnr_nm' | 'code';
  search_keyword?: string;
  mber_sttus?: number;
  page: number;
  per_page: number;
  orderby?: Array<'created_dt'>;
}

export interface IAdminMemberRetrievalMembersResponse extends IBaseWithPageResponse {
  data: Array<{
    mber_rirvl_dtls_id: number;
    mber_id: number;
    login_id: string;
    mber_sttus: string;
    mber_grd: string;
    prtnr_nm: string;
    code: string;
    rirvl_login_id: string;
    hold_coin: number;
    tot_purchs_am: number;
    tot_sle_am: number;
    rtrvl_coin: number;
    created_at: string;
  }>;
}
