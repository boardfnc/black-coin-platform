import type { ISaleCompleteModalProps } from './SaleCompleteModal.types';

import { IconLine24Bell, IconLine24ConfirmEtc } from '@/components/atoms/icons/icon-line';
import { Modal } from '@/components/atoms/modals';
import { useToast } from '@/hooks';
import { convertBank } from '@/utils/covert';

export default function SaleCompleteModal({
  onClose,
  isOpen,
  createdAt,
  bank,
  account,
  bankAccount,
  bankAmount,
}: ISaleCompleteModalProps) {
  const { open: openToast } = useToast();

  if (!bank || !account || !bankAccount || !bankAmount) return null;

  const handleCopyClick = (text: string) => {
    navigator.clipboard.writeText(text);

    openToast({ message: '계좌 복사 성공!' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width={'400px'}>
      <div className={'flex flex-col gap-[30px] px-[10px] py-[30px]'}>
        <div className={'flex flex-col justify-center items-center gap-4'}>
          <IconLine24ConfirmEtc />

          <div className={'flex flex-col justify-center items-center gap-2'}>
            <div className={'text-gray-10 font-suit-18-b-130'}>판매 등록이 완료되었습니다.</div>
            <div className={'text-gray-40 font-pre-13-r-130'}>{createdAt}</div>
          </div>
        </div>

        <div>
          <div className={'h-8 mb-2 border-b border-line-line02'}>
            <div className={'text-gray-20 font-pre-18-m-130'}>BlackCoin</div>
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
