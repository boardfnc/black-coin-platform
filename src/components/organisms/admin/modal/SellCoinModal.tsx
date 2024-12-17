import { useCallback, useState } from 'react';

import type {
  IBuyCoinModalProps,
  IBuyCompleteModalData,
  IBuyCompleteModalProps,
  IConfirmModalProps,
} from './BuyCoinModal.types';

import {
  IconLine24Bell,
  IconLine24Close,
  IconLine24ConfirmEtc,
  IconLine24SavingMoney,
} from '@/components/atoms/icons/icon-line';
import { Image } from '@/components/atoms/images';
import { Modal } from '@/components/atoms/modals';
import { useAuthor } from '@/components/atoms/provider/AdminProvider';
import { useFetch, useRequest, useToast } from '@/hooks';
import { sellCoin } from '@/mocks/images';
import { coinSaleManagerService } from '@/services/admin/coin/coin';
import { memberMyPageService } from '@/services/admin/member/members';
import { convertBank } from '@/utils/covert';

export function ConfirmModal({
  onClose,
  onConfirm,
  isOpen,
  title,
  content,
  cancelText = '취소',
  confirmText = '진행',
  width = '400px',
}: IConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width={width}>
      <div className={'py-1 px-4'}>
        <div className={'flex flex-col justify-center items-center gap-5'}>
          <Image src={sellCoin} alt={'코인 이미지'} />

          <div className={'flex flex-col gap-2'}>
            <span className={'text-center text-gray-0 font-pre-18-r-130'}>{title}</span>

            <div className={'text-start mb-[30px]'}>
              {typeof content === 'string' ? (
                <p className={'text-center text-gray-30 font-pre-15-r-130 whitespace-pre-line'}>{content}</p>
              ) : (
                content
              )}
            </div>
          </div>
        </div>

        <div className={'flex justify-end gap-2'}>
          <button className={'w-[90px] h-12 text-gray-0 font-pre-16-m-130 bg-gray-90 rounded-3xl'} onClick={onClose}>
            {cancelText}
          </button>

          <button className={'w-[90px] h-12 text-gray-100 font-pre-16-m-130 bg-gray-0 rounded-3xl'} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function BuyCompleteModal({
  onClose,
  isOpen,
  createdAt,
  bank,
  account,
  bankAccount,
  bankAmount,
}: IBuyCompleteModalProps) {
  const { open: openToast } = useToast();

  if (!bank || !account || !bankAccount || !bankAmount) return null;

  const handleCopyClick = (text: string) => {
    navigator.clipboard.writeText(text);

    openToast({ message: '계좌 복사 성공!' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width={'500px'}>
      <div className={'flex flex-col gap-[30px] p-[30px]'}>
        <div className={'flex flex-col justify-center items-center gap-4'}>
          <IconLine24ConfirmEtc />

          <div className={'flex flex-col justify-center items-center gap-2'}>
            <div className={'text-gray-10 font-suit-18-b-130'}>판매 등록이 완료되었습니다.</div>
            <div className={'text-gray-40 font-pre-13-r-130'}>{createdAt}</div>
          </div>
        </div>

        <div>
          <div className={'h-8 mb-2 border-b border-line-line02'}>
            <div className={'text-gray-20 font-pre-18-m-130'}>ServiceName</div>
          </div>
          <div className={'flex flex-col gap-3 pt-3'}>
            <div className={'flex flex-row justify-between items-center'}>
              <div className={'text-gray-40 font-pre-14-m-130'}>입금은행</div>
              <div className={'text-gray-10 font-pre-14-m-130'}>{convertBank(bank)}</div>
            </div>

            <div className={'flex flex-row justify-between items-center'}>
              <div className={'text-gray-40 font-pre-14-m-130'}>입금계좌</div>
              <div className={'flex justify-between items-center gap-2'}>
                <div className={'text-gray-10 font-pre-14-m-130'}>{account}</div>
                <button
                  className={'text-gray-10 font-pre-12-m-130 border border-gray-70 rounded-lg bg-gray-100 px-3 py-1.5'}
                  onClick={() => handleCopyClick(account)}
                >
                  복사하기
                </button>
              </div>
            </div>

            <div className={'flex flex-row justify-between items-center'}>
              <div className={'text-gray-40 font-pre-14-m-130'}>예금주</div>
              <div className={'text-gray-10 font-pre-14-m-130'}>{bankAccount}</div>
            </div>

            <div className={'flex flex-row justify-between items-center'}>
              <div className={'text-gray-40 font-pre-14-m-130'}>임금금액</div>
              <div className={'text-secondary-pink50 font-pre-20-b-130'}>
                {Number(bankAmount).toLocaleString('ko-KR')}
              </div>
            </div>

            <div className={'flex gap-1 p-3 bg-primary-99 rounded-xl'}>
              <div className={'p-0.5 bg-red-50 rounded-full h-max'}>
                <IconLine24Bell />
              </div>
              <div className={'text-gray-10 font-pre-14-m-130'}>
                입금 내역 확인 시{' '}
                <span className={'text-red-50 font-pre-13-b-130'}>기재한 은행정보와 예금주가 다를 경우 반환처리</span>{' '}
                되니 반드시 확인 후 입금해주시기 바랍니다.
              </div>
            </div>
          </div>
        </div>

        <div className={'flex justify-end items-center gap-2'}>
          <button
            className={'w-20 h-12 text-gray-10 font-pre-16-m-130 border border-gray-80 rounded-[60px] px-4'}
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default function SellCoinModal({ isOpen, mode, onClose, refetch }: IBuyCoinModalProps) {
  const { isSuperAdmin } = useAuthor();
  const { request } = useRequest();

  const myProfileData = useCallback(() => memberMyPageService(), []);
  const { data: myData } = useFetch(myProfileData);

  const [amount, setAmount] = useState<number>(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [showCompleteModalData, setShowCompleteModalData] = useState<IBuyCompleteModalData | undefined>(undefined);

  const myCoin = myData?.data?.hold_coin || 0;

  const handleReset = () => setAmount(0);

  const handleSubmit = async () => {
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    const response = await request(() =>
      coinSaleManagerService({
        delng_qy: amount,
      }),
    );

    if (response != null && 'status' in response && response.status) {
      if ('data' in response && response.data) {
        setShowComplete(true);
        setShowCompleteModalData({
          createdAt: response.data.created_at,
          bank: response.data.bank,
          account: response.data.dpstr,
          bankAccount: response.data.acnutno,
          bankAmount: response.data.pymnt_am,
        });
        refetch?.();
        onClose();
      }
    }

    setShowConfirm(false);
    return response;
  };

  const handleClose = () => {
    setAmount(0);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} width={'500px'}>
        <div className={'text-gray-10 pt-1 pb-3 px-2.5 flex justify-between items-center'}>
          <div className={'font-pre-20-m-130'}>코인 판매</div>

          <button onClick={handleClose}>
            <IconLine24Close />
          </button>
        </div>

        <div className={'flex flex-col gap-[30px] pt-2 px-[10px]'}>
          <div className={'flex flex-col gap-[10px]'}>
            {mode === 'payment' && (
              <div className={'h-14 flex justify-between items-center border-b border-gray-20'}>
                <div className={'flex items-center gap-1'}>
                  <IconLine24SavingMoney className={'text-purple-fmg50'} />
                  <span className={'text-gray-10 font-pre-16-m-130'}>내 보유 코인</span>
                </div>

                <span className={'text-purple-fmg50 font-pre-18-b-130'}>
                  {isSuperAdmin ? '-' : myCoin.toLocaleString('ko-KR')} C
                </span>
              </div>
            )}
          </div>

          <div>
            <div className={'text-gray-40 font-pre-15-r-130 py-2'}>판매 수량</div>
            <div className={'flex justify-between items-center gap-2'}>
              <input
                className={'w-full py-4 px-3.5 border text-gray-0 border-gray-80 rounded-2xl font-pre-17-r-130'}
                type={'text'}
                value={amount.toLocaleString('ko-KR')}
                onChange={(event) => {
                  const value = event.target.value.replace(/[^0-9]/g, '');
                  setAmount(Number(value));
                }}
              />
              <button
                className={
                  'w-[90px] h-12 flex items-center justify-center text-gray-100 border border-gray-0 bg-gray-0 rounded-[14px] font-pre-16-m-130'
                }
                onClick={handleReset}
              >
                초기화
              </button>
            </div>
          </div>

          <div className={'grid grid-cols-4 gap-2'}>
            <button
              className={'h-10 text-gray-0 border border-gray-0 rounded-xl font-pre-14-m-130'}
              onClick={() => setAmount((prev) => prev + 1000)}
            >
              {Number(1000).toLocaleString('ko-KR')}
            </button>
            <button
              className={'h-10 text-gray-0 border border-gray-0 rounded-xl font-pre-14-m-130'}
              onClick={() => setAmount((prev) => prev + 5000)}
            >
              {Number(5000).toLocaleString('ko-KR')}
            </button>
            <button
              className={'h-10 text-gray-0 border border-gray-0 rounded-xl font-pre-14-m-130'}
              onClick={() => setAmount((prev) => prev + 10000)}
            >
              {Number(10000).toLocaleString('ko-KR')}
            </button>
            <button
              className={'h-10 text-gray-0 border border-gray-0 rounded-xl font-pre-14-m-130'}
              onClick={() => setAmount((prev) => prev + 30000)}
            >
              {Number(30000).toLocaleString('ko-KR')}
            </button>
            <button
              className={'h-10 text-gray-0 border border-gray-0 rounded-xl font-pre-14-m-130'}
              onClick={() => setAmount((prev) => prev + 50000)}
            >
              {Number(50000).toLocaleString('ko-KR')}
            </button>
            <button
              className={'h-10 text-gray-0 border border-gray-0 rounded-xl font-pre-14-m-130'}
              onClick={() => setAmount((prev) => prev + 100000)}
            >
              {Number(100000).toLocaleString('ko-KR')}
            </button>
            <button
              className={'h-10 text-gray-0 border border-gray-0 rounded-xl font-pre-14-m-130'}
              onClick={() => setAmount((prev) => prev + 500000)}
            >
              {Number(500000).toLocaleString('ko-KR')}
            </button>
            <button
              className={'h-10 text-gray-0 border border-gray-0 rounded-xl font-pre-14-m-130'}
              onClick={() => setAmount((prev) => prev + 1000000)}
            >
              {Number(1000000).toLocaleString('ko-KR')}
            </button>
          </div>

          <div className={'p-5 flex flex-col gap-2.5 border border-gray-80 bg-gray-100 rounded-2xl'}>
            <div className={'text-gray-30 font-pre-14-m-130'}>✻ 구매/판매 등록 안내</div>

            <div className={'text-gray-20 font-pre-13-r-130'}>
              <span className={'me-2'}>•</span>은행 점검 시간에는 코인전송 외에 구매/판매 신청이 모두 반려됩니다.
            </div>

            <div className={'text-red-50 font-pre-13-r-130'}>
              <span className={'me-2'}>•</span>은행 점검 시간 : 23:30 ~ 00:40
            </div>
          </div>

          <div className={'flex items-center justify-end gap-2'}>
            <button
              className={'w-[90px] h-12 text-gray-0 font-pre-16-m-130 border border-gray-80 rounded-[60px] px-4'}
              onClick={handleClose}
            >
              취소
            </button>

            <button
              className={`flex-auto  h-12 text-gray-100 font-pre-16-m-130 ${
                mode === 'payment' ? 'bg-green-fmg50' : 'bg-red-50'
              } border border-gray-80 rounded-[60px] px-4`}
              onClick={handleSubmit}
            >
              판매 등록
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        title={`판매 등록`}
        content={`판매 등록을 진행하시겠습니까?`}
      />

      <BuyCompleteModal isOpen={showComplete} onClose={() => setShowComplete(false)} {...showCompleteModalData} />
    </>
  );
}
