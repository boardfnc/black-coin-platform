'use client';

import type { ChangeEvent } from 'react';
import { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { ISaleCompleteModalProps } from '@/components/organisms/platform/modal/SaleCompleteModal.types';

import { IconLine24SquareInfo } from '@/components/atoms/icons/icon-line';
import { Image } from '@/components/atoms/images';
import { ConfirmColModal, AlertModal, SaleCompleteModal } from '@/components/organisms/platform/modal';
import { useToast } from '@/hooks';
import { cube, sellCoin } from '@/images/background';
import { userInformationShowService } from '@/services/platform/auth/user';
import { userInformationShowQueryKey } from '@/services/platform/auth/user.query';
import { exchangeCheckQueryKey } from '@/services/platform/coin/exchange.query';
import { saleService } from '@/services/platform/coin/sale';
import { accountShowQueryKey } from '@/services/platform/my-page/account.query';
import { convertBank } from '@/utils/covert';

export default function Sell() {
  const queryClient = useQueryClient();

  const [amount, setAmount] = useState<string>('0');
  const { open: openToast } = useToast();

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
  });

  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    title: '판매 등록 오류',
    description: '',
  });

  const [saleCompleteModal, setSaleCompleteModal] = useState<Omit<ISaleCompleteModalProps, 'onClose'>>({
    isOpen: false,
  });

  const { data } = useQuery({
    queryKey: userInformationShowQueryKey,
    queryFn: () => userInformationShowService(),
  });

  const { mutate } = useMutation({
    mutationFn: saleService,
    onSuccess(data) {
      if (data != null) {
        if (!data.status) {
          setConfirmModal({ isOpen: false });
          throw new Error(data.message);
        }

        setConfirmModal({ isOpen: false });
        setSaleCompleteModal({
          isOpen: true,
          createdAt: data.data.created_at,
          bankAmount: data.data.pymnt_am.toLocaleString('ko-KR'),
          account: data.data.acnutno,
          bank: data.data.bank,
          bankAccount: data.data.acnutno,
        });

        queryClient.invalidateQueries({ queryKey: userInformationShowQueryKey });
        queryClient.invalidateQueries({ queryKey: accountShowQueryKey });
        queryClient.invalidateQueries({ queryKey: exchangeCheckQueryKey });
      }
    },
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, '');
    setAmount(value ? Number(value).toLocaleString() : '0');
  };

  const handleButtonClick = (value: number) => {
    const currentAmount = Number(amount.replace(/,/g, '')) || 0;
    const newAmount = currentAmount + value;
    setAmount(newAmount.toLocaleString());
  };

  const handleReset = () => {
    setAmount('0');
  };

  const handleBuySubmit = () => {
    const numAmount = Number(amount.replace(/,/g, ''));
    const minAmount = data?.data.mumm_defray_am || 0;
    const maxAmount = data?.data.mxmm_defray_am || 0;

    if (numAmount < minAmount) {
      return openToast({
        type: 'transparent',
        message: `최소 판매 수량은 ${minAmount.toLocaleString()} 입니다.`,
      });
    }

    if (numAmount > maxAmount) {
      return openToast({
        type: 'transparent',
        message: `최대 판매 수량은 ${maxAmount.toLocaleString()} 입니다.`,
      });
    }

    setConfirmModal({ isOpen: true });
  };

  const buttonAmounts = [5000, 10000, 50000, 100000, 500000, 1000000];

  return (
    <>
      <div className={'w-full pb-[100px]'}>
        <div className={'my-15'}>
          <div className={'pb-[30px] sm:pb-[60px]'}>
            <div className={'relative w-full h-[200px]'}>
              <Image className={'object-cover'} src={cube} alt={'home-background'} quality={100} fill />

              <div className={'absolute w-max top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'}>
                <div className={'flex flex-col justify-center items-center gap-2.5'}>
                  <div className={'text-gray-100 font-suit-40-800-110 sm:font-suit-60-800-110'}>Black Coin</div>

                  <div className={'text-gray-100 font-suit-30-400-110'}>판매</div>
                </div>
              </div>
            </div>
          </div>

          <div className={'max-w-[1080px] mx-auto px-3 sm:px-0'}>
            <div className={'w-full pb-5'}>
              <div className={'h-8 text-gray-10 font-suit-16-b-130'}>Request for sale</div>

              <div
                className={'h-[60px] text-gray-10 font-suit-24-b-130 sm:font-suit-30-700-130 border-b border-gray-50'}
              >
                판매
              </div>
            </div>

            <div className={'pt-5 pb-10'}>
              <div className={'py-5 flex flex-col gap-5 border rounded-2xl border-gray-0'}>
                <div className={'text-center text-gray-10 font-suit-16-b-130 sm:font-suit-20-b-130'}>
                  등록하신 본인 계좌 입금만 허용되며,
                  <br className={'sm:hidden'} /> 입금 내역 확인 시<br className={'hidden sm:block'} /> 기재한{' '}
                  <span className={'text-orange-orange50'}>
                    은행정보가 예금주가
                    <br className={'sm:hidden'} /> 다를 경우 반환처리
                  </span>{' '}
                  됩니다.
                </div>

                <div className={'flex flex-col gap-[10px] px-4 sm:px-[60px]'}>
                  <div>
                    <div className={'px-1 py-[7px] font-suit-14-m-130 text-gray-40'}>계좌 정보</div>

                    <div className={'h-[38px] flex flex-row gap-1.5 px-[10px] bg-gray-95 rounded-lg items-center'}>
                      <IconLine24SquareInfo className={'text-orange-orange50'} />

                      <div className={'font-suit-13-400-130 text-gray-0'}>
                        계좌정보 변경을 원하실 경우 고객센터로 연락해주세요.
                      </div>
                    </div>
                  </div>
                  <div className={'border-s grid grid-cols-1 sm:flex sm:flex-row sm:w-full'}>
                    <div className={'flex flex-auto'}>
                      <div
                        className={
                          'flex items-center w-[120px] h-12 sm:h-14 p-3 bg-gray-90 border-y border-b-0 border-line-line02 text-gray-0 font-suit-13-b-130'
                        }
                      >
                        은행명
                      </div>
                      <div
                        className={
                          'flex w-full items-center h-12 sm:h-14 p-3 font-suit-14-r-130 text-gray-0 border border-line-line0 border-b-0 sm:border-b'
                        }
                      >
                        {convertBank(data?.data.bank)}
                      </div>
                    </div>
                    <div className={'flex flex-auto'}>
                      <div
                        className={
                          'flex items-center w-[120px] h-12 sm:h-14 p-3 bg-gray-90 border-y border-line-line02 text-gray-0 font-suit-13-b-130 border-b-0 sm:border-b'
                        }
                      >
                        예금주
                      </div>
                      <div
                        className={
                          'flex w-full items-center h-12 sm:h-14 p-3 font-suit-14-r-130 text-gray-0 border border-line-line0 border-b-0 sm:border-b'
                        }
                      >
                        {data?.data.dpstr}
                      </div>
                    </div>
                    <div className={'flex flex-auto'}>
                      <div
                        className={
                          'flex items-center w-[120px] h-12 sm:h-14 p-3 bg-gray-90 border-y border-line-line02 text-gray-0 font-suit-13-b-130 border-b-0 sm:border-b'
                        }
                      >
                        계좌번호
                      </div>
                      <div
                        className={
                          'flex w-full items-center h-12 sm:h-14 p-3 font-suit-14-r-130 text-gray-0 border border-line-line0'
                        }
                      >
                        {data?.data.acnutno}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className={'flex items-center h-14 border-b border-gray-0 text-gray-0 font-suit-16-b-130'}>
                판매수량
              </div>

              <div className={'pt-5 pb-10'}>
                <div className={'h-[38px] flex flex-row gap-1.5 px-[10px] bg-gray-95 rounded-lg items-center'}>
                  <IconLine24SquareInfo className={'text-orange-orange50'} />

                  <div className={'font-suit-13-400-130 text-gray-0'}>
                    최소 판매 수량은{' '}
                    <span className={'text-gray-0 font-suit-15-700-130'}>
                      {(data?.data.mumm_defray_am || 0).toLocaleString('ko-KR')}
                    </span>
                    , 최대 판매 수량은{' '}
                    <span className={'text-gray-0 font-suit-15-700-130'}>
                      {(data?.data.mxmm_defray_am || 0).toLocaleString('ko-KR')}
                    </span>
                    입니다.
                  </div>
                </div>

                <div className={'flex gap-2 pt-5 pb-[30px]'}>
                  <input
                    type={'text'}
                    className={
                      'flex-1 h-12 p-3 text-gray-0 border border-gray-80 rounded-[14px] text-end font-suit-17-m-130'
                    }
                    value={amount}
                    onChange={handleInputChange}
                  />

                  <button
                    className={
                      'w-2/5 sm:w-[120px] text-gray-100 bg-gray-0 disabled:bg-gray-80 font-suit-17-m-130 rounded-[14px] transition'
                    }
                    onClick={handleReset}
                    disabled={amount === '0'}
                  >
                    초기화
                  </button>
                </div>

                <div className={'flex flex-col gap-[10px]'}>
                  <div className={'grid grid-cols-2 sm:grid-cols-3 gap-[10px]'}>
                    {buttonAmounts.map((buttonAmount) => (
                      <button
                        key={buttonAmount}
                        className={`h-12 border rounded-xl font-suit-14-b-130 ${
                          Number(amount.replace(/,/g, '')) === buttonAmount
                            ? 'border-sub-blue-s-d-blue-10 text-sub-blue-s-d-blue-10 bg-sub-blue-s-blue-10'
                            : 'border-gray-0 text-gray-0'
                        }`}
                        onClick={() => handleButtonClick(buttonAmount)}
                      >
                        {buttonAmount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={'pb-5'}>
              <div className={'flex items-center h-14 border-b border-gray-0 text-gray-0 font-suit-16-b-130'}>
                판매정보
              </div>

              <div className={'pt-5 pb-10'}>
                <div className={' flex justify-between items-center py-5'}>
                  <div className={'text-gray-20 font-suit-18-b-130'}>보유 수량</div>
                  <div className={'text-orange-orange50 font-suit-24-750-130'}>
                    {(data?.data.hold_coin || 0).toLocaleString('ko-KR')}
                  </div>
                </div>

                <div className={' flex justify-between items-center py-5'}>
                  <div className={'text-gray-20 font-suit-18-b-130'}>판매 수량</div>
                  <div className={'text-orange-orange50 font-suit-24-750-130'}>
                    {(amount || 0).toLocaleString('ko-KR')}
                  </div>
                </div>

                <div className={' flex justify-between items-center py-5'}>
                  <div className={'text-gray-20 font-suit-18-b-130'}>남은 수량</div>
                  <div className={'text-orange-orange50 font-suit-24-750-130'}>
                    {((data?.data.hold_coin || 0) - Number(amount.replace(/,/g, ''))).toLocaleString('ko-KR')}
                  </div>
                </div>
              </div>

              <button
                onClick={handleBuySubmit}
                className={'w-full h-14 text-gray-100 bg-yellow-50 font-suit-17-b-130 rounded-[14px]'}
              >
                판매등록
              </button>
            </div>

            <div className={'flex flex-col gap-2.5 rounded-2xl border border-gray-80 p-5'}>
              <div className={'text-gray-30 font-suit-15-m-130'}>✻ 구매/판매 등록 안내</div>

              <ul className={'flex flex-col gap-2.5 list-disc'}>
                <li className={'ms-6 text-gray-20 font-suit-13-m-130'}>
                  은행 점검 시간에는 코인전송 외에 구매/판매 신청이 모두 반려됩니다.
                </li>

                <li className={'ms-6 text-red-50 font-suit-13-m-130'}>은행 점검시간 : 23:30 ~ 00:40</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <SaleCompleteModal {...saleCompleteModal} onClose={() => setSaleCompleteModal({ isOpen: false })} />

      <ConfirmColModal
        width={'400px'}
        title={''}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={() => {
          mutate({ delng_qy: Number(amount.replace(/,/g, '')) });
        }}
        content={
          <div className={'flex flex-col items-center gap-2.5'}>
            <div className={'relative w-[108px] h-[150px]'}>
              <Image src={sellCoin} alt={'digital-coin-cart-icon'} quality={100} fill />
            </div>

            <div className={'text-gray-10 font-suit-20-r-130'}>판매등록</div>

            <div className={'text-gray-30 font-suit-16-r-130'}>판매 등록을 진행하시겠습니까?</div>
          </div>
        }
        confirmText={'판매'}
        cancelText={'취소'}
        {...confirmModal}
      />

      <AlertModal {...alertModal} onClose={() => setAlertModal({ ...alertModal, isOpen: false })} />
    </>
  );
}
