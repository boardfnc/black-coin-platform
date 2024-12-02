'use server';

import { fetch } from '../_fetch';

import type {
  IAdminMemberAccountNumberUpdateRequest,
  IAdminMemberAccountNumberUpdateResponse,
  IAdminMemberDealingsRequest,
  IAdminMemberDealingsResponse,
  IAdminMemberGradeIdRequest,
  IAdminMemberGradeIdResponse,
  IAdminMemberGradeInitializationRequest,
  IAdminMemberGradeInitializationResponse,
  IAdminMemberGradesRequest,
  IAdminMemberGradesResponse,
  IAdminMemberGradeUpdateRequest,
  IAdminMemberGradeUpdateResponse,
  IAdminMemberIdRequest,
  IAdminMemberIdResponse,
  IAdminMemberPasswordUpdateRequest,
  IAdminMemberPasswordUpdateResponse,
  IAdminMemberPaymentRequest,
  IAdminMemberPaymentResponse,
  IAdminMemberRequest,
  IAdminMemberResponse,
  IAdminMemberRetrievalMembersRequest,
  IAdminMemberRetrievalMembersResponse,
  IAdminMemberRetrievalRequest,
  IAdminMemberRetrievalResponse,
  IAdminMemberStatusUpdateRequest,
  IAdminMemberStatusUpdateResponse,
  IAdminMemberSubscribeConsentRequest,
  IAdminMemberSubscribeConsentResponse,
  IAdminMemberSubscribeRejectionRequest,
  IAdminMemberSubscribeRejectionResponse,
  IAdminMemberSubscribesRequest,
  IAdminMemberSubscribesResponse,
} from './adminMembers.types';
import type { OptionsType } from '../_fetch/types';

export async function adminMemberService(params: IAdminMemberRequest, options?: OptionsType) {
  const response = await fetch<IAdminMemberResponse>(`/member/admin-members`, {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function adminMemberIdService(params: IAdminMemberIdRequest, options?: OptionsType) {
  const response = await fetch<IAdminMemberIdResponse>(`/member/admin-member/${params.id}`, {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function adminMemberDealingsService(params: IAdminMemberDealingsRequest, options?: OptionsType) {
  const response = await fetch<IAdminMemberDealingsResponse>(`/member/admin-member/dealings/${params.id}`, {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function adminMemberPasswordUpdateService(
  params: IAdminMemberPasswordUpdateRequest,
  options?: OptionsType,
) {
  const response = await fetch<IAdminMemberPasswordUpdateResponse>(
    `/member/admin-member/password-update/${params.id}`,
    {
      method: 'PUT',
      params,
      ...options,
    },
  );

  return response;
}

export async function adminMemberStatusUpdateService(params: IAdminMemberStatusUpdateRequest, options?: OptionsType) {
  const response = await fetch<IAdminMemberStatusUpdateResponse>(`/member/admin-member/status-update/${params.id}`, {
    method: 'PUT',
    params,
    ...options,
  });

  return response;
}

export async function adminMemberAccountNumberUpdateService(
  params: IAdminMemberAccountNumberUpdateRequest,
  options?: OptionsType,
) {
  const response = await fetch<IAdminMemberAccountNumberUpdateResponse>(
    `/member/admin-member/account-number-update/${params.id}`,
    {
      method: 'PUT',
      params,
      ...options,
    },
  );

  return response;
}

export async function adminMemberGradeUpdateService(params: IAdminMemberGradeUpdateRequest, options?: OptionsType) {
  const response = await fetch<IAdminMemberGradeUpdateResponse>(`/member/admin-member/grade-update/${params.id}`, {
    method: 'PUT',
    params,
    ...options,
  });

  return response;
}

export async function adminMemberGradeInitializationService(
  params: IAdminMemberGradeInitializationRequest,
  options?: OptionsType,
) {
  const response = await fetch<IAdminMemberGradeInitializationResponse>(
    `/member/admin-member/grade-initialization/${params.id}`,
    {
      method: 'PUT',
      params,
      ...options,
    },
  );

  return response;
}

export async function adminMemberRetrievalService(params: IAdminMemberRetrievalRequest, options?: OptionsType) {
  const response = await fetch<IAdminMemberRetrievalResponse>(`/member/admin-member/retrieval`, {
    method: 'POST',
    params,
    ...options,
  });

  return response;
}

export async function adminMemberPaymentService(params: IAdminMemberPaymentRequest, options?: OptionsType) {
  const response = await fetch<IAdminMemberPaymentResponse>(`/member/admin-member/payment`, {
    method: 'POST',
    params,
    ...options,
  });

  return response;
}

export async function adminMemberGradesService(params: IAdminMemberGradesRequest, options?: OptionsType) {
  const response = await fetch<IAdminMemberGradesResponse>(`/member/admin-member-grades`, {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function adminMemberGradeIdService(params: IAdminMemberGradeIdRequest, options?: OptionsType) {
  const response = await fetch<IAdminMemberGradeIdResponse>(`/member/admin-member-grade/${params.id}`, {
    method: 'PUT',
    params,
    body: JSON.stringify(params),
    ...options,
  });

  return response;
}

export async function adminMemberSubscribesService(params: IAdminMemberSubscribesRequest, options?: OptionsType) {
  const response = await fetch<IAdminMemberSubscribesResponse>(`/member/admin-member-subscribes`, {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function adminMemberSubscribeConsentService(
  params: IAdminMemberSubscribeConsentRequest,
  options?: OptionsType,
) {
  const response = await fetch<IAdminMemberSubscribeConsentResponse>(`/member/admin-member-subscribe/consent`, {
    method: 'POST',
    params,
    ...options,
  });

  return response;
}

export async function adminMemberSubscribeRejectionService(
  params: IAdminMemberSubscribeRejectionRequest,
  options?: OptionsType,
) {
  const response = await fetch<IAdminMemberSubscribeRejectionResponse>(`/member/admin-member-subscribe/rejection`, {
    method: 'POST',
    params,
    ...options,
  });

  return response;
}

export async function adminMemberRetrievalMembersService(
  params: IAdminMemberRetrievalMembersRequest,
  options?: OptionsType,
) {
  const response = await fetch<IAdminMemberRetrievalMembersResponse>(`/member/admin-retrieval-members`, {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}
