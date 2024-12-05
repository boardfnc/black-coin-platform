import type { IBaseResponse, IBaseWithPageResponse } from '../../_fetch/types';

export interface IAdminPurchaseManagersRequest {
  page: number;
  per_page: number;
  created_at_start?: string;
  created_at_end?: string;
  search_type?: string;
  search_keyword?: string;
  delng_sttus?: string[];
  orderby?: string[];
}

export interface IAdminPurchaseManagersResponse extends IBaseWithPageResponse {
  data: Array<{
    ca_delng_dtls_id: number;
    mngr_id: number;
    prtnr_nm: string;
    code: string;
    delng_se: string;
    mp_no: string;
    site_adres: string;
    reg_ip: string;
    created_at: string;
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
  }>;
}

export interface IAdminPurchaseManageRequest {
  _bc_ca_delng_dtls: Array<{
    ca_delng_dtls_id: number;
    bnus_qy: number;
    compt_qy: number;
  }>;
}

export interface IAdminPurchaseManageResponse extends IBaseResponse {
  data: number[];
}

export interface IAdminPurchaseManagerHistoryRequest {
  mngr_id: number;
  page: number;
  per_page: number;
  orderby?: string[];
}

export interface IAdminPurchaseManagerHistoryResponse extends IBaseWithPageResponse {
  data: Array<{
    ca_delng_dtls_chghst_id: number;
    reg_ip: string;
    ca_delng_dtls_id: number;
    mngr_id: number;
    delng_no: string;
    delng_sttus: string;
    hold_qy: number;
    delng_qy: number;
    bnus_qy: number;
    compt_qy: number;
    pymnt_am: number;
    created_at: string;
  }>;
}

export interface IAdminPurchaseMembersRequest {
  created_at_start?: string;
  created_at_end?: string;
  search_type?: string;
  search_keyword?: string;
  mber_grd?: string[];
  mumm_today_purchs_co?: string;
  mxmm_today_purchs_co?: string;
  delng_sttus?: string[];
  page: number;
  per_page: number;
  orderby?: string[];
}

export interface IAdminPurchaseMembersResponse extends IBaseWithPageResponse {
  data: Array<{
    mber_delng_dtls_id: number;
    mber_id: number;
    login_id: string;
    nm: string;
    mngr_id: number;
    prtnr_nm: string;
    mp_no: string;
    site_adres: string;
    reg_ip: string;
    delng_se: string;
    delng_sttus: string;
    delng_no: string;
    rcpmny_bank: string;
    rcpmny_dpstr: string;
    rcpmny_acnutno: string;
    bank: string;
    dpstr: string;
    acnutno: string;
    created_at: string;
    mber_grd: string;
    hold_qy: number;
    delng_qy: number;
    bnus_qy: number;
    compt_qy: number;
    pymnt_am: number;
    today_purchs_co: number;
  }>;
}

export interface IAdminPurchaseMemberRequest {
  _bc_mber_delng_dtls: Array<{
    mber_delng_dtls_id: number;
    bnus_qy: number;
    compt_qy: number;
  }>;
}

export interface IAdminPurchaseMemberResponse extends IBaseResponse {
  data: number[];
}

export interface IAdminPurchaseMemberHistoryRequest {
  mber_id?: number;
  page: number;
  per_page: number;
  orderby?: string[];
}

export interface IAdminPurchaseMemberHistoryResponse extends IBaseWithPageResponse {
  data: Array<{
    mber_delng_dtls_chghst_id: number;
    mber_delng_dtls_id: number;
    mber_id: number;
    delng_sttus: string;
    hold_qy: number;
    delng_no: string;
    reg_ip: string;
    delng_qy: number;
    bnus_qy: number;
    compt_qy: number;
    pymnt_am: number;
    created_at: string;
  }>;
}
