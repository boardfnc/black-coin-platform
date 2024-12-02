import { useCallback } from 'react';

import type { ITransactionHistoryMyTradeModalProps } from './TransactionHistoryMyTradeModal.types';

import IconLine24Close from '@/components/atoms/icons/icon-line/Close';
import Modal from '@/components/atoms/modals/Modal';
import { useFetch } from '@/hooks';
import { dealingsManagerDetailsHistoryService } from '@/services/dealings/dealings';
import { convertDealStatus } from '@/utils/covert';

export default function TransactionHistoryMyTradeModal(props: ITransactionHistoryMyTradeModalProps) {
  const { transactionHistoryMyTradeData, isOpen, onClose } = props;

  const fetchStatistics = useCallback(
    () =>
      dealingsManagerDetailsHistoryService({
        page: 1,
        per_page: Number.MAX_SAFE_INTEGER,
      }),
    [],
  );

  const { data } = useFetch(fetchStatistics, { enabled: isOpen && transactionHistoryMyTradeData != null });

  const transactionHistoryData = data?.data?.map((item) => ({
    tradeNumber: item.ca_delng_dtls_id,
    applyDate: item.created_at,
    status: item.delng_sttus,
    ipAddress: item.reg_ip,
  }));

  const handleClose = () => onClose();

  return (
    <Modal isOpen={isOpen} onClose={handleClose} width={'600px'} height={'700px'}>
      <div className={'flex flex-col gap-[30px] h-full px-2.5'}>
        <div className={'flex items-center justify-between gap-2 pt-1 pb-3'}>
          <div className={'text-gray-0 font-pre-20-m-130'}>상세내역</div>
          <div className={'text-gray-0 font-pre-13-r-130'}>
            <IconLine24Close className={'text-gray-10'} />
          </div>
        </div>

        <div className={'flex flex-col justify-between h-full'}>
          <div className={'h-[360px] overflow-y-auto'}>
            <table className={'w-full border-collapse'}>
              <thead className={'sticky top-0 z-10'}>
                <tr className={'h-8 bg-purple-fmg95'}>
                  <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>IP 주소</th>
                  <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>상태</th>
                  <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>시간</th>
                </tr>
              </thead>

              <tbody>
                {transactionHistoryData?.map((item, index) => (
                  <tr key={index} className={'h-10 text-center'}>
                    <td className={'text-gray-20 font-pre-13-r-130 border border-gray-80 py-1 px-2.5'}>
                      {item.ipAddress}
                    </td>
                    <td className={'w-[70px] text-gray-20 font-pre-13-r-130 border border-gray-80 py-1 px-2.5'}>
                      {convertDealStatus(item.status)}
                    </td>
                    <td className={'text-gray-20 font-pre-13-r-130 border border-gray-80 py-1 px-2.5'}>
                      {item.applyDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={'flex justify-end'}>
            <button
              className={
                'text-gray-10 font-pre-16-m-130 w-[90px] h-[48px] px-4 flex justify-center items-center border border-gray-80 rounded-[60px]'
              }
              onClick={handleClose}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
