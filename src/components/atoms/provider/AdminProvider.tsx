'use client';

import { createContext, useContext } from 'react';

import type { IAdminProviderProps } from './AdminProvider.types';
import type { ITokenData } from '@/services/_fetch/types';
import type { IMyData } from '@/services/admin/auth/login.types';

const AdminContext = createContext<(ITokenData & IMyData) | undefined>(undefined);

export function AdminProvider({ author, children }: IAdminProviderProps) {
  return <AdminContext.Provider value={author}>{children}</AdminContext.Provider>;
}

export function useAuthor() {
  const author = useContext(AdminContext);

  const managerId = author?.mngr_id;
  const memberGrade = author?.mngr_se;
  const memberStatus = author?.mngr_sttus;
  const loginId = author?.login_id;
  const isSuperAdmin = memberGrade === '1';

  return { managerId, memberGrade, memberStatus, loginId, isSuperAdmin };
}
