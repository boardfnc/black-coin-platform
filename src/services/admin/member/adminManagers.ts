'use server';

import { fetch } from '../../_fetch';

import type {
  IAdminManagerAccountNumberUpdateRequest,
  IAdminManagerAccountUpdateRequest,
  IAdminManagerAccountUpdateResponse,
  IAdminManagerDealingsRequest,
  IAdminManagerDealingsResponse,
  IAdminManagerDeleteRequest,
  IAdminManagerDeleteResponse,
  IAdminManagerFeeUpdateRequest,
  IAdminManagerFeeUpdateResponse,
  IAdminManagerIdRequest,
  IAdminManagerIdResponse,
  IAdminManagersPostRequest,
  IAdminManagersRequest,
  IAdminManagersResponse,
  IAdminManagerStatusUpdateRequest,
  IAdminManagerStatusUpdateResponse,
  TAdminManagersPostResponse,
} from './adminManagers.types';
import type { OptionsType } from '../../_fetch/types';

export async function adminManagersService(params: IAdminManagersRequest, options?: OptionsType) {
  const response = await fetch<IAdminManagersResponse>('/member/admin-managers', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function adminManagersPostService(params: IAdminManagersPostRequest, options?: OptionsType) {
  const response = await fetch<TAdminManagersPostResponse>('/member/admin-manager', {
    method: 'POST',
    params,
    body: JSON.stringify(params),
    ...options,
  });

  return response;
}

export async function adminManagerIdService(params: IAdminManagerIdRequest, options?: OptionsType) {
  const response = await fetch<IAdminManagerIdResponse>(`/member/admin-manager/${params.id}`, {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function adminManagerDealingsService(params: IAdminManagerDealingsRequest, options?: OptionsType) {
  const response = await fetch<IAdminManagerDealingsResponse>(`/member/admin-manager/dealings/${params.id}`, {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function adminManagerAccountUpdateService(
  params: IAdminManagerAccountUpdateRequest,
  options?: OptionsType,
) {
  const response = await fetch<IAdminManagerAccountUpdateResponse>(
    `/member/admin-manager/account-update/${params.id}`,
    {
      method: 'PUT',
      params,
      ...options,
    },
  );

  return response;
}

export async function adminManagerAccountNumberUpdateService(
  params: IAdminManagerAccountNumberUpdateRequest,
  options?: OptionsType,
) {
  const response = await fetch<IAdminManagerAccountUpdateResponse>(
    `/member/admin-manager/account-number-update/${params.id}`,
    {
      method: 'PUT',
      params,
      ...options,
    },
  );

  return response;
}

export async function adminManagerFeeUpdateService(params: IAdminManagerFeeUpdateRequest, options?: OptionsType) {
  const response = await fetch<IAdminManagerFeeUpdateResponse>(`/member/admin-manager/fee-update/${params.id}`, {
    method: 'PUT',
    params,
    ...options,
  });

  return response;
}

export async function adminManagerDeleteService(params: IAdminManagerDeleteRequest, options?: OptionsType) {
  const response = await fetch<IAdminManagerDeleteResponse>(`/member/admin-manager/delete/${params.id}`, {
    method: 'PUT',
    params,
    ...options,
  });

  return response;
}

export async function adminManagerStatusUpdateService(params: IAdminManagerStatusUpdateRequest, options?: OptionsType) {
  const response = await fetch<IAdminManagerStatusUpdateResponse>(`/member/admin-manager/status-update/${params.id}`, {
    method: 'PUT',
    params,
    ...options,
  });

  return response;
}
