'use client';
import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';

import { SaleGeneralCoinHistoryModal } from '../modal';
import SaleCoinModal from '../modal/SaleCoinModal';

import type { ISaleGeneralTableData, ISaleGeneralTableProps } from './SaleGeneralTable.types';

import { ROUTES } from '@/constants';
import excelIcon from '@/images/icons/excel.png';
import { convertDealStatus, convertMembershipGrade, convertSaleType } from '@/utils/covert';
import { downloadExcel } from '@/utils/excel';

export default function SaleGeneralTable({ data, refetch }: ISaleGeneralTableProps) {
  const [isCoinHistoryModalOpen, setIsCoinHistoryModalOpen] = useState(false);
  const [isSendCoinModalOpen, setIsSaleCoinModalOpen] = useState(false);
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState(0);

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ISaleGeneralTableData | undefined>(undefined);
  const [useDefaultDeposit, setUseDefaultDeposit] = useState(false);

  const handleAllCheck = (checked: boolean) => {
    const newCheckedItems: { [key: string]: boolean } = {};
    data?.forEach((item) => {
      if (item.type === '1' && item.status === '22') {
        newCheckedItems[item.uniqueId] = checked;
      }
    });
    setCheckedItems(newCheckedItems);
    setIsAllChecked(checked);
  };

  const handleSingleCheck = (checked: boolean, uniqueId: string) => {
    setCheckedItems((prev) => {
      const newCheckedItems = { ...prev, [uniqueId]: checked };
      const checkableItems = data?.filter((item) => item.type === '1' && item.status === '22');
      setIsAllChecked(checkableItems?.every((item) => newCheckedItems[item.uniqueId]) ?? false);
      return newCheckedItems;
    });
  };

  const handleSaleCoin = (isDeposit: boolean) => {
    const checkedData = data?.filter((item) => checkedItems[item.uniqueId]);
    if (checkedData && checkedData.length > 0) {
      setSelectedItem(undefined);
      setIsSaleCoinModalOpen(true);
      setUseDefaultDeposit(isDeposit);
    }
  };

  const handleSingleSendCoin = (item: ISaleGeneralTableData) => {
    setSelectedItem(item);
    setIsSaleCoinModalOpen(true);
    setUseDefaultDeposit(false);
  };

  const handleExcelDownload = () => {
    const checkedData = data?.filter((item) => checkedItems[item.uniqueId]);
    if (!checkedData || checkedData.length === 0) return;

    const excelData = checkedData.map((item) => [
      item.uniqueId,
      item.tradeNumber,
      item.applyDate,
      convertMembershipGrade(item.authorRank),
      item.loginId,
      item.name,
      item.partnerName,
      convertDealStatus(item.status),
      item.requestAmount,
      item.paymentAmount,
    ]);

    downloadExcel({
      headers: [
        'NO.',
        '거래번호',
        '신청일',
        '회원등급',
        '아이디',
        '회원명',
        '추천파트너사명',
        '상태',
        '판매요청수량',
        '지급금액',
      ],
      data: excelData,
      fileName: '코인 판매 관리 (일반)',
    });
  };

  if (!data) return null;

  return (
    <div className={'w-full'}>
      <div className={'h-[50px] flex justify-end items-center gap-2 border border-gray-80 bg-gray-95 px-3'}>
        <div className={'text-gray-10 font-pre-13-m-130'}>선택된 항목</div>

        <button
          className={
            'h-[32px] rounded-lg text-gray-10 bg-gray-100 border border-gray-70 flex items-center justify-center transition font-pre-13-m-130 px-3'
          }
          onClick={() => handleSaleCoin(false)}
        >
          판매접수
        </button>

        <button
          className={
            'h-[32px] rounded-lg text-gray-10 bg-gray-100 border border-gray-70 flex items-center justify-center transition font-pre-13-m-130 px-3'
          }
          onClick={() => handleSaleCoin(true)}
        >
          판매확인(금액 입금)
        </button>

        <button
          className={
            'h-[32px] rounded-lg text-gray-10 bg-gray-100 border border-gray-70 flex items-center justify-center gap-1.5 transition font-pre-13-m-130 px-3'
          }
          onClick={handleExcelDownload}
        >
          <Image src={excelIcon} alt={'excel'} className={'w-4 h-4'} />

          <span>엑셀다운</span>
        </button>
      </div>

      <table className={'w-full border-collapse text-center'}>
        <thead className={'text-gray-20 font-pre-13-m-130'}>
          <tr className={'bg-gray-99'}>
            <th className={'h-[52px] border border-gray-80 p-2'} rowSpan={2}>
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
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
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
              판매요청수량
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              지급금액
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              이력
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              입금관리
            </th>
          </tr>
        </thead>

        <tbody className={'text-gray-0 font-pre-13-r-130'}>
          {data.map((item, index) => (
            <tr key={index} className={'bg-gray-100'}>
              <td className={'w-5 h-[48px] border p-2'}>
                <input
                  type={'checkbox'}
                  className={`w-5 h-5 appearance-none rounded-md border border-[#CDD0D5] bg-white 
                    checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIiBmaWxsPSJub25lIj48cGF0aCBkPSJNMTMgMkg3QzQuMjM4NTggMiAyIDQuMjM4NTggMiA3VjEzQzIgMTUuNzYxNCA0LjIzODU4IDE4IDcgMThIMTNDMTUuNzYxNCAxOCAxOCAxNS43NjE0IDE4IDEzVjdDMTggNC4yMzg1OCAxNS43NjE0IDIgMTMgMloiIGZpbGw9IiM0MDlFRkYiIHN0cm9rZT0iIzQyODNDOSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xNC4xMjUgNy43NUw4LjYyNDk3IDEzTDUuODc1IDEwLjM3NSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] 
                    checked:bg-no-repeat checked:bg-center checked:border-0 disabled:bg-gray-90 `}
                  checked={checkedItems[item.uniqueId] || false}
                  disabled={item.type !== '1' || item.status !== '22'}
                  onChange={(event) => handleSingleCheck(event.target.checked, item.uniqueId.toString())}
                />
              </td>
              <td className={'h-[48px] border p-2'}>{item.uniqueId}</td>
              <td className={'border p-2'}>{item.tradeNumber}</td>
              <td className={'border p-2'}>{item.applyDate}</td>
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
              <td className={'border p-2'}>{item.requestAmount?.toLocaleString('ko-KR') || 0}</td>
              <td className={'border p-2'}>{item.paymentAmount?.toLocaleString('ko-KR') || 0}</td>
              <td className={'w-[80px] border p-2'}>
                <button
                  className={'border border-gray-70 bg-gray-100 px-3 py-2 rounded-lg text-gray-10 font-pre-13-m-130'}
                  onClick={() => {
                    setSelectedHistoryIndex(index);
                    setIsCoinHistoryModalOpen(true);
                  }}
                >
                  이력
                </button>
              </td>
              <td className={'w-[80px] border p-2'}>
                <button
                  className={
                    'border border-red-60 text-red-60 bg-gray-100 px-3 py-2 rounded-lg font-pre-13-m-130 disabled:text-gray-50 disabled:bg-gray-90 disabled:border-gray-90'
                  }
                  onClick={() => handleSingleSendCoin(item)}
                  disabled={item.type !== '1' || item.status !== '22'}
                >
                  {convertSaleType(item.type)}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <SaleGeneralCoinHistoryModal
        coinHistoryModalTableData={data[selectedHistoryIndex]}
        isOpen={isCoinHistoryModalOpen}
        onClose={() => setIsCoinHistoryModalOpen(false)}
        useDefaultDeposit={useDefaultDeposit}
      />

      <SaleCoinModal
        saleCoinModalTableData={selectedItem ? [selectedItem] : data.filter((item) => checkedItems[item.uniqueId])}
        refetch={refetch}
        isOpen={isSendCoinModalOpen}
        onClose={() => {
          setIsSaleCoinModalOpen(false);
          setSelectedItem(undefined);
        }}
        type={'user'}
        useDefaultDeposit={useDefaultDeposit}
      />
    </div>
  );
}
