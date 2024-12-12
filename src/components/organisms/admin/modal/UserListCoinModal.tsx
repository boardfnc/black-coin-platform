import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';

import type { IUserListCoinModalProps } from './UserListCoinModal.types';

import { IconLine24Close, IconLine24RoundWarning } from '@/components/atoms/icons/icon-line';
import IconLineSavingMoney from '@/components/atoms/icons/icon-line/SavingMoney';
import { Modal } from '@/components/atoms/modals';
import { useAuthor } from '@/components/atoms/provider/AdminProvider';
import { ConfirmModal } from '@/components/organisms/admin/modal';
import { useFetch, useRequest, useToast } from '@/hooks';
import { adminMemberPaymentService, adminMemberRetrievalService } from '@/services/admin/member/adminMembers';
import { memberMyPageService, memberPaymentService, memberRetrievalService } from '@/services/admin/member/members';
import { useRefetch } from '@/stores/refetch';

export default function UserListCoinModal(props: IUserListCoinModalProps) {
  const { memberId, coin = 0, isOpen, mode = 'payment', onClose, refetch } = props;

  const { isSuperAdmin } = useAuthor();
  const { open: openToast } = useToast();
  const { request } = useRequest();
  const { sideBarRefetch } = useRefetch();

  const myProfileData = useCallback(() => memberMyPageService(), []);
  const { data: myData } = useFetch(myProfileData, { enabled: !isSuperAdmin });

  const [amount, setAmount] = useState<number>(0);
  const [memo, setMemo] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const myCoin = myData?.data?.hold_coin || 0;

  const handleReset = () => setAmount(0);
  const handleMemoChange = (event: ChangeEvent<HTMLTextAreaElement>) => setMemo(event.target.value);

  const handleSubmit = async () => {
    if (mode === 'retrieval' && amount > coin) {
      openToast({
        message: '회원이 보유한 코인 이상으로는 회수가 불가능합니다.',
        type: 'error',
      });
      return null;
    }

    if (mode === 'payment' && amount > myCoin) {
      openToast({
        message: '내가 보유한 코인 이상으로는 지급이 불가능합니다.',
        type: 'error',
      });
      return null;
    }

    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    if (mode === 'payment') {
      const response = await request(() =>
        isSuperAdmin
          ? adminMemberPaymentService({
              mber_id: Number(memberId),
              pymnt_coin: amount,
              memo,
            })
          : memberPaymentService({
              mber_id: Number(memberId),
              pymnt_coin: amount,
              memo,
            }),
      );

      if (response != null && 'status' in response && response.status) {
        openToast({
          message: '코인 지급이 완료되었습니다.',
          type: 'success',
        });
        refetch?.();
        sideBarRefetch?.();
        onClose();
      }

      setShowConfirm(false);
      return response;
    }

    if (mode === 'retrieval') {
      const response = await request(() =>
        isSuperAdmin
          ? adminMemberRetrievalService({
              mber_id: Number(memberId),
              rtrvl_coin: amount,
              memo,
            })
          : memberRetrievalService({
              mber_id: Number(memberId),
              rtrvl_coin: amount,
              memo,
            }),
      );

      if (response != null && 'status' in response && response.status) {
        openToast({
          message: '코인 회수가 완료되었습니다.',
          type: 'success',
        });
        refetch?.();
        sideBarRefetch?.();
        onClose();
      }

      setShowConfirm(false);
      return response;
    }

    return null;
  };

  const modeText = mode === 'payment' ? '지급' : '회수';

  const handleClose = () => {
    setAmount(0);
    setMemo('');
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} width={'500px'}>
        <div className={'pt-1 pb-3 px-2.5 flex justify-between items-center'}>
          <div className={'font-pre-20-m-130'}>{`코인 ${modeText}`}</div>

          <button onClick={handleClose}>
            <IconLine24Close />
          </button>
        </div>

        <div className={'flex flex-col gap-[30px] pt-2 px-[10px]'}>
          <div className={'flex flex-col gap-[10px]'}>
            {mode === 'payment' && (
              <div className={'h-[56px] flex justify-between items-center border-b border-gray-20'}>
                <div className={'flex items-center gap-1'}>
                  <IconLineSavingMoney className={'text-purple-fmg50'} />
                  <span className={'text-gray-10 font-pre-16-m-130'}>내 보유 코인</span>
                </div>
                <span className={'text-purple-fmg50 font-pre-18-b-130'}>
                  {isSuperAdmin ? '-' : myCoin.toLocaleString('ko-KR')} C
                </span>
              </div>
            )}

            <div className={'h-[56px] flex justify-between items-center border-b border-gray-20'}>
              <div className={'flex items-center gap-1'}>
                <IconLineSavingMoney className={'text-yellow-50'} />
                <span className={'text-gray-10 font-pre-16-m-130'}>회원 보유 코인</span>
              </div>
              <span className={'text-orange-orange50 font-pre-18-b-130'}>{coin.toLocaleString('ko-KR')} C</span>
            </div>
          </div>

          <div>
            <div className={'text-gray-40 font-pre-15-r-130 py-2'}>{`${modeText} 코인`}</div>
            <div className={'flex justify-between items-center gap-2'}>
              <input
                className={'w-full py-4 px-3.5 border border-gray-80 rounded-[16px]'}
                type={'text'}
                value={amount.toLocaleString('ko-KR')}
                onChange={(event) => {
                  const value = event.target.value.replace(/[^0-9]/g, '');
                  setAmount(Number(value));
                }}
              />
              <button
                className={
                  'w-[90px] h-[48px] flex items-center justify-center text-gray-100 border border-gray-0 bg-gray-0 rounded-[14px]'
                }
                onClick={handleReset}
              >
                초기화
              </button>
            </div>
          </div>

          <div className={'grid grid-cols-4 gap-2'}>
            <button
              className={'h-10 text-gray-0 border border-gray-0 rounded-[12px]'}
              onClick={() => setAmount((prev) => prev + 1000)}
            >
              {Number(1000).toLocaleString('ko-KR')}
            </button>
            <button
              className={'h-10 text-gray-0 border border-gray-0 rounded-[12px]'}
              onClick={() => setAmount((prev) => prev + 5000)}
            >
              {Number(5000).toLocaleString('ko-KR')}
            </button>
            <button
              className={'h-10 text-gray-0 border border-gray-0 rounded-[12px]'}
              onClick={() => setAmount((prev) => prev + 10000)}
            >
              {Number(10000).toLocaleString('ko-KR')}
            </button>
            <button
              className={'h-10 text-gray-0 border border-gray-0 rounded-[12px]'}
              onClick={() => setAmount((prev) => prev + 30000)}
            >
              {Number(30000).toLocaleString('ko-KR')}
            </button>
            <button
              className={'h-10 text-gray-0 border border-gray-0 rounded-[12px]'}
              onClick={() => setAmount((prev) => prev + 50000)}
            >
              {Number(50000).toLocaleString('ko-KR')}
            </button>
            <button
              className={'h-10 text-gray-0 border border-gray-0 rounded-[12px]'}
              onClick={() => setAmount((prev) => prev + 100000)}
            >
              {Number(100000).toLocaleString('ko-KR')}
            </button>
            <button
              className={'h-10 text-gray-0 border border-gray-0 rounded-[12px]'}
              onClick={() => setAmount((prev) => prev + 500000)}
            >
              {Number(500000).toLocaleString('ko-KR')}
            </button>
            <button
              className={'h-10 text-gray-0 border border-gray-0 rounded-[12px]'}
              onClick={() => setAmount((prev) => prev + 1000000)}
            >
              {Number(1000000).toLocaleString('ko-KR')}
            </button>
          </div>

          <div>
            <div className={'text-gray-40 font-pre-15-r-130 py-2'}>{`${modeText} 추가 메모`}</div>
            <textarea
              className={
                'w-full p-4 border border-gray-80 rounded-[16px] text-gray-10 placeholder:text-gray-50 font-pre-15-r-130'
              }
              placeholder={'입력'}
              value={memo}
              onChange={handleMemoChange}
            />
          </div>

          <div className={'flex items-center justify-end gap-2'}>
            <button
              className={'w-[80px] h-[48px] text-gray-0 font-pre-16-m-130 border border-gray-80 rounded-[60px] px-4'}
              onClick={handleClose}
            >
              취소
            </button>

            <button
              className={`w-[80px] h-[48px] text-gray-100 font-pre-16-m-130 ${
                mode === 'payment' ? 'bg-primary-50' : 'bg-red-50'
              } border border-gray-80 rounded-[60px] px-4`}
              onClick={handleSubmit}
            >
              {modeText}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        icon={<IconLine24RoundWarning />}
        title={`코인 ${modeText}`}
        content={`해당 회원의 코인을 ${modeText}합니다.\n계속 진행 하시겠습니까?`}
      />
    </>
  );
}
