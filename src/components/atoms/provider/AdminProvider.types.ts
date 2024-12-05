import type { ReactNode } from 'react';

import type { ITokenData } from '@/services/_fetch/types';
import type { IMyData } from '@/services/admin/auth/login.types';

export interface IAdminProviderProps {
  author?: ITokenData & IMyData;
  children: ReactNode;
}
