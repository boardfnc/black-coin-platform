import { fetch } from '../../_fetch';

import type { IAccountContactUpdateRequest, IAccountPasswordUpdateRequest, IAccountResponse } from './account.types';
import type { IBaseResponse } from '@/services/_fetch/types';

export async function accountShowService() {
  const response = await fetch<IAccountResponse>('/my-page/account-show', {
    method: 'GET',
  });

  return response;
}

export async function accountPasswordUpdateService(data: IAccountPasswordUpdateRequest) {
  const response = await fetch<IBaseResponse>('/my-page/account/password-update', {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  return response;
}

export async function accountContactUpdateService(data: IAccountContactUpdateRequest) {
  const response = await fetch<IBaseResponse>('/my-page/account/contact-update', {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  return response;
}
