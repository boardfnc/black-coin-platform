import type { IBaseResponse, ITokenData } from '../_fetch/types';

export interface ILoginRequest {
  login_id: string;
  password: string;
}

export interface IMyData {
  mngr_id: number;
  mngr_se: string;
  mngr_sttus: string;
  login_id: string;
}

export interface ILoginResponse extends IBaseResponse {
  data: {
    token: ITokenData;
    me: IMyData;
  };
}
