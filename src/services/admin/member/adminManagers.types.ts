import type { IBaseResponse, IBaseWithPageResponse } from '../../_fetch/types';

export interface IAdminManagersRequest {
  sbscrb_dt_start?: string;
  sbscrb_dt_end?: string;
  search_type?: 'login_id' | 'prtnr_nm' | 'code';
  search_keyword?: string;

  mngr_sttus?: number;
  page: number;
  per_page: number;
  orderby?: Array<'sbscrb_dt'>;
}

export interface IAdminManagersResponse extends IBaseWithPageResponse {
  data: Array<{
    mngr_id: number;
    mngr_sttus: string;
    login_id: string;
    code: string;
    mp_no: string;
    prtnr_nm: string;
    site_adres: string;
    csby_fee: number;
    purchs_fee: number;
    sle_fee: number;
    hold_coin: number;
    tot_purchs_am: number;
    tot_sle_am: number;
    sbscrb_dt: string;
  }>;
}

export interface IAdminManagersPostRequest {
  login_id: string;
  password: string;
  prtnr_nm: string;
  mp_no: string;
  site_adres: string;
  bank: string;
  acnutno: string;
  dpstr: string;
  csby_fee: number;
  purchs_fee: number;
  sle_fee: number;
}

export type TAdminManagersPostResponse = IBaseResponse;

export interface IAdminManagerIdRequest {
  id: number;
}

export interface IAdminManagerIdResponse extends IBaseResponse {
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

export interface IAdminManagerDealingsRequest {
  id: number;
  stats_de_start?: string;
  stats_de_end?: string;
}

export interface IAdminManagerDealingsResponse extends IBaseResponse {
  data: {
    fee_am: number;
    purchs_am: number;
    sle_am: number;
  };
}

export interface IAdminManagerAccountUpdateRequest {
  id: number;
  prtnr_nm: string;
  mp_no: string;
  site_adres: string;
}

export type IAdminManagerAccountUpdateResponse = IBaseResponse;

export interface IAdminManagerAccountNumberUpdateRequest {
  id: number;
  bank: string;
  acnutno: string;
  dpstr: string;
}

export type IAdminManagerAccountNumberUpdateResponse = IBaseResponse;

export interface IAdminManagerFeeUpdateRequest {
  id: number;
  csby_fee: number;
  purchs_fee: number;
  sle_fee: number;
}

export type IAdminManagerFeeUpdateResponse = IBaseResponse;

export interface IAdminManagerDeleteRequest {
  id: number;
  mngr_sttus: string;
}

export type IAdminManagerDeleteResponse = IBaseResponse;

export interface IAdminManagerStatusUpdateRequest {
  id: number;
  mngr_sttus: number;
}

export type IAdminManagerStatusUpdateResponse = IBaseResponse;
