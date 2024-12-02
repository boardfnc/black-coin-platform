export type UrlType = RequestInfo | URL;

export type OptionsType = RequestInit & { params?: unknown };

export type ReturnType<T> = Promise<T | undefined>;

export interface ITokenData {
  token_type: string;
  member_type: string;
  access_token: string;
  refresh_token: string;
  expires_in: string;
}

export interface IBaseResponse {
  status: boolean;
  status_code: string;
  message?: string;
}

export interface IBaseWithPageResponse {
  status: boolean;
  status_code: string;
  message: string;
  pagination: IPagination;
}

export interface IPagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}

export interface INodeBaseResponse {
  status: boolean;
  status_code: string;
}

export enum EStatusCode {
  토큰_성공 = '0000000',
  토큰_엑세스_만료 = '0104001',
  토큰_세션_만료 = '0104002',
  토큰_리플레시_토큰_만료 = '0104003',
  토큰_기타_오류 = '0104004',
  토큰_액세스_토큰_불일치 = '0104005',
  토큰_로그인이_되어있지_않음 = '0104006',
  토큰이_올바르지_않음 = '0104007',
  리프레시_토큰_불일치 = '0103001',
  리프레시_토큰_앱_키_값이_다를_때 = '0103002',
  리프레시_토큰_IP_불일치 = '0103003',
  리프레시_토큰_수정_불가능 = '0103004',
  리프레시_토큰_수정_불가능_기타 = '0103005',
  리프레시_토큰_발급_실패 = '0103006',
  리프레시_토큰_기타 = '0103007',
}
