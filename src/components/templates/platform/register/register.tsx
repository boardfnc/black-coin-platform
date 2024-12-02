'use client';

import Link from 'next/link';

import ROUTES from '@/constants/routes';

export default function PlatformRegister() {
  const onClickRegisterButton = () => {
    console.log('register');
  };

  return (
    <div className={'w-auto max-w-[400px] mx-auto px-[30px] sm:mt-[200px]'}>
      <div className={'flex flex-col gap-[70px]'}>
        <div className={'flex flex-col gap-10 mb-[100px]'}>
          <div className={'flex flex-col justify-center items-center gap-3'}>
            <div className={'text-yellow-50 font-suit-32-750-130 py-5'}>Service Name</div>
          </div>

          <div className={'flex flex-col gap-[80px]'}>
            <div
              className={'text-center text-gray-10 font-suit-22-b-144 whitespace-pre'}
            >{`회원가입을 위해\n아래 항목을 입력해 주세요.`}</div>

            <div className={'flex flex-col gap-10'}>
              <div className={'flex flex-col gap-6'}>
                <input
                  className={'px-3 py-4 border-b border-gray-80 placeholder:text-gray-60 font-suit-16-400-130'}
                  placeholder={'아이디'}
                />
                <input
                  type={'password'}
                  className={'px-3 py-4 border-b border-gray-80 placeholder:text-gray-60 font-suit-16-400-130'}
                  placeholder={'비밀번호'}
                />
                <input
                  type={'password'}
                  className={'px-3 py-4 border-b border-gray-80 placeholder:text-gray-60 font-suit-16-400-130'}
                  placeholder={'비밀번호 확인'}
                />
                <div className={'flex gap-2'}>
                  <input
                    className={'px-3 py-4 border-b border-gray-80 placeholder:text-gray-60 font-suit-16-400-130 w-1/3'}
                    placeholder={'010'}
                  />
                  <input
                    className={'px-3 py-4 border-b border-gray-80 placeholder:text-gray-60 font-suit-16-400-130 w-1/3'}
                    placeholder={'0000'}
                  />
                  <input
                    className={'px-3 py-4 border-b border-gray-80 placeholder:text-gray-60 font-suit-16-400-130 w-1/3'}
                    placeholder={'0000'}
                  />
                </div>
                <input
                  className={'px-3 py-4 border-b border-gray-80 placeholder:text-gray-60 font-suit-16-400-130'}
                  placeholder={'추천코드'}
                />
                <select className={'px-3 py-4 border-b border-gray-80 text-gray-60 font-suit-16-400-130'}>
                  <option value={''}>은행선택</option>
                  <option value={'kb'}>국민은행</option>
                  <option value={'shinhan'}>신한은행</option>
                  <option value={'woori'}>우리은행</option>
                </select>
                <input
                  className={'px-3 py-4 border-b border-gray-80 placeholder:text-gray-60 font-suit-16-400-130'}
                  placeholder={'예금주'}
                />
                <input
                  className={'px-3 py-4 border-b border-gray-80 placeholder:text-gray-60 font-suit-16-400-130'}
                  placeholder={'계좌번호'}
                />
              </div>

              <div className={'flex flex-col gap-5'}>
                <button
                  className={'h-12 text-gray-100 bg-gray-0 rounded-3xl font-suit-17-m-130'}
                  onClick={onClickRegisterButton}
                >
                  회원가입
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
