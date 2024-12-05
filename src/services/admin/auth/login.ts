'use server';

import { cookies } from 'next/headers';

import { fetch } from '../../_fetch';

import type {
  IAutomaticLoginRequest,
  IAutomaticLoginResponse,
  IAdminLoginRequest,
  IPlatformLoginRequest,
  ILoginResponse,
} from './login.types';
import type { OptionsType } from '../../_fetch/types';

export async function adminLoginService(data: IAdminLoginRequest, options?: OptionsType) {
  const response = await fetch<ILoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });

  if (response != null && response.data != null) {
    const tokenData = {
      token_type: response.data.token.token_type,
      member_type: response.data.token.member_type,
      access_token: response.data.token.access_token,
      refresh_token: response.data.token.refresh_token,
      expires_in: response.data.token.expires_in,
      mngr_id: response.data.me.mngr_id,
      mngr_se: response.data.me.mngr_se,
      mngr_sttus: response.data.me.mngr_sttus,
      login_id: response.data.me.login_id,
    };

    const cookie = await cookies();

    cookie.set('token', JSON.stringify(tokenData), {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      expires: new Date(Date.now() + (Number(tokenData.expires_in) + 365 * 24 * 60 * 60) * 1000),
    });
  }

  return response;
}

export async function platformLoginService(data: IPlatformLoginRequest, options?: OptionsType) {
  const response = await fetch<ILoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });

  if (response != null && response.data != null) {
    const tokenData = {
      token_type: response.data.token.token_type,
      member_type: response.data.token.member_type,
      access_token: response.data.token.access_token,
      refresh_token: response.data.token.refresh_token,
      expires_in: response.data.token.expires_in,
      mngr_id: response.data.me.mngr_id,
      mngr_se: response.data.me.mngr_se,
      mngr_sttus: response.data.me.mngr_sttus,
      login_id: response.data.me.login_id,
    };

    const cookie = await cookies();

    cookie.set('token', JSON.stringify(tokenData), {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      expires: new Date(Date.now() + (Number(tokenData.expires_in) + 365 * 24 * 60 * 60) * 1000),
    });
  }

  return response;
}

export async function automaticLoginService(data: IAutomaticLoginRequest, options?: OptionsType) {
  const response = await fetch<IAutomaticLoginResponse>('/auth/automatic-login', {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });

  if (response != null && response.data != null) {
    const tokenData = {
      token_type: response.data.token.token_type,
      member_type: response.data.token.member_type,
      access_token: response.data.token.access_token,
      refresh_token: response.data.token.refresh_token,
      expires_in: response.data.token.expires_in,
      mngr_id: response.data.me.mngr_id,
      mngr_se: response.data.me.mngr_se,
      mngr_sttus: response.data.me.mngr_sttus,
      login_id: response.data.me.login_id,
    };

    const cookie = await cookies();

    cookie.set('token', JSON.stringify(tokenData), {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      expires: new Date(Date.now() + (Number(tokenData.expires_in) + 365 * 24 * 60 * 60) * 1000),
    });
  }

  return response;
}
