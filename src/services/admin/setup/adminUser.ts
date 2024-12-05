'use server';

import { fetch } from '../../_fetch';

import type { IAdminUserResponse } from './adminUser.types';
import type { OptionsType } from '../../_fetch/types';

export async function adminUserService(options?: OptionsType) {
  const response = await fetch<IAdminUserResponse>('/setup/admin-user', {
    method: 'GET',
    ...options,
  });

  return response;
}
