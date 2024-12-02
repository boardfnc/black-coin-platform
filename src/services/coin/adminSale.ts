import { fetch } from '../_fetch';

import type {
  IAdminSaleManagerHistoryRequest,
  IAdminSaleManagerHistoryResponse,
  IAdminSaleManagerRequest,
  IAdminSaleManagerResponse,
  IAdminSaleManagersRequest,
  IAdminSaleManagersResponse,
  IAdminSaleMemberResponse,
  IAdminSaleMemberRequest,
  IAdminSaleMembersRequest,
  IAdminSaleMembersResponse,
  IAdminSaleMemberHistoryRequest,
  IAdminSaleMemberHistoryResponse,
} from './adminSale.types';
import type { OptionsType } from '../_fetch/types';

export async function adminSaleManagersService(params: IAdminSaleManagersRequest, options?: OptionsType) {
  const response = await fetch<IAdminSaleManagersResponse>('/coin/admin-sale-managers', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function adminSaleManagerService(params: IAdminSaleManagerRequest, options?: OptionsType) {
  const response = await fetch<IAdminSaleManagerResponse>('/coin/admin-sale-manager', {
    method: 'POST',
    params,
    body: JSON.stringify(params),
    ...options,
  });

  return response;
}

export async function adminSaleManagerHistoryService(params: IAdminSaleManagerHistoryRequest, options?: OptionsType) {
  const response = await fetch<IAdminSaleManagerHistoryResponse>('/coin/admin-sale-manager/history', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function adminSaleMembersService(params: IAdminSaleMembersRequest, options?: OptionsType) {
  const response = await fetch<IAdminSaleMembersResponse>('/coin/admin-sale-members', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function adminSaleMemberService(params: IAdminSaleMemberRequest, options?: OptionsType) {
  const response = await fetch<IAdminSaleMemberResponse>('/coin/admin-sale-member', {
    method: 'POST',
    params,
    body: JSON.stringify(params),
    ...options,
  });

  return response;
}

export async function adminSaleMemberHistoryService(params: IAdminSaleMemberHistoryRequest, options?: OptionsType) {
  const response = await fetch<IAdminSaleMemberHistoryResponse>('/coin/admin-sale-member/history', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}
