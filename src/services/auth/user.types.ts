import type { IBaseResponse } from '../_fetch/types';

export interface IUserInformationShowResponse extends IBaseResponse {
  data: {
    nm: string;
    bank: string;
    dpstr: string;
    acnutno: string;
    mber_grd: string;
    hold_coin: number;
    mumm_rcpmny_am: number;
    mxmm_rcpmny_am: number;
    mumm_defray_am: number;
    mxmm_defray_am: number;
  };
}
