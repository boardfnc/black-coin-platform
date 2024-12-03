/* eslint-disable import/no-cycle */

'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getIsHttpProtocol, getTokenAuthorization, outPutConsoleDebug, paramsTransform, parseData } from './utils';
import { refreshService } from '../auth/refresh';

import type { OptionsType, ReturnType, UrlType } from './types';

import { BASE_API_URL } from '@/constants';
import ROUTES from '@/constants/routes';
import { isAccessTokenError, isRefreshTokenError } from '@/utils';

const fetchFunction = async <T = Response,>(url: UrlType, options?: OptionsType): ReturnType<T> => {
  const { params, ...restOptions } = options ?? {};

  if (!BASE_API_URL) redirect(ROUTES.ROOT);

  const tokenData = await getTokenAuthorization();
  const isHttpProtocol = getIsHttpProtocol(url);
  const searchParams = paramsTransform(params);
  const prefixParams = !!searchParams ? '?' + searchParams.toString() : '';
  const combinedUrl = isHttpProtocol ? url + prefixParams : BASE_API_URL + url + prefixParams;

  try {
    const startTime = new Date().getTime();
    const response = await fetch(combinedUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: tokenData ? tokenData.token_type + ' ' + tokenData.access_token : '',
      },
      credentials: 'include',
      ...restOptions,
      next: {
        ...restOptions?.next,
        tags: ['fetch'],
      },
      redirect: 'follow',
    });

    const endTime = new Date().getTime();

    if (response.status !== 400 && response.status !== 401 && response.status !== 303 && !response.ok) throw response;

    const data = await parseData(response);

    outPutConsoleDebug(response, data, endTime - startTime);

    const statusCode = data.status_code;

    // MARK: JWT Access Token Error Handle
    if (tokenData && isAccessTokenError(statusCode)) {
      const refreshResponse = await refreshService(tokenData);
      if (refreshResponse?.status) return fetchFunction(url, options);
    }

    // MARK: JWT Refresh Token Error Handle
    if (isRefreshTokenError(statusCode)) {
      const cookie = await cookies();
      cookie.delete('token');
    }

    return data;
  } catch (error) {
    const errorResponse = error as Response;

    if (errorResponse?.statusText === 'Unauthorized') revalidateTag('fetch');

    throw errorResponse?.statusText || 'Unknown Error';
  }
};

export { fetchFunction as fetch };
