import { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { IChangeMoneyModalProps } from './CoinToMoneyModal.types';

import { Modal } from '@/components/atoms/modals';
import { useToast } from '@/hooks';
import { userInformationShowQueryKey } from '@/services/platform/auth/user.query';
import { exchangeCheckService, exchangeCoinService } from '@/services/platform/coin/exchange';
import { exchangeCheckQueryKey } from '@/services/platform/coin/exchange.query';
import { accountShowQueryKey } from '@/services/platform/my-page/account.query';

export default function ChangeMoneyModal({ isOpen, onClose }: IChangeMoneyModalProps) {
  const [amount, setAmount] = useState('');
  const { open: openToast } = useToast();
  const queryClient = useQueryClient();

  const { data: exchangeCheckData } = useQuery({
    queryKey: exchangeCheckQueryKey,
    queryFn: () => exchangeCheckService(),
    enabled: isOpen,
  });

  const modalClose = () => {
    setAmount('');
    onClose();
  };

  const { mutate: exchangeCoin } = useMutation({
    mutationFn: exchangeCoinService,
    onSuccess(data) {
      if (data != null) {
        if (data.status) {
          openToast({ message: '교환이 성공적으로 완료되었습니다.', type: 'success' });

          queryClient.invalidateQueries({ queryKey: exchangeCheckQueryKey });
          queryClient.invalidateQueries({ queryKey: userInformationShowQueryKey });
          queryClient.invalidateQueries({ queryKey: accountShowQueryKey });

          modalClose();
          return;
        }

        throw new Error(data.message);
      }
    },
  });

  const handleExchange = () => {
    exchangeCoin({ exchng_qy: Number(amount) });
  };

  return (
    <Modal isOpen={isOpen} onClose={modalClose}>
      <div className={'flex flex-col gap-10 p-5'}>
        <div className={'flex flex-col items-center gap-4'}>
          <div className={'text-gray-0 font-suit-40-900-113'}>blackcoin</div>

          <div className={'text-center text-gray-20 font-suit-20-600-150'}>
            보유하신 게임머니를
            <br />
            코인으로 교환해보세요!
          </div>
        </div>

        <div className={'flex flex-col gap-2 mb-5'}>
          <div className={'text-gray-10 font-suit-16-b-130'}>My Wallet</div>

          <div className={'flex bg-red-99 justify-between py-3 px-2.5'}>
            <div className={'text-gray-10 font-suit-14-b-130'}>보유 게임 머니</div>

            <div className={'flex items-center gap-[2px]'}>
              <span className={'font-suit-18-750-130 text-orange-orange50'}>
                {(exchangeCheckData?.data?.money || 0).toLocaleString('ko-KR')}
              </span>
              <span className={'font-suit-14-b-130 text-orange-orange50'}>C</span>
            </div>
          </div>
        </div>

        <div className={'flex flex-col gap-2'}>
          <div className={'text-gray-0 font-suit-16-b-130'}>
            교환수량 <span className={'font-suit-16-r-130 text-red-50'}>*</span>
          </div>

          <div className={'h-12 flex gap-2 items-center'}>
            <input
              className={'flex-auto rounded-[14px] border border-gray-80 py-3 px-3.5'}
              type={'text'}
              placeholder={'입력'}
              value={amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, '').replace(/^0+|[^0-9]/g, '');
                setAmount(value);
              }}
            />

            <button
              className={'w-[90px] h-full text-gray-100 bg-gray-0 px-2 py-1 rounded-[14px]'}
              onClick={() => setAmount(String(exchangeCheckData?.data?.money || 0))}
            >
              전액입력
            </button>
          </div>
        </div>

        <div className={'flex gap-2'}>
          <button
            className={'w-[116px] h-12 text-gray-10 bg-gray-90 rounded-3xl font-suit-16-m-130'}
            onClick={modalClose}
          >
            취소
          </button>
          <button
            className={'flex-auto text-gray-100 bg-primary-50 rounded-3xl font-suit-16-m-130'}
            onClick={handleExchange}
          >
            교환하기
          </button>
        </div>
      </div>
    </Modal>
  );
}
