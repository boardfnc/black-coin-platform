'use client';

import { redirect, useSearchParams } from 'next/navigation';

import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { ROUTES } from '@/constants';
import { automaticLoginService } from '@/services/platform/auth/login';
import { automaticLoginQueryKey } from '@/services/platform/auth/login.query';
import { logoutService } from '@/services/platform/auth/logout';
import { useJoin } from '@/stores/join';
import { useLogin } from '@/stores/login';

export default function Header() {
  const { openModal: openLoginModal } = useLogin();
  const { openModal: openJoinModal } = useJoin();

  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const essentialKey = searchParams.get('essential-key');

  const { data } = useQuery({
    queryKey: automaticLoginQueryKey,
    queryFn: () => automaticLoginService({ code: code!, esntl_key: essentialKey! }),
    enabled: !!code && !!essentialKey,
  });

  const isLogin = data?.status === true;
  const isJoin = data?.status_code === '0010001';

  const onClickAuthorButton = () => {
    if (isLogin) {
      logoutService();

      redirect(ROUTES.PLATFORM.HOME);
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
