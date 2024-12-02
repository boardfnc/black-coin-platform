'use server';

import { fetch } from '../_fetch';

import type {
  IMemberRequest,
  IMemberResponse,
  IMembersResponse,
  IMembersRequest,
  IMemberDealingsRequest,
  IMemberDealingsResponse,
  IMemberPasswordUpdateRequest,
  TMemberPasswordUpdateResponse,
  IMemberAccountNumberUpdateRequest,
  TMemberAccountNumberUpdateResponse,
  IMemberStatusUpdateRequest,
  TMemberStatusUpdateResponse,
  IMemberRetrievalRequest,
  TMemberRetrievalResponse,
  IMemberPaymentRequest,
  TMemberPaymentResponse,
  IMemberGradeUpdateRequest,
  TMemberGradeUpdateResponse,
  IMemberGradeResponse,
  IMemberGradePutRequest,
  TMemberGradePutResponse,
  IMemberMyPageResponse,
  IMemberMyPageDealingsResponse,
  IMemberMyPageDealingsRequest,
  IMemberMyPagePasswordUpdateRequest,
  TMemberMyPagePasswordUpdateResponse,
  IMemberMyPageAccountUpdateRequest,
  TMemberMyPageAccountUpdateResponse,
  IMemberMyPageAccountNumberUpdateRequest,
  TMemberMyPageAccountNumberUpdateResponse,
  IMemberRetrievalMembersRequest,
  IMemberRetrievalMembersResponse,
} from './members.types';
import type { OptionsType } from '../_fetch/types';

export async function membersService(params: IMembersRequest, options?: OptionsType) {
  const response = await fetch<IMembersResponse>(`/member/members`, {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function memberService(params: IMemberRequest, options?: OptionsType) {
  const response = await fetch<IMemberResponse>(`/member/member/${params.id}`, {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function memberDealingsService(params: IMemberDealingsRequest, options?: OptionsType) {
  const response = await fetch<IMemberDealingsResponse>(`/member/member-dealings/${params.id}`, {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function memberPasswordUpdateService(params: IMemberPasswordUpdateRequest, options?: OptionsType) {
  const response = await fetch<TMemberPasswordUpdateResponse>(`/member/member/password-update/${params.id}`, {
    method: 'PUT',
    params,
    ...options,
  });

  return response;
}

export async function memberStatusUpdateService(params: IMemberStatusUpdateRequest, options?: OptionsType) {
  const response = await fetch<TMemberStatusUpdateResponse>(`/member/member/status-update/${params.id}`, {
    method: 'PUT',
    params,
    body: JSON.stringify(params),
    ...options,
  });

  return response;
}

export async function memberAccountNumberUpdateService(
  params: IMemberAccountNumberUpdateRequest,
  options?: OptionsType,
) {
  const response = await fetch<TMemberAccountNumberUpdateResponse>(
    `/member/member/account-number-update/${params.id}`,
    {
      method: 'PUT',
      params,
      body: JSON.stringify(params),
      ...options,
    },
  );

  return response;
}

export async function memberGradeUpdateService(params: IMemberGradeUpdateRequest, options?: OptionsType) {
  const response = await fetch<TMemberGradeUpdateResponse>(`/member/member/grade-update/${params.id}`, {
    method: 'PUT',
    params,
    body: JSON.stringify(params),
    ...options,
  });

  return response;
}

export async function memberRetrievalService(params: IMemberRetrievalRequest, options?: OptionsType) {
  const response = await fetch<TMemberRetrievalResponse>(`/member/member/retrieval`, {
    method: 'POST',
    params,
    body: JSON.stringify(params),
    ...options,
  });

  return response;
}

export async function memberPaymentService(params: IMemberPaymentRequest, options?: OptionsType) {
  const response = await fetch<TMemberPaymentResponse>(`/member/member/payment`, {
    method: 'POST',
    params,
    body: JSON.stringify(params),
    ...options,
  });

  return response;
}

export async function memberGradeService(options?: OptionsType) {
  const response = await fetch<IMemberGradeResponse>(`/member/member-grade`, {
    method: 'GET',
    ...options,
  });

  return response;
}

export async function memberGradePutService(params: IMemberGradePutRequest, options?: OptionsType) {
  const response = await fetch<TMemberGradePutResponse>(`/member/member-grade`, {
    method: 'PUT',
    params,
    body: JSON.stringify(params),
    ...options,
  });

  return response;
}

export async function memberMyPageService(options?: OptionsType) {
  const response = await fetch<IMemberMyPageResponse>(`/member/my-page`, {
    method: 'GET',
    ...options,
  });

  return response;
}

export async function memberMyPageDealingsService(params: IMemberMyPageDealingsRequest, options?: OptionsType) {
  const response = await fetch<IMemberMyPageDealingsResponse>(`/member/my-page/dealings`, {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function memberMyPageDealingsPutService(
  params: IMemberMyPagePasswordUpdateRequest,
  options?: OptionsType,
) {
  const response = await fetch<TMemberMyPagePasswordUpdateResponse>(`/member/my-page/password-update`, {
    method: 'PUT',
    params,
    body: JSON.stringify(params),
    ...options,
  });

  return response;
}

export async function memberMyPageAccountUpdateService(
  params: IMemberMyPageAccountUpdateRequest,
  options?: OptionsType,
) {
  const response = await fetch<TMemberMyPageAccountUpdateResponse>(`/member/my-page/account-update`, {
    method: 'PUT',
    params,
    body: JSON.stringify(params),
    ...options,
  });

  return response;
}

export async function memberMyPageAccountNumberUpdateService(
  params: IMemberMyPageAccountNumberUpdateRequest,
  options?: OptionsType,
) {
  const response = await fetch<TMemberMyPageAccountNumberUpdateResponse>(`/member/my-page/account-number-update`, {
    method: 'PUT',
    params,
    body: JSON.stringify(params),
    ...options,
  });

  return response;
}

export async function memberRetrievalMembersService(params: IMemberRetrievalMembersRequest, options?: OptionsType) {
  const response = await fetch<IMemberRetrievalMembersResponse>(`/member/retrieval-members`, {
    method: 'GET',
    params,
    ...options,
  });

  return response;
}

export async function mypagePasswordUpdateService(params: IMemberMyPagePasswordUpdateRequest, options?: OptionsType) {
  const response = await fetch<TMemberMyPagePasswordUpdateResponse>(`/member/my-page/password-update`, {
    method: 'PUT',
    params,
    body: JSON.stringify(params),
    ...options,
  });

  return response;
}
