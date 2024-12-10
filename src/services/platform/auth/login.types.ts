import type { IBaseResponse, ITokenData } from '../../_fetch/types';

export interface IPlatformLoginRequest {
  login_id: string;
  password: string;
  code: string;
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

export interface IAutomaticLoginRequest {
  autoLogin: boolean;
  code: string;
  esntl_key: string;
}

export interface IAutomaticLoginResponse extends ILoginResponse {
  data: {
    token: ITokenData;
    me: IMyData;
  };
}
