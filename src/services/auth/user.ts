'use server';

import { fetch } from '../_fetch';

import type { IUserInformationShowResponse } from './user.types';

export async function userInformationShowService() {
  const response = await fetch<IUserInformationShowResponse>('/auth/user-information-show', {
    method: 'GET',
  });

  return response;
}
