import type { IBaseResponse, ITokenData } from '../../_fetch/types';

export interface IRefreshRequest {
  refresh_token: string;
}

export interface IRefreshResponse extends IBaseResponse {
  data: {
    token: Pick<ITokenData, 'access_token' | 'token_type' | 'expires_in'>;
  };
}
