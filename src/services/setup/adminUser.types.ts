import type { IBaseResponse } from '../_fetch/types';

export interface IAdminUserResponse extends IBaseResponse {
  data: {
    mngr_id: number;
    mngr_se: string;
    mngr_sttus: string;
    login_id: string;
    prtnr_nm: string;
    last_conect_dt: string;
    last_conect_ip: string;
    last_conect_os: string;
    last_conect_brwsr: string;
  };
}
