'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  IconLine24ArrowLongDown,
  IconLine24Bell,
  IconLine24Change,
  IconLine24LinkClear,
} from '@/components/atoms/icons/icon-line';
import { CoinToMoneyModal, MoneyToCoinModal } from '@/components/organisms/platform/modal';
import { ROUTES } from '@/constants';
import { useClient } from '@/hooks';
import { clientInformationKey } from '@/hooks/client';
import { coinWallet, digitalWallet } from '@/images/background';
import { automaticLoginService } from '@/services/platform/auth/login';
import { automaticLoginQueryKey } from '@/services/platform/auth/login.query';
import { logoutService } from '@/services/platform/auth/logout';
import { exchangeCheckService } from '@/services/platform/coin/exchange';
import { exchangeCheckQueryKey } from '@/services/platform/coin/exchange.query';
import { useJoin } from '@/stores/join';
import { useLogin } from '@/stores/login';

export default function Wallet() {
  const { openModal: openLoginModal } = useLogin();
  const { openModal: openJoinModal } = useJoin();
  const queryClient = useQueryClient();
  const { isLogin } = useClient();

  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpenChangeCoinModal, setIsOpenChangeCoinModal] = useState(false);
  const [isOpenChangeMoneyModal, setIsOpenChangeMoneyModal] = useState(false);
  const autoLogin = (() => {
    const autoLogin = searchParams.get('auto-login');

    if (autoLogin === 'true') return true;

    if (typeof window !== 'undefined') {
      return document.cookie.includes('auto-login=true');
    }
    return false;
  })();

  const code = searchParams.get('code');
  const essentialKey = searchParams.get('essential-key');

  const { data } = useQuery({
    queryKey: automaticLoginQueryKey,
    queryFn: () => automaticLoginService({ autoLogin, code: code!, esntl_key: essentialKey! }),
    enabled: !!code && !!essentialKey,
  });

  const isJoin = !data?.status;

  const { data: exchangeCheckData } = useQuery({
    queryFn: () => exchangeCheckService(),
    queryKey: exchangeCheckQueryKey,
    enabled: isLogin,
    refetchInterval: 2000,
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

  const onClickAuthorButton = () => {
    if (isJoin) openJoinModal();
    else openLoginModal();
  };

  useEffect(() => {
    if (!isJoin) {
      if (code) router.replace(`/wallet?code=${code}`);
      else router.replace('/wallet');
    }
  }, [router, code, isJoin]);

  return (
    <>
      <div className={' min-h-screen bg-[#4D5258]'}>
        <div className={'pt-[40px] pb-[100px] px-2'}>
          <div className={'mx-0 sm:mx-[120px] pb-[60px]'}>
            <div className={'relative w-full h-[350px]'}>
              <Image className={'object-cover'} src={coinWallet} alt={'coin wallet'} fill priority />
            </div>
          </div>

          <div className={'container max-w-[1080px] mx-auto'}>
            <div className={'flex flex-col gap-5'}>
              <div className={'flex justify-between items-center border-b'}>
                <div className={'flex items-center h-[88px] text-gray-100 font-suit-30-750'}>My Wallet</div>

                {isLogin && (
                  <button
                    className={
                      'flex items-center gap-1.5 text-gray-100 font-pre-13-m-130 rounded-[60px] border-gray-100 bg-[rgba(255,255,255,0.1)] px-3 h-8 border'
                    }
                    onClick={() => logout(undefined)}
                  >
                    <IconLine24LinkClear />
                    연결 해제
                  </button>
                )}
              </div>

              <div
                className={
                  'flex flex-col gap-[10px] p-5 rounded-[16px] border border-gray-100 bg-[rgba(255,255,255,0.05)]'
                }
              >
                <div className={'text-gray-100 font-suit-16-b-130'}>✻ 코인 지갑 연동 안내</div>

                <div className={'text-gray-100 font-suit-14-r-150 whitespace-pre-line'}>
                  {`고객님들의 안전한 자산관리를 위하여 Black Coin에서는 코인 입금 제도를 새롭게 도입하였습니다. 
                해당 사이트를 이용하시는 모든 고객님들은 별도의 거래소 가입없이 이용이 가능하며, 아래 [코인지갑 연동 및 입금]을 통해 지갑 연동 후 편리하게 이용 가능합니다.`}
                </div>

                <div className={'text-gray-100 font-suit-14-r-130'}>
                  <span className={'ms-2 me-1'}>•</span> 실제 코인을 기반으로 하여 지갑 연동 시 입금 및 출금을 간편하게
                  이용할 수 있습니다.
                </div>
              </div>
            </div>

            {isLogin && (
              <div className={'mt-[20px] p-[30px] bg-gray-95 rounded-[16px] border border-gray-100'}>
                <div className={'px-[20px] bg-gray-100 pt-4 pb-5 rounded-[20px]'}>
                  <div className={'flex flex-col gap-2.5'}>
                    <div className={'flex items-center h-8 text-gray-0 font-suit-18-b-130'}>보유 상세</div>

                    <div className={'flex gap-2'}>
                      <div className={'bg-orange-orange50 rounded-full p-[2px]'}>
                        <IconLine24Bell />
                      </div>
                      <div className={'font-suit-14-m-130 text-gray-20'}>
                        코인을 보유하고 있어야 출금 신청이 가능합니다. 출금 신청 전{' '}
                        <span className={'text-red-50'}>게임머니를 코인으로 교환 후 이용</span>해주세요.
                      </div>
                    </div>
                  </div>

                  <div className={'mt-5'}>
                    <div className={'flex justify-between items-center py-5'}>
                      <div className={'font-suit-18-b-130 text-gray-20'}>보유 게임 머니</div>
                      <div className={'flex gap-2 items-center'}>
                        <div className={'flex gap-1 items-center text-orange-orange50'}>
                          <span className={'font-suit-24-750-130'}>
                            {(exchangeCheckData?.data?.money || 0).toLocaleString('ko-KR')}
                          </span>
                          <span className={'font-suit-20-750-130'}>P</span>
                        </div>

                        <button
                          className={
                            'flex items-center gap-[6px] ps-3 pe-4 border rounded-lg w-[120px] h-8 border-gray-70 text-gray-20'
                          }
                          onClick={() => setIsOpenChangeMoneyModal(true)}
                        >
                          <div>
                            <IconLine24Change />
                          </div>
                          <div className={'whitespace-nowrap text-gray-10 font-pre-13-m-130'}>코인으로 교환</div>
                        </button>
                      </div>
                    </div>

                    <div className={'flex justify-between items-center py-5'}>
                      <div className={'font-suit-18-b-130 text-gray-20'}>보유 코인</div>
                      <div className={'flex gap-2 items-center'}>
                        <div className={'flex gap-1 items-center text-orange-orange50'}>
                          <span className={'font-suit-24-750-130'}>
                            {(exchangeCheckData?.data?.hold_coin || 0).toLocaleString('ko-KR')}
                          </span>
                          <span className={'font-suit-20-750-130'}>C</span>
                        </div>

                        <button
                          className={
                            'flex items-center gap-[6px] ps-3 pe-4 border rounded-lg w-[120px] h-8 border-gray-70 text-gray-20'
                          }
                          onClick={() => setIsOpenChangeCoinModal(true)}
                        >
                          <div>
                            <IconLine24Change />
                          </div>
                          <div className={'whitespace-nowrap text-gray-10 font-pre-13-m-130'}>머니로 교환</div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className={'mt-5 flex items-center gap-[10px]'}>
                    <button
                      className={'flex-auto h-14 px-3 text-gray-0 border border-gray-10 rounded-2xl'}
                      onClick={() => {
                        window.open(ROUTES.PLATFORM.BUY, '_blank', 'width=788, height=600');
                      }}
                    >
                      입금 신청
                    </button>
                    <button
                      className={'flex-auto h-14 px-3 text-gray-100 bg-primary-50 rounded-2xl'}
                      onClick={() => {
                        window.open(ROUTES.PLATFORM.SELL, '_blank', 'width=788, height=600');
                      }}
                    >
                      출금 신청
                    </button>
                  </div>

                  <div className={`flex ${code ? 'justify-between' : 'justify-end'} pt-5`}>
                    {code && (
                      <div className={'flex items-center gap-1'}>
                        <div className={'text-gray-0 font-suit-14-m-130'}>코드명:</div>
                        <div className={'text-gray-0 font-suit-18-750-130'}>{code}</div>
                      </div>
                    )}

                    <Link href={ROUTES.PLATFORM.HOME} target={'_blank'} className={'flex gap-6 items-center'}>
                      <div className={'flex flex-col gap-[2px]'}>
                        <div className={'text-gray-0 font-suit-18-300-130 underline'}>블랙사이트 바로가기</div>
                        <div className={'text-gray-50 font-suit-13-r-113'}>Go to black site</div>
                      </div>

                      <div className={'flex items-center justify-center w-10 h-10 bg-gray-0 rounded-full'}>
                        <IconLine24ArrowLongDown />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {!isLogin && (
              <div
                className={'flex flex-col justify-center items-center gap-[30px] bg-gray-95 rounded-[30px] py-10 mt-5'}
              >
                <Image className={'object-cover'} src={digitalWallet} alt={'digital wallet'} width={200} height={160} />

                <button
                  className={'w-[250px] h-[56px] text-gray-100 bg-gray-0 rounded-[60px]'}
                  onClick={onClickAuthorButton}
                >
                  코인지갑 연동 및 입금하기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <CoinToMoneyModal isOpen={isOpenChangeMoneyModal} onClose={() => setIsOpenChangeMoneyModal(false)} />
      <MoneyToCoinModal isOpen={isOpenChangeCoinModal} onClose={() => setIsOpenChangeCoinModal(false)} />
    </>
  );
}
