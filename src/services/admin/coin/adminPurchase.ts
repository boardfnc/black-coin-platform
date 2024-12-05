import { fetch } from '../../_fetch';

import type {
  IAdminPurchaseManageRequest,
  IAdminPurchaseManageResponse,
  IAdminPurchaseManagerHistoryRequest,
  IAdminPurchaseManagerHistoryResponse,
  IAdminPurchaseManagersRequest,
  IAdminPurchaseManagersResponse,
  IAdminPurchaseMemberHistoryRequest,
  IAdminPurchaseMemberHistoryResponse,
  IAdminPurchaseMemberRequest,
  IAdminPurchaseMemberResponse,
  IAdminPurchaseMembersRequest,
  IAdminPurchaseMembersResponse,
} from './adminPurchase.types';
import type { OptionsType } from '../../_fetch/types';

export async function adminPurchaseManagersService(params: IAdminPurchaseManagersRequest, options?: OptionsType) {
  const response = await fetch<IAdminPurchaseManagersResponse>('/coin/admin-purchase-managers', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function adminPurchaseManageService(params: IAdminPurchaseManageRequest, options?: OptionsType) {
  const response = await fetch<IAdminPurchaseManageResponse>('/coin/admin-purchase-manager', {
    method: 'POST',
    params,
    body: JSON.stringify(params),
    ...options,
  });

  return response;
}

export async function adminPurchaseManagerHistoryService(
  params: IAdminPurchaseManagerHistoryRequest,
  options?: OptionsType,
) {
  const response = await fetch<IAdminPurchaseManagerHistoryResponse>('/coin/admin-purchase-manager/history', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function adminPurchaseMembersService(params: IAdminPurchaseMembersRequest, options?: OptionsType) {
  const response = await fetch<IAdminPurchaseMembersResponse>('/coin/admin-purchase-members', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function adminPurchaseMemberService(params: IAdminPurchaseMemberRequest, options?: OptionsType) {
  const response = await fetch<IAdminPurchaseMemberResponse>('/coin/admin-purchase-member', {
    method: 'POST',
    params,
    body: JSON.stringify(params),
    ...options,
  });

  return response;
}

export async function adminPurchaseMemberHistoryService(
  params: IAdminPurchaseMemberHistoryRequest,
  options?: OptionsType,
) {
  const response = await fetch<IAdminPurchaseMemberHistoryResponse>('/coin/admin-purchase-member/history', {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}
