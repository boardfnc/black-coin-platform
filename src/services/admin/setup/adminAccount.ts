'use server';

import { fetch } from '../../_fetch';

import type {
  IAdminAccountResponse,
  IAdminAccountUpdateRequest,
  TAdminAccountUpdateResponse,
} from './adminAccount.types';
import type { OptionsType } from '../../_fetch/types';

export async function setUpAdminAccountService(options?: OptionsType) {
  const response = await fetch<IAdminAccountResponse>('/setup/admin-account', {
    method: 'GET',
    ...options,
  });

  return response;
}

export async function setUpAdminAccountUpdateService(params: IAdminAccountUpdateRequest) {
  const response = await fetch<TAdminAccountUpdateResponse>('/setup/admin-account', {
    method: 'POST',
    body: JSON.stringify(params),
  });

  return response;
}
