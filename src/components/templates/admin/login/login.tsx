'use client';

import { useRouter } from 'next/navigation';

import type { FormEvent } from 'react';
import { useState } from 'react';

import { Image } from '@/components/atoms/images';
import ROUTES from '@/constants/routes';
import { useRequest } from '@/hooks';
import LockImage from '@/images/icons/lock.png';
import { adminLoginService } from '@/services/admin/auth';

export default function AdminLogin() {
  const { request } = useRequest();

  const router = useRouter();

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = await request(
      () =>
        adminLoginService({
          login_id: loginId,
          password,
        }),
      { visibleErrorMessage: true },
    );

    if (data?.status) router.push(ROUTES.ADMIN.MAIN);
  };

  return (
    <div className={'bg-[#f9f3ed] flex flex-row justify-center w-full'}>
      <div className={'bg-[#f9f3ed] w-[1920px] h-screen'}>
        <div className={'inline-flex top-[290px] left-[460px] items-center relative'}>
          <form
            onSubmit={handleLoginSubmit}
            className={
              'flex flex-col w-[500px] h-[500px] gap-[60px] px-[60px] py-10 bg-white rounded-[32px_0px_0px_32px] items-center relative'
            }
          >
            <div className={'flex-col items-center gap-10 flex-[0_0_auto] flex relative self-stretch w-full'}>
              <div className={'flex-col items-center gap-2 flex-[0_0_auto] flex relative self-stretch w-full'}>
                <div className={'text-gray-0 font-pre-24-b-130'}>Admin Login</div>
                <div className={'text-gray-0 font-pre-22-m-130'}>관리자 어드민</div>
              </div>

              <div className={'flex-col items-start gap-2.5 flex-[0_0_auto] flex relative self-stretch w-full'}>
                <div className={'flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]'}>
                  <div className={'text-gray-60 font-pre-14-m-130'}>관리자아이디</div>
                  <input
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    placeholder={'아이디 입력'}
                    className={
                      'w-full h-14 px-0 py-[15px] bg-variable-collection-color-gray-100 border-b border-variable-collection-color-gray-80 placeholder:text-gray-50 text-gray-0'
                    }
                  />
                </div>

                <div className={'flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]'}>
                  <div className={'text-gray-60 font-pre-14-m-130'}>비밀번호</div>
                  <input
                    type={'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={'비밀번호 입력'}
                    className={
                      'w-full h-14 px-0 py-[15px] bg-variable-collection-color-gray-100 border-b border-variable-collection-color-gray-80 placeholder:text-gray-50 text-gray-0'
                    }
                  />
                </div>
              </div>

              <button
                type={'submit'}
                className={
                  'flex h-14 items-center justify-center px-[40px] py-0 relative self-stretch w-full bg-yellow-50 rounded-2xl border border-solid border-variable-collection-color-yellow-50'
                }
              >
                <div className={'text-gray-100 font-pre-17-m-130'}>Sign in</div>
              </button>
            </div>
          </form>

          <div className={'relative w-[500px] h-[500px]'}>
            <div className={'h-[500px] bg-[#ffffff4c] rounded-[0px_32px_32px_0px] backdrop-blur-sm'}>
              <div className={'relative w-[393px] h-[350px] top-[75px] left-8'}>
                <div
                  className={
                    'absolute w-[350px] h-[350px] top-0 left-[43px] bg-[#fac03214] rounded-[175px] blur-[18.2px]'
                  }
                />

                <Image
                  className={'absolute w-[121px] h-[205px] top-[31px] left-[157px] object-cover'}
                  alt={'Lock'}
                  src={LockImage}
                />
                <div className={'absolute h-[42px] top-[239px] left-[108px] text-orange-orange50 font-pre-32-eb-130-2'}>
                  Service Name
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
