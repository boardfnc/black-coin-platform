'use client';

import { useQuery } from '@tanstack/react-query';

import { userInformationShowService } from '@/services/auth/user';
import { useLogin } from '@/stores/login';

export default function Header() {
  const { openModal } = useLogin();

  const { data } = useQuery({
    queryKey: ['auth', 'userInformationShow'],
    queryFn: userInformationShowService,
  });

  const isLogin = data?.data?.nm != null;

  const onClickAuthorButton = () => {
    openModal();
  };

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
