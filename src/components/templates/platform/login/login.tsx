'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IconLine24ArrowRight } from '@/components/atoms/icons/icon-line';
import { AlertModal } from '@/components/organisms/platform/modal';
import ROUTES from '@/constants/routes';
import { platformLoginService } from '@/services/platform/auth/login';
import { userInformationShowQueryKey } from '@/services/platform/auth/user.query';

export default function PlatformLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    title: '',
    description: '',
  });
  const [loginForm, setLoginForm] = useState({
    id: '',
    password: '',
    code: '',
  });

  const { mutate: platformLogin } = useMutation({
    mutationFn: platformLoginService,
    onSuccess(data) {
      if (data != null) {
        if (!data.status) {
          setAlertModal({
            isOpen: true,
            title: '로그인 실패',
            description: data.message || '로그인에 실패하였습니다.',
          });
        }

        if (data.status) {
          queryClient.invalidateQueries({ queryKey: userInformationShowQueryKey });

          return router.push(ROUTES.PLATFORM.HOME);
        }
      }
    },
  });

  const onClickLoginButton = () => {
    platformLogin({
      login_id: loginForm.id,
      password: loginForm.password,
      code: loginForm.code,
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onClickLoginButton();
  };

  return (
    <>
      <div className={'w-auto max-w-[400px] mx-auto px-[30px] mt-[40px] sm:mt-[200px]'}>
        <div className={'flex flex-col gap-[70px]'}>
          <div className={'flex flex-col gap-10'}>
            <div className={'flex flex-col justify-center items-center gap-3'}>
              <Link href={ROUTES.PLATFORM.HOME} className={'text-yellow-50 font-suit-32-750-130'}>
                Service Name
              </Link>

              <div className={'text-gray-10 font-suit-17-r-130'}>Message</div>
            </div>

            <form onSubmit={handleSubmit} className={'flex flex-col gap-10'}>
              <div className={'flex flex-col gap-6'}>
                <input
                  name={'code'}
                  value={loginForm.code}
                  onChange={handleChange}
                  className={'px-3 py-4 border-b border-gray-80 placeholder:text-gray-60 font-suit-16-400-130'}
                  placeholder={'추천코드'}
                />
                <input
                  name={'id'}
                  value={loginForm.id}
                  onChange={handleChange}
                  className={'px-3 py-4 border-b border-gray-80 placeholder:text-gray-60 font-suit-16-400-130'}
                  placeholder={'아이디'}
                />
                <input
                  name={'password'}
                  type={'password'}
                  value={loginForm.password}
                  onChange={handleChange}
                  className={'px-3 py-4 border-b border-gray-80 placeholder:text-gray-60 font-suit-16-400-130'}
                  placeholder={'비밀번호'}
                />
              </div>

              <div className={'flex flex-col gap-5'}>
                <button type={'submit'} className={'h-12 text-gray-100 bg-gray-0 rounded-3xl font-suit-17-m-130'}>
                  로그인
                </button>

                <Link
                  href={ROUTES.PLATFORM.FORGOT_AUTHOR.ID}
                  className={'text-gray-30 font-suit-14-r-130 underline mx-auto'}
                >
                  아이디/비밀번호를 잊어버렸나요?
                </Link>
              </div>
            </form>

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

      <AlertModal {...alertModal} onClose={() => setAlertModal({ ...alertModal, isOpen: false })} />
    </>
  );
}
