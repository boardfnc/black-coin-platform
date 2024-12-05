'use server';

import { fetch } from '../../_fetch';

import type {
  IAdminManagerDetailHistoryRequest,
  IAdminManagerDetailHistoryResponse,
  IAdminManagerDetailsRequest,
  IAdminManagerDetailsResponse,
  IAdminMemberDetailHistoryRequest,
  IAdminMemberDetailHistoryResponse,
  IAdminMemberDetailsRequest,
  IAdminMemberDetailsResponse,
} from './adminManager.types';
import type { OptionsType } from '../../_fetch/types';

export async function adminManagerDetailsService(params: IAdminManagerDetailsRequest, options?: OptionsType) {
  const response = await fetch<IAdminManagerDetailsResponse>('/dealings/admin-manager-details', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function adminManagerDetailHistoryService(
  params: IAdminManagerDetailHistoryRequest,
  options?: OptionsType,
) {
  const response = await fetch<IAdminManagerDetailHistoryResponse>('/dealings/admin-manager-detail/history', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function adminMemberDetailsService(params: IAdminMemberDetailsRequest, options?: OptionsType) {
  const response = await fetch<IAdminMemberDetailsResponse>('/dealings/admin-member-details', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function adminMemberDetailHistoryService(params: IAdminMemberDetailHistoryRequest, options?: OptionsType) {
  const response = await fetch<IAdminMemberDetailHistoryResponse>('/dealings/admin-member-detail/history', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}
