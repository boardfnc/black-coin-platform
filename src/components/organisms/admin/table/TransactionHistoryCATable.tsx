import { useState } from 'react';

import type { ITransactionHistoryCATableProps } from './TransactionHistoryCATable.types';

import { CATransactionHistoryModal } from '@/components/organisms/admin/modal';
import { convertDealStatus, convertDealType } from '@/utils/covert';

export default function TransactionHistoryCATable({ data }: ITransactionHistoryCATableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectIndex, setSelectIndex] = useState(0);

  if (!data) return null;

  return (
    <>
      <table className={'w-full border-collapse text-center'}>
        <thead className={'text-gray-20 font-pre-13-m-130'}>
          <tr className={'bg-gray-99'}>
            <th className={'h-[52px] border border-gray-80 p-2'} rowSpan={2}>
              NO.
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              거래번호
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              신청일
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              구분
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              상태
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              파트너사명
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              코드명
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              구매(판매) 전 보유수량
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              구매(판매) 수량
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              이력
            </th>
          </tr>
        </thead>

        <tbody className={'text-gray-0 font-pre-13-r-130'}>
          {data.map((item, index) => (
            <tr key={item.indexId} className={'bg-gray-100'}>
              <td className={'h-[48px] border p-2'}>{item.indexId}</td>
              <td className={'border p-2'}>{item.tradeNumber}</td>
              <td className={'border p-2'}>{item.applyDate}</td>
              <td className={'border p-2'}>{convertDealType(item.type)}</td>
              <td className={'border p-2'}>{convertDealStatus(item.status)}</td>
              <td className={'border p-2'}>{item.partnerName}</td>
              <td className={'border p-2'}>{item.codeName}</td>
              <td className={'border p-2'}>{item.purchasePrevCount.toLocaleString('ko-KR')}</td>
              <td className={'border p-2'}>{item.purchaseCount.toLocaleString('ko-KR')}</td>
              <td className={'w-[80px] border p-2'}>
                <button
                  className={'h-[32px] font-pre-13-m-130 text-gray-10 border rounded-lg border-gray-70 p-2'}
                  onClick={() => {
                    setSelectIndex(index);
                    setIsOpen(true);
                  }}
                >
                  이력
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CATransactionHistoryModal
        transactionHistoryTableData={data[selectIndex]}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
