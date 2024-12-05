'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { coinWallet, digitalWallet } from '@/images/background';
import { automaticLoginService } from '@/services/admin/auth/login';
import { automaticLoginQueryKey } from '@/services/admin/auth/login.query';
import { useLogin } from '@/stores/login';

export default function Wallet() {
  const { openModal: openLoginModal } = useLogin();

  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const essentialKey = searchParams.get('essential-key');

  const { data } = useQuery({
    queryKey: automaticLoginQueryKey,
    queryFn: () => automaticLoginService({ code: code!, esntl_key: essentialKey! }),
    enabled: !!code && !!essentialKey,
  });

  const isLogin = data?.status === true;

  const onClickAuthorButton = () => {
    if (isLogin) {
      // TODO: 코인 구매 처리
    } else {
      openLoginModal();
    }
  };

  return (
    <div className={' min-h-screen bg-[#4D5258]'}>
      <div className={'pt-[40px] pb-[100px]'}>
        <div className={'mx-[120px] pb-[60px]'}>
          <div className={'relative w-full h-[350px]'}>
            <Image className={'object-cover'} src={coinWallet} alt={'coin wallet'} fill />
          </div>
        </div>

        <div className={'container max-w-[1080px] mx-auto'}>
          <div className={'flex flex-col gap-5'}>
            <div className={'flex items-center h-[88px] border-b text-gray-100 font-suit-30-750'}>My Wallet</div>

            <div
              className={
                'flex flex-col gap-[10px] p-5 rounded-[16px] border border-gray-100 bg-[rgba(255, 255, 255, 0.05)]'
              }
            >
              <div className={'text-gray-100 font-suit-16-b-130'}>✻ 코인 지갑 연동 안내</div>

              <div className={'text-gray-100 font-suit-14-r-150 whitespace-pre-line'}>
                {`고객님들의 안전한 자산관리를 위하여 Service Name에서는 코인 입금 제도를 새롭게 도입하였습니다. 
                해당 사이트를 이용하시는 모든 고객님들은 별도의 거래소 가입없이 이용이 가능하며, 아래 [코인지갑 연동 및 입금]을 통해 지갑 연동 후 편리하게 이용 가능합니다.`}
              </div>

              <div className={'text-gray-100 font-suit-14-r-130'}>
                <span className={'ms-2 me-1'}>•</span> 실제 코인을 기반으로 하여 지갑 연동 시 입금 및 출금을 간편하게
                이용할 수 있습니다.
              </div>
            </div>
          </div>

          <div className={'flex flex-col justify-center items-center gap-[30px] bg-gray-95 rounded-[30px] py-10 mt-5'}>
            <Image className={'object-cover'} src={digitalWallet} alt={'digital wallet'} width={200} height={160} />

            <button
              className={'w-[250px] h-[56px] text-gray-100 bg-gray-0 rounded-[60px]'}
              onClick={onClickAuthorButton}
            >
              코인지갑 연동 및 입금하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
