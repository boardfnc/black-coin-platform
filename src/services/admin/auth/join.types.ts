import type { IBaseResponse } from '../../_fetch/types';

export interface IJoinRequest {
  login_id: string;
  password: string;
  code: string;
  mp_no: string;
  esntl_key?: string;
  nm: string;
  bank: string;
  acnutno: string;
  dpstr: string;
}

export type TJoinResponse = IBaseResponse;
