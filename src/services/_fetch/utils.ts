import { cookies } from 'next/headers';

import type { ITokenData, UrlType } from './types';

import { IS_PRODUCTION } from '@/constants/env';

/**
 * 토큰을 HTTP Protocol Authority 규격에 맞게 문자열로 반환하는 함수입니다.
 * @returns string
 */
export const getTokenAuthorization = async () => {
  const cookieStore = await cookies();
  const tokenCookieValue = cookieStore.get('token')?.value;

  if (!tokenCookieValue) return undefined;

  const tokenData: ITokenData = JSON.parse(tokenCookieValue);

  return tokenData;
};

/**
 * URL이 http 프로토콜인지 확인하는 함수입니다.
 * @param url
 * @returns RegExpMatchArray | null
 */
export const getIsHttpProtocol = (url: UrlType) => !!url.toString().match(/^(http|\/api)/i);

/**
 * 데이터가 배열인 경우 전달 파라미터 값 변경 로직입니다.
 * @param params
 */
export const paramsTransform = (params: unknown) => {
  const searchParams = new URLSearchParams();

  if (!!params) {
    if (typeof params === 'object' && params !== null) {
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => item != null && searchParams.append(`${key}[]`, item));
        } else if (value != null) {
          searchParams.set(key, value.toString());
        }
      });
    }
  }

  return searchParams;
};

/**
 * 정상적인 값을 가지고 왔는지 확인하고 반환합니다.
 * @param Response
 * @returns boolean
 */
export const parseData = async (response: Response) => await response.json();

/**
 *
 */
export const outPutConsoleDebug = (response: Response, data?: unknown, time?: number) =>
  !IS_PRODUCTION &&
  console.debug(
    `${response.status === 200 ? '\x1b[32m%s' : '\x1b[31m%s'}\x1b[0m%s${
      response.status !== 200 ? '\x1b[31m%s' : '\x1b[0m'
    }\x1b[30m`,
    `[${response.status}]`,
    response.url,
    `${time != null ? `(${time}ms)` : ''}`,
    `${
      response.status !== 200
        ? (() => {
            if (data != null) {
              if (typeof data === 'object' && data !== null && 'message' in data) {
                return `(${data.message})`;
              }
              return '(데이터가 존재하지 않습니다.)';
            }
            return '(데이터가 존재하지 않습니다.)';
          })()
        : ''
    }`,
  );

/**
 * url 주소에 params를 붙여주는 함수입니다.
 * @param path
 * @param params
 * @returns domain + path + params
 */
export const generateParams = (path: string, params: unknown) => {
  const paramQuery = path.includes('?') ? '&' : '?';

  if (typeof params === 'object' && params !== null) {
    const paramsObject = params as { [key: string]: unknown };
    Object.keys(paramsObject).forEach((key) => {
      if (paramsObject[key] == null) {
        delete paramsObject[key];
      }
    });
  }

  const searchParamsText = new URLSearchParams(params as Record<string, string>).toString();

  return `${path}${searchParamsText ? paramQuery + searchParamsText : ''}`;
};
