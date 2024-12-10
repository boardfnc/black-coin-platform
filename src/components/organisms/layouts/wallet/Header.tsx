'use client';

import { useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import useClient, { clientInformationKey } from '@/hooks/client';
import { automaticLoginService } from '@/services/platform/auth/login';
import { automaticLoginQueryKey } from '@/services/platform/auth/login.query';
import { logoutService } from '@/services/platform/auth/logout';
import { useJoin } from '@/stores/join';
import { useLogin } from '@/stores/login';

export default function Header() {
  const { openModal: openLoginModal } = useLogin();
  const { openModal: openJoinModal } = useJoin();
  const [autoLogin] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.cookie.includes('auto-login=true');
    }
    return false;
  });

  const { isLogin } = useClient();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const essentialKey = searchParams.get('essential-key');

  const { data } = useQuery({
    queryKey: automaticLoginQueryKey,
    queryFn: () => automaticLoginService({ autoLogin, code: code!, esntl_key: essentialKey! }),
    enabled: !!autoLogin && !!code && !!essentialKey,
  });

  const { mutate: logout } = useMutation({
    mutationFn: logoutService,
    onSuccess(data) {
      if (data != null) {
        if (data.status) {
          queryClient.setQueryData(clientInformationKey, {
            ...queryClient.getQueryData(clientInformationKey),
            isLogin: true,
          });
        }
      }
    },
  });

  const isJoin = data?.status_code === '0010001';

  const onClickAuthorButton = () => {
    if (isLogin) {
      logout(undefined);
    } else {
      openLoginModal();
    }
  };

  useEffect(() => {
    if (isJoin) openJoinModal();
  }, [isJoin, openJoinModal]);

  return (
    <div className={'sticky top-0 z-50 h-[70px] flex justify-between items-center px-10 bg-gray-0'}>
      <div className={'text-yellow-50 font-suit-32-750-130'}>Navigation</div>

      <button
        className={'h-[28px] text-gray-100 bg-gray-0 border border-gray-100 rounded-[60px] px-4 font-suit-13-m-130'}
        onClick={onClickAuthorButton}
      >
        {isLogin ? '로그아웃' : '로그인'}
      </button>
    </div>
  );
}
