'use client';

import { useState } from 'react';

import { ConfirmColModal, ConfirmRowModal } from '../modal';

import type { ICoinBuyTableData, ICoinBuyTableProps } from './CoinBuyTable.types';

import { IconLine24Loading, IconLine24LineCheck, IconLine24RoundWarning } from '@/components/atoms/icons/icon-line';
import { useRequest, useToast } from '@/hooks';
import { coinPurchaseManagerCancelService, coinPurchaseManagerCompletionService } from '@/services/admin/coin/coin';
import { dayjs } from '@/utils';
import { convertDealStatus, convertDealStatusColor } from '@/utils/covert';

export default function CoinBuyTable({ data, refetch }: ICoinBuyTableProps) {
  const [isConfirmRowModalOpen, setIsConfirmRowModalOpen] = useState(false);
  const [isConfirmColModalOpen, setIsConfirmColModalOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<ICoinBuyTableData | undefined>(undefined);
  const { open: openToast } = useToast();
  const { request } = useRequest();

  const handleCompletePayment = async (item?: ICoinBuyTableData) => {
    if (!item) return;

    const response = await request(() => coinPurchaseManagerCompletionService({ id: item.dealingId }));

    if (response != null && 'status' in response && response.status) {
      openToast({ message: '입금 완료 처리되었습니다. 입금 내역 확인 후 처리가 완료됩니다.' });
      setIsConfirmColModalOpen(false);
      refetch();
    }
  };

  const handleCancelTrade = async (item?: ICoinBuyTableData) => {
    if (!item) return;

    const response = await request(() => coinPurchaseManagerCancelService({ id: item.dealingId }));

    if (response != null && 'status' in response && response.status) {
      openToast({ type: 'success', message: '거래가 취소되었습니다.' });
      setIsConfirmRowModalOpen(false);
      refetch();
    }
  };

  if (!data) return null;

  return (
    <div className={'w-full'}>
      <table className={'w-full border-collapse text-center'}>
        <thead className={'text-gray-20 font-pre-13-m-130'}>
          <tr className={'bg-gray-99'}>
            <th className={'h-[52px] border border-gray-80 p-2'} rowSpan={2}>
              NO.
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              거래번호
            </th>
            <th className={'w-[160px] border border-gray-80 p-2'} rowSpan={2}>
              신청일
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              상태
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              구매요청수량
            </th>
            <th className={'w-[160px] border border-gray-80 p-2'} rowSpan={2}>
              완료일
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              입금금액
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              코인수령액
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              입금완료
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              거래관리
            </th>
          </tr>
        </thead>

        <tbody className={'text-gray-0 font-pre-13-r-130'}>
          {data.map((item, index) => (
            <tr key={index} className={'bg-gray-100'}>
              <td className={'h-[48px] border p-2'}>{item.uniqueId}</td>
              <td className={'border p-2'}>{item.tradeNumber}</td>
              <td className={'border p-2'}>{dayjs(item.applyDate).format('YYYY.MM.DD HH:mm:ss')}</td>
              <td className={`border p-2 ${convertDealStatusColor(item.status)}`}>{convertDealStatus(item.status)}</td>
              <td className={'border p-2'}>{item.requestAmount?.toLocaleString('ko-KR') || 0}</td>
              <td className={'border p-2'}>
                {item.completeDate != null && item.completeDate !== '-'
                  ? dayjs(item.completeDate).format('YYYY.MM.DD HH:mm:ss')
                  : '-'}
              </td>
              <td className={'border p-2'}>{item.paymentAmount?.toLocaleString('ko-KR') || 0}</td>
              <td className={'border p-2'}>{item.paymentAmount?.toLocaleString('ko-KR') || 0}</td>
              <td className={'w-[100px] border p-2'}>
                {item.status === '11' && (
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setIsConfirmColModalOpen(true);
                    }}
                    className={'h-[32px] text-gray-100 bg-gray-0 px-3 py-2 rounded-lg font-pre-13-m-130'}
                  >
                    입금완료
                  </button>
                )}
                {item.status === '12' && (
                  <div
                    className={
                      'h-[32px] flex justify-center items-center gap-1.5 ps-3 pe-4 py-2 rounded-lg bg-gray-90 text-gray-10 font-pre-13-m-130 break-keep'
                    }
                  >
                    <IconLine24Loading />

                    <div>확인중</div>
                  </div>
                )}
                {(item.status === '13' || item.status === '14') && (
                  <div
                    className={
                      'h-[32px] flex justify-center items-center gap-1.5 ps-3 pe-4 py-2 rounded-lg bg-gray-90 text-gray-50 font-pre-13-m-130'
                    }
                  >
                    <IconLine24LineCheck />

                    <div>완료</div>
                  </div>
                )}
              </td>
              <td className={'w-[80px] border p-2'}>
                {item.status === '11' && (
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setIsConfirmRowModalOpen(true);
                    }}
                    className={'text-gray-100  bg-red-50 px-3 py-2 rounded-lg font-pre-13-m-130'}
                  >
                    취소
                  </button>
                )}
                {item.status === '12' && <div>취소불가</div>}
                {(item.status === '13' || item.status === '14') && <div>-</div>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmRowModal
        isOpen={isConfirmRowModalOpen}
        onClose={() => setIsConfirmRowModalOpen(false)}
        icon={<IconLine24RoundWarning />}
        iconColor={'red'}
        title={'거래 취소'}
        content={'해당 거래를 취소합니다.\n계속 진행하시겠습니까?'}
        onConfirm={() => handleCancelTrade(selectedItem)}
      />

      <ConfirmColModal
        isOpen={isConfirmColModalOpen}
        onClose={() => setIsConfirmColModalOpen(false)}
        title={'코인 구매 입금완료'}
        content={'코인 구매를 입금완료하시겠습니까?'}
        onConfirm={() => handleCompletePayment(selectedItem)}
      />
    </div>
  );
}
