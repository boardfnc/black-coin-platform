import type { IBaseResponse } from '../_fetch/types';

export interface IIPResponse extends IBaseResponse {
  data: {
    ip: string;
  };
}
