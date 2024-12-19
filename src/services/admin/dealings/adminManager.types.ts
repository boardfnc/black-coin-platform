import type { IBaseWithPageResponse } from '../../_fetch/types';

export interface IAdminManagerDetailsRequest {
  created_at_start?: string;
  created_at_end?: string;
  search_type?: 'delng_no' | 'prtnr_nm' | 'code';
  search_keyword?: string;
  mngr_sttus?: number;
  delng_se?: number | string;
  delng_sttus?: number[] | string[];
  page: number;
  per_page: number;
  orderby?: Array<'created_at'>;
}

export interface IAdminManagerDetailsResponse extends IBaseWithPageResponse {
  data: Array<{
    ca_delng_dtls_id: number;
    mngr_id: number;
    prtnr_nm: string;
    code: string;
    delng_se: number;
    delng_sttus: number;
    delng_no: string;
    rcpmny_bank: string;
    rcpmny_dpstr: string;
    rcpmny_acnutno: string;
    created_at: string;
    reg_ip: string;
    bank: string;
    dpstr: string;
    acnutno: string;
    hold_qy: number;
    delng_qy: number;
    bnus_qy: number;
    compt_qy: number;
    pymnt_am: number;
    complete_dt: string;
  }>;
}

export interface IAdminManagerDetailHistoryRequest {
  mngr_id: number;
  page: number;
  per_page: number;
  orderby?: Array<'created_at'>;
}

export interface IAdminManagerDetailHistoryResponse extends IBaseWithPageResponse {
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

export interface IAdminMemberDetailsRequest {
  created_at_start?: string;
  created_at_end?: string;
  search_type?: 'delng_no' | 'prtnr_nm' | 'code';
  search_keyword?: string;
  mber_grd?: string[];
  delng_se?: string;
  delng_sttus?: string[];
  mngr_sttus?: string;
  page: number;
  per_page: number;
  orderby?: Array<'created_at'>;
}

export interface IAdminMemberDetailsResponse extends IBaseWithPageResponse {
  data: Array<{
    mber_delng_dtls_id: number;
    mber_id: number;
    login_id: string;
    nm: string;
    prtnr_nm: string;
    created_at: string;
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

export interface IAdminMemberDetailHistoryRequest {
  mber_id: number;
  page: number;
  per_page: number;
  orderby?: Array<'created_at'>;
}

export interface IAdminMemberDetailHistoryResponse extends IBaseWithPageResponse {
  data: Array<{
    mber_delng_dtls_chghst_id: number;
    mber_delng_dtls_id: number;
    mber_id: number;
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
