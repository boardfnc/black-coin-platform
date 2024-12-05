import type { IBaseResponse } from '../../_fetch/types';

export interface IAdminAccountResponse extends IBaseResponse {
  data: {
    acnut_setup_id: number;
    ca_rcpmny_bank: string;
    ca_rcpmny_dpstr: string;
    ca_rcpmny_acnutno: string;
    ca_mumm_rcpmny_am: number;
    ca_mxmm_rcpmny_am: number;
    vvip_rcpmny_bank: string;
    vvip_rcpmny_dpstr: string;
    vvip_rcpmny_acnutno: string;
    vvip_mumm_rcpmny_am: number;
    vvip_mxmm_rcpmny_am: number;
    vvip_mumm_defray_am: number;
    vvip_mxmm_defray_am: number;
    vip_rcpmny_bank: string;
    vip_rcpmny_dpstr: string;
    vip_rcpmny_acnutno: string;
    vip_mumm_rcpmny_am: number;
    vip_mxmm_rcpmny_am: number;
    vip_mumm_defray_am: number;
    vip_mxmm_defray_am: number;
    gnrl_rcpmny_bank: string;
    gnrl_rcpmny_dpstr: string;
    gnrl_rcpmny_acnutno: string;
    gnrl_mumm_rcpmny_am: number;
    gnrl_mxmm_rcpmny_am: number;
    gnrl_mumm_defray_am: number;
    gnrl_mxmm_defray_am: number;
    new_rcpmny_bank: string;
    new_rcpmny_dpstr: string;
    new_rcpmny_acnutno: string;
    new_mumm_rcpmny_am: number;
    new_mxmm_rcpmny_am: number;
    new_mumm_defray_am: number;
    new_mxmm_defray_am: number;
  };
}

export interface IAdminAccountUpdateRequest {
  ca_rcpmny_bank: string;
  ca_rcpmny_acnutno: string;
  ca_rcpmny_dpstr: string;
  ca_mumm_rcpmny_am: number;
  ca_mxmm_rcpmny_am: number;
  vvip_rcpmny_bank: string;
  vvip_rcpmny_acnutno: string;
  vvip_rcpmny_dpstr: string;
  vvip_mumm_rcpmny_am: number;
  vvip_mxmm_rcpmny_am: number;
  vvip_mumm_defray_am: number;
  vvip_mxmm_defray_am: number;
  vip_rcpmny_bank: string;
  vip_rcpmny_acnutno: string;
  vip_rcpmny_dpstr: string;
  vip_mumm_rcpmny_am: number;
  vip_mxmm_rcpmny_am: number;
  vip_mumm_defray_am: number;
  vip_mxmm_defray_am: number;
  gnrl_rcpmny_bank: string;
  gnrl_rcpmny_acnutno: string;
  gnrl_rcpmny_dpstr: string;
  gnrl_mumm_rcpmny_am: number;
  gnrl_mxmm_rcpmny_am: number;
  gnrl_mumm_defray_am: number;
  gnrl_mxmm_defray_am: number;
  new_rcpmny_bank: string;
  new_rcpmny_acnutno: string;
  new_rcpmny_dpstr: string;
  new_mumm_rcpmny_am: number;
  new_mxmm_rcpmny_am: number;
  new_mumm_defray_am: number;
  new_mxmm_defray_am: number;
}

export type TAdminAccountUpdateResponse = IBaseResponse;
