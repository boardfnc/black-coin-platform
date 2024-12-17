'use client';

import Link from 'next/link';

import { useState } from 'react';

import { PurchaseGeneralCoinHistoryModal } from '../modal';
import SendCoinModal from '../modal/SendCoinModal';

import type { IPurchaseUserTableData, IPurchaseUserTableProps } from './PurchaseUserTable.types';

import { ROUTES } from '@/constants';
import { dayjs } from '@/utils';
import { convertDealStatus, convertMembershipGrade } from '@/utils/covert';

export default function PurchaseUserTable({ data, refetch }: IPurchaseUserTableProps) {
  const [isCoinHistoryModalOpen, setIsCoinHistoryModalOpen] = useState(false);
  const [isSendCoinModalOpen, setIsSendCoinModalOpen] = useState(false);
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState(0);

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IPurchaseUserTableData | undefined>(undefined);

  const handleAllCheck = (checked: boolean) => {
    const newCheckedItems: { [key: string]: boolean } = {};
    data?.forEach((item) => {
      if (item.status === '11' || item.status === '12') {
        newCheckedItems[item.uniqueId] = checked;
      }
    });
    setCheckedItems(newCheckedItems);
    setIsAllChecked(checked);
  };

  const handleSingleCheck = (checked: boolean, uniqueId: string) => {
    setCheckedItems((prev) => {
      const newCheckedItems = { ...prev, [uniqueId]: checked };
      const checkableItems = data?.filter((item) => item.status === '11' || item.status === '12');
      setIsAllChecked(checkableItems?.every((item) => newCheckedItems[item.uniqueId]) ?? false);
      return newCheckedItems;
    });
  };

  const handleSendCoin = () => {
    const checkedData = data?.filter((item) => checkedItems[item.uniqueId]);
    if (checkedData && checkedData.length > 0) {
      setIsSendCoinModalOpen(true);
    }
  };

  const handleSingleSendCoin = (item: IPurchaseUserTableData) => {
    setSelectedItem(item);
    setIsSendCoinModalOpen(true);
  };

  if (!data) return null;

  return (
    <div className={'w-full'}>
      <div className={'h-[50px] flex justify-end items-center gap-2 border border-gray-80 bg-gray-95 px-3'}>
        <div className={'text-gray-10 font-pre-13-m-130'}>선택된 항목</div>
        <button
          className={
            'h-8 rounded-lg text-gray-100 bg-purple-fmg60 transition disabled:bg-gray-50 font-pre-13-m-130 px-3'
          }
          onClick={handleSendCoin}
          disabled={Object.values(checkedItems).every((value) => !value)}
        >
          입금 확인(코인 지급)
        </button>
      </div>

      <table className={'w-full border-collapse text-center'}>
        <thead className={'text-gray-20 font-pre-13-m-130'}>
          <tr className={'bg-gray-99'}>
            <th className={'w-5 h-[52px] border border-gray-80 p-2'} rowSpan={2}>
              <input
                type={'checkbox'}
                className={`w-5 h-5 appearance-none rounded-md border border-[#CDD0D5] bg-white 
                  checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIiBmaWxsPSJub25lIj48cGF0aCBkPSJNMTMgMkg3QzQuMjM4NTggMiAyIDQuMjM4NTggMiA3VjEzQzIgMTUuNzYxNCA0LjIzODU4IDE4IDcgMThIMTNDMTUuNzYxNCAxOCAxOCAxNS43NjE0IDE4IDEzVjdDMTggNC4yMzg1OCAxNS43NjE0IDIgMTMgMloiIGZpbGw9IiM0MDlFRkYiIHN0cm9rZT0iIzQyODNDOSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xNC4xMjUgNy43NUw4LjYyNDk3IDEzTDUuODc1IDEwLjM3NSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] 
                  checked:bg-no-repeat checked:bg-center checked:border-0`}
                checked={isAllChecked}
                onChange={(event) => handleAllCheck(event.target.checked)}
              />
            </th>
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
              회원등급
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              아이디
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              회원명
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              추천파트너사명
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              상태
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              당일구매횟수
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              구매요청수량
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              보너스수량
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              지급수량
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              이력
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              지급관리
            </th>
          </tr>
        </thead>

        <tbody className={'text-gray-0 font-pre-13-r-130'}>
          {data.map((item, index) => (
            <tr key={index} className={'bg-gray-100'}>
              <td className={'w-5 h-12 border p-2'}>
                <input
                  type={'checkbox'}
                  className={`w-5 h-5 appearance-none rounded-md border border-[#CDD0D5] bg-white 
                    checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIiBmaWxsPSJub25lIj48cGF0aCBkPSJNMTMgMkg3QzQuMjM4NTggMiAyIDQuMjM4NTggMiA3VjEzQzIgMTUuNzYxNCA0LjIzODU4IDE4IDcgMThIMTNDMTUuNzYxNCAxOCAxOCAxNS43NjE0IDE4IDEzVjdDMTggNC4yMzg1OCAxNS43NjE0IDIgMTMgMloiIGZpbGw9IiM0MDlFRkYiIHN0cm9rZT0iIzQyODNDOSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xNC4xMjUgNy43NUw4LjYyNDk3IDEzTDUuODc1IDEwLjM3NSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] 
                    checked:bg-no-repeat checked:bg-center checked:border-0 disabled:bg-gray-90`}
                  checked={checkedItems[item.uniqueId] || false}
                  disabled={item.status !== '11' && item.status !== '12'}
                  onChange={(event) => handleSingleCheck(event.target.checked, item.uniqueId.toString())}
                />
              </td>
              <td className={'h-12 border p-2'}>{item.uniqueId}</td>
              <td className={'border p-2'}>{item.tradeNumber}</td>
              <td className={'border p-2'}>{dayjs(item.applyDate).format('YYYY.MM.DD HH:mm:ss')}</td>
              <td className={'border p-2'}>{convertMembershipGrade(item.authorRank)}</td>
              <td className={'border p-2'}>
                <Link
                  className={'text-primary-50 underline'}
                  href={ROUTES.ADMIN.USER_MANAGE.GENERAL_USER_DETAIL(item.memberId)}
                >
                  {item.loginId}
                </Link>
              </td>
              <td className={'border p-2'}>{item.name}</td>
              <td className={'border p-2'}>
                <Link
                  className={'text-primary-50 underline'}
                  href={ROUTES.ADMIN.USER_MANAGE.USER_DETAIL(item.managerId)}
                >
                  {item.partnerName}
                </Link>
              </td>
              <td className={'border p-2'}>{convertDealStatus(item.status)}</td>
              <td className={'border p-2'}>{item.todayPurchsCount}</td>
              <td className={'border p-2'}>{item.requestAmount?.toLocaleString('ko-KR') || 0}</td>
              <td className={'border p-2'}>{item.bonusAmount?.toLocaleString('ko-KR') || 0}</td>
              <td className={'border p-2'}>{item.paymentAmount?.toLocaleString('ko-KR') || 0}</td>
              <td className={'w-20 border p-2'}>
                <button
                  onClick={() => {
                    setSelectedHistoryIndex(index);
                    setIsCoinHistoryModalOpen(true);
                  }}
                  className={'border border-gray-70 bg-gray-100 px-3 py-2 rounded-lg text-gray-0 font-pre-13-m-130'}
                >
                  이력
                </button>
              </td>
              <td className={'w-20 border p-2'}>
                <button
                  onClick={() => handleSingleSendCoin(item)}
                  className={
                    'border text-primary-50 border-primary-50 bg-gray-100 px-3 py-2 rounded-lg font-pre-13-m-130 disabled:text-gray-50 disabled:bg-gray-90 disabled:border-gray-90'
                  }
                  disabled={item.status !== '11' && item.status !== '12'}
                >
                  {item.status !== '11' && item.status !== '12' ? '완료' : '지급'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PurchaseGeneralCoinHistoryModal
        coinHistoryModalTableData={data[selectedHistoryIndex]}
        isOpen={isCoinHistoryModalOpen}
        onClose={() => setIsCoinHistoryModalOpen(false)}
      />

      <SendCoinModal
        sendCoinModalTableData={selectedItem ? [selectedItem] : data.filter((item) => checkedItems[item.uniqueId])}
        refetch={refetch}
        isOpen={isSendCoinModalOpen}
        onClose={() => {
          setIsSendCoinModalOpen(false);
          setSelectedItem(undefined);
        }}
        type={'user'}
      />
    </div>
  );
}
