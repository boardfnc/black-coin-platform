/* eslint-disable import/no-cycle */
'use server';

import { cookies } from 'next/headers';

import { fetch } from '../_fetch';

import type { IRefreshRequest, IRefreshResponse } from './refresh.types';

export async function refreshService(data: IRefreshRequest) {
  const response = await fetch<IRefreshResponse>('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response != null) {
    const tokenOverwriteData = {
      token_type: response.data.token.token_type,
      access_token: response.data.token.access_token,
      expires_in: response.data.token.expires_in,
    };

    const cookie = await cookies();
    const tokenData = cookie.get('token')?.value;

    if (tokenData != null) {
      const combinedTokenData = {
        ...JSON.parse(tokenData),
        ...tokenOverwriteData,
      };

      cookie.set('token', JSON.stringify(combinedTokenData), {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
        expires: new Date(Date.now() + Number(combinedTokenData.expires_in) * 1000),
      });
    }

    return response;
  }
}
