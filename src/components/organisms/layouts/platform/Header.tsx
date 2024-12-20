'use client';

import Link from 'next/link';

import { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { IconLine24Avatar, IconLine24Logout } from '@/components/atoms/icons/icon-line';
import { ROUTES } from '@/constants';
import { useClient } from '@/hooks';
import { clientInformationKey } from '@/hooks/client';
import { logoutService } from '@/services/platform/auth/logout';
import { userInformationShowService } from '@/services/platform/auth/user';
import { userInformationShowQueryKey } from '@/services/platform/auth/user.query';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const { isLogin } = useClient();

  const { data } = useQuery({
    queryKey: userInformationShowQueryKey,
    queryFn: () => userInformationShowService(),
    enabled: isLogin,
  });

  const { mutate: logout } = useMutation({
    mutationFn: () => logoutService(),
    onSuccess(data) {
      if (data != null) {
        if (data.status) {
          queryClient.setQueryData(clientInformationKey, {
            ...queryClient.getQueryData(clientInformationKey),
            isLogin: false,
          });
        }
      }
    },
  });

  return (
    <>
      <div className={'sm:hidden sticky top-0 left-0 right-0 z-50 bg-gray-100 px-5 shadow-Z1'}>
        <div className={'flex justify-between items-center h-[60px]'}>
          <Link href={ROUTES.PLATFORM.HOME} className={'text-yellow-50 font-suit-32-750-130'}>
            Black Coin
          </Link>

          <button onClick={() => setIsOpen(true)}>
            <svg xmlns={'http://www.w3.org/2000/svg'} width={'32'} height={'32'} viewBox={'0 0 32 32'} fill={'none'}>
              <path d={'M5.33398 8.00006H26.6673'} stroke={'#28282A'} strokeWidth={'2.4'} strokeLinecap={'round'} />
              <path d={'M13.334 16H26.016'} stroke={'#28282A'} strokeWidth={'2.4'} strokeLinecap={'round'} />
              <path d={'M9.33398 24H26.0007'} stroke={'#28282A'} strokeWidth={'2.4'} strokeLinecap={'round'} />
            </svg>
          </button>
        </div>
      </div>

      <div
        role={'button'}
        tabIndex={0}
        className={`cursor-default fixed inset-0 bg-gray-0 bg-opacity-50 transition-opacity z-50 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setIsOpen(false);
        }}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 h-full flex transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <button
            onClick={() => setIsOpen(false)}
            className={'h-10 -ml-10 aspect-square flex items-center justify-center bg-gray-0'}
          >
            <svg
              xmlns={'http://www.w3.org/2000/svg'}
              className={'h-6 w-6 text-gray-100'}
              fill={'none'}
              viewBox={'0 0 24 24'}
              stroke={'currentColor'}
            >
              <path strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={2} d={'M6 18L18 6M6 6l12 12'} />
            </svg>
          </button>

          <div
            role={'button'}
            tabIndex={0}
            className={'cursor-default h-full w-[280px] bg-gray-0 text-gray-100'}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setIsOpen(false);
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={'p-6 flex flex-col gap-[30px]'}>
              {!isLogin && (
                <div className={'flex flex-col gap-6 items-end justify-center pb-[30px] border-b border-gray-100'}>
                  <div>
                    <Link
                      href={ROUTES.PLATFORM.LOGIN}
                      className={
                        'flex items-center w-auto h-[28px] rounded-[60px] border border-gray-100 px-4 text-gray-100 font-suit-13-m-130'
                      }
                    >
                      로그인
                    </Link>
                  </div>

                  <div className={'text-gray-100 font-suit-14-m-130'}>
                    <Link href={ROUTES.PLATFORM.REGISTER}>회원가입</Link>
                  </div>

                  <div className={'text-gray-100 font-suit-14-m-130'}>
                    <Link href={ROUTES.PLATFORM.MY_PAGE}>마이페이지</Link>
                  </div>
                </div>
              )}

              {isLogin && (
                <div className={'flex items-end flex-col gap-6 pb-[30px] border-b border-gray-100'}>
                  <div className={'flex items-center gap-1'}>
                    <div className={'w-[32px] h-8 flex items-center justify-center border rounded-full'}>
                      <IconLine24Avatar />
                    </div>

                    <div className={'text-gray-100 font-suit-16-m-130'}>{data?.data?.nm || '알 수 없음'}</div>
                  </div>

                  <div className={'flex gap-2'}>
                    <div className={'text-gray-100 font-suit-15-b-130'}>Coinpay</div>
                    <div className={'flex gap-[2px]'}>
                      <div className={'text-orange-orange50 font-suit-18-750-130'}>4,364,400</div>
                      <div className={'text-gray-100 font-suit-18-750-130'}>C</div>
                    </div>
                  </div>

                  <div className={'font-suit-14-m-130'}>
                    <Link href={ROUTES.PLATFORM.MY_PAGE}>마이페이지</Link>
                  </div>
                </div>
              )}

              <div className={'flex flex-col items-end justify-center gap-[30px]'}>
                <div>
                  <Link
                    href={ROUTES.PLATFORM.BUY}
                    onClick={() => setIsOpen(false)}
                    className={'w-full text-end font-suit-18-b-130 text-gray-100'}
                  >
                    구매
                  </Link>
                </div>

                <div>
                  <Link
                    href={ROUTES.PLATFORM.SELL}
                    onClick={() => setIsOpen(false)}
                    className={'w-full text-end font-suit-18-b-130 text-gray-100'}
                  >
                    판매
                  </Link>
                </div>

                {/* <div>
                  <Link
                    href={ROUTES.PLATFORM.SEND}
                    onClick={() => setIsOpen(false)}
                    className={'w-full text-end font-suit-18-b-130 text-gray-100'}
                  >
                    전송
                  </Link>
                </div> */}

                <div>
                  <Link
                    href={ROUTES.PLATFORM.TRANSACTION_HISTORY}
                    onClick={() => setIsOpen(false)}
                    className={'w-full text-end font-suit-18-b-130 text-gray-100'}
                  >
                    거래내역
                  </Link>
                </div>
              </div>

              {isLogin && (
                <button className={'w-full font-suit-14-m-130 text-gray-95'} onClick={() => logout()}>
                  <div className={'flex flex-row gap-1 justify-end items-center'}>
                    <div>로그아웃</div>
                    <IconLine24Logout />
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          'hidden sm:block sticky top-0 left-0 right-0 z-50 bg-gray-100 px-10 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)]'
        }
      >
        <div className={'flex flex-row justify-between items-center'}>
          <div className={'flex flex-row items-center'}>
            <div className={'h-[70px] flex flex-row items-center gap-10'}>
              <Link href={ROUTES.PLATFORM.HOME} className={'text-yellow-50 font-suit-32-750-130'}>
                Black Coin
              </Link>

              <Link href={ROUTES.PLATFORM.BUY} className={'font-suit-18-b-130'}>
                구매
              </Link>

              <Link href={ROUTES.PLATFORM.SELL} className={'font-suit-18-b-130'}>
                판매
              </Link>

              {/* <Link href={ROUTES.PLATFORM.SEND} className={'font-suit-18-b-130'}>
                전송
              </Link> */}

              <Link href={ROUTES.PLATFORM.TRANSACTION_HISTORY} className={'font-suit-18-b-130'}>
                거래내역
              </Link>
            </div>
          </div>

          {isLogin && (
            <div className={'flex flex-row gap-5 items-center'}>
              <div className={'flex flex-row gap-2 items-center'}>
                <div className={'text-gray-30 font-suit-15-b-130'}>Coinpay</div>

                <div className={'flex flex-row gap-0.5 items-center'}>
                  <div className={'text-orange-orange50 font-suit-18-750-130'}>
                    {(data?.data?.hold_coin || 0).toLocaleString('ko-KR')}
                  </div>
                  <div className={'text-gray-30 font-suit-15-b-130'}>C</div>
                </div>
              </div>

              <Link href={ROUTES.PLATFORM.MY_PAGE} className={'flex flex-row gap-1 items-center'}>
                <div
                  className={'w-8 h-8 flex items-center justify-center bg-gray-0 border border-gray-0  rounded-full'}
                >
                  <IconLine24Avatar />
                </div>
                <div className={'text-gray-0 font-suit-16-m-130'}>{data?.data?.nm || '알 수 없음'}</div>
              </Link>

              <button
                className={'h-[28px] rounded-[60px] border border-gray-0 px-4 text-gray-0 font-suit-13-m-130'}
                onClick={() => logout()}
              >
                로그아웃
              </button>
            </div>
          )}

          {!isLogin && (
            <Link
              href={ROUTES.PLATFORM.LOGIN}
              className={
                'flex items-center h-[28px] rounded-[60px] border border-gray-0 px-4 text-gray-0 font-suit-13-m-130'
              }
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
