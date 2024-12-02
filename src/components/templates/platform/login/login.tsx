'use client';

import Link from 'next/link';

import { IconLine24ArrowRight } from '@/components/atoms/icons/icon-line';
import ROUTES from '@/constants/routes';

export default function PlatformLogin() {
  const onClickLoginButton = () => {
    console.log('login');
  };

  return (
    <div className={'w-auto max-w-[400px] mx-auto px-[30px] mt-[40px] sm:mt-[200px]'}>
      <div className={'flex flex-col gap-[70px]'}>
        <div className={'flex flex-col gap-10'}>
          <div className={'flex flex-col justify-center items-center gap-3'}>
            <div className={'text-yellow-50 font-suit-32-750-130'}>Service Name</div>
            <div className={'text-gray-10 font-suit-17-r-130'}>Message</div>
          </div>

          <div className={'flex flex-col gap-10'}>
            <div className={'flex flex-col gap-6'}>
              <input
                className={'px-3 py-4 border-b border-gray-80 placeholder:text-gray-60 font-suit-16-400-130'}
                placeholder={'아이디'}
              />
              <input
                className={'px-3 py-4 border-b border-gray-80 placeholder:text-gray-60 font-suit-16-400-130'}
                placeholder={'비밀번호'}
              />
            </div>

            <div className={'flex flex-col gap-5'}>
              <button
                className={'h-12 text-gray-100 bg-gray-0 rounded-3xl font-suit-17-m-130'}
                onClick={onClickLoginButton}
              >
                로그인
              </button>

              <Link
                href={ROUTES.PLATFORM.FORGOT_AUTHOR.ID}
                className={'text-gray-30 font-suit-14-r-130 underline mx-auto'}
              >
                아이디/비밀번호를 잊어버렸나요?
              </Link>
            </div>
          </div>

          <div className={'text-center mx-auto'}>
            <Link
              href={ROUTES.PLATFORM.REGISTER}
              className={
                'font-suit-14-r-130 flex flex-row gap-[6px] items-center text-gray-10 border rounded-[60px] ps-3 pe-2 h-10'
              }
            >
              회원가입 바로가기 <IconLine24ArrowRight width={18} height={18} />
            </Link>
          </div>
        </div>

        <div className={'flex flex-row gap-1 justify-center whitespace-pre'}>
          <span className={'text-yellow-50 font-suit-12-750-130'}>Service Name</span>
          <span className={'text-gray-40 font-suit-12-r-130'}>Copyright Ⓒ 2024 company All Rights Reserved.</span>
        </div>
      </div>
    </div>
  );
}
