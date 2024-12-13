import type { IBaseResponse, IBaseWithPageResponse } from '../../_fetch/types';

export interface IAdminSaleManagersRequest {
  created_at_start?: string;
  created_at_end?: string;
  search_type?: string;
  search_keyword?: string;
  delng_sttus?: string[];
  page: number;
  per_page: number;
  orderby?: string[];
}

export interface IAdminSaleManagersResponse extends IBaseWithPageResponse {
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

export interface IAdminSaleManagerRequest {
  _bc_ca_delng_dtls: Array<{
    ca_delng_dtls_id: number;
    pymnt_am: number;
  }>;
}

export interface IAdminSaleManagerResponse extends IBaseResponse {
  data: number[];
}

export interface IAdminSaleManagerHistoryRequest {
  mngr_id: number;
  page: number;
  per_page: number;
  orderby?: string[];
}

export interface IAdminSaleManagerHistoryResponse extends IBaseWithPageResponse {
  data: Array<{
    ca_delng_dtls_chghst_id: number;
    ca_delng_dtls_id: number;
    mngr_id: number;
    delng_no: string;
    reg_ip: string;
    delng_sttus: string;
    hold_qy: number;
    delng_qy: number;
    bnus_qy: number;
    compt_qy: number;
    pymnt_am: number;
    created_at: string;
  }>;
}

export interface IAdminSaleMembersRequest {
  created_at_start?: string;
  created_at_end?: string;
  search_type?: string;
  search_keyword?: string;
  mber_grd?: string[];
  delng_sttus?: string[];
  delng_se?: string[];
  page: number;
  per_page: number;
  orderby?: string[];
}

export interface IAdminSaleMembersResponse extends IBaseWithPageResponse {
  data: Array<{
    mber_delng_dtls_id: number;
    mber_id: number;
    login_id: string;
    nm: string;
    reg_ip: string;
    site_adres: string;
    created_at: string;
    mngr_id: number;
    prtnr_nm: string;
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
  }>;
}

export interface IAdminSaleMemberRequest {
  _bc_mber_delng_dtls: Array<{
    mber_delng_dtls_id: number;
    pymnt_am: number;
  }>;
}

export interface IAdminSaleMemberResponse extends IBaseResponse {
  data: number[];
}

export interface IAdminSaleMemberHistoryRequest {
  mber_id: number;
  page: number;
  per_page: number;
  orderby?: string[];
}

export interface IAdminSaleMemberHistoryResponse extends IBaseWithPageResponse {
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

export interface IAdminSaleManagerReceiptRequest {
  id: number;
}

export type TAdminSaleManagerReceiptResponse = IBaseResponse;

export interface IAdminSaleMemberReceiptRequest {
  id: number;
}

export type TAdminSaleMemberReceiptResponse = IBaseResponse;
