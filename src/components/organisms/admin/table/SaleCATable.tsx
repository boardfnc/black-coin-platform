'use client';

import Image from 'next/image';

import { useState } from 'react';

import { SaleCACoinHistoryModal } from '../modal';
import SaleCoinModal from '../modal/SaleCoinModal';

import type { ISaleCATableData, ISaleCATableProps } from './SaleCATable.types';

import excelIcon from '@/images/icons/excel.png';
import { convertDealStatus, convertSaleType } from '@/utils/covert';
import { downloadExcel } from '@/utils/excel';

export default function SaleCATable({ data }: ISaleCATableProps) {
  const [isCoinHistoryModalOpen, setIsCoinHistoryModalOpen] = useState(false);
  const [isSendCoinModalOpen, setIsSendCoinModalOpen] = useState(false);
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState(0);

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ISaleCATableData | undefined>(undefined);
  const [useDefaultDeposit, setUseDefaultDeposit] = useState(true);

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

  const handleSaleConfirm = () => {
    const checkedData = data?.filter((item) => checkedItems[item.uniqueId]);
    if (checkedData && checkedData.length > 0) {
      setSelectedItem(undefined);
      setIsSendCoinModalOpen(true);
      setUseDefaultDeposit(true);
    }
  };

  const handleSaleRegister = () => {
    const checkedData = data?.filter((item) => checkedItems[item.uniqueId]);
    if (checkedData && checkedData.length > 0) {
      setSelectedItem(undefined);
      setIsSendCoinModalOpen(true);
      setUseDefaultDeposit(false);
    }
  };

  const handleExcelDownload = () => {
    const checkedData = data?.filter((item) => checkedItems[item.uniqueId]);
    if (!checkedData || checkedData.length === 0) return;

    const excelData = checkedData.map((item) => [
      item.uniqueId,
      item.tradeNumber,
      item.applyDate,
      item.partnerName,
      item.codeName,
      convertDealStatus(item.status),
      item.requestAmount,
      item.paymentAmount,
    ]);

    downloadExcel({
      headers: ['NO.', '거래번호', '신청일', '파트너사명', '코드명', '상태', '판매요청수량', '정산(지급)금액'],
      data: excelData,
      fileName: '코인 판매 관리 (CA)',
    });
  };

  const handleSingleSendCoin = (item: ISaleCATableData) => {
    setSelectedItem(item);
    setIsSendCoinModalOpen(true);
    setUseDefaultDeposit(true);
  };

  if (!data) return null;

  return (
    <div className={'w-full'}>
      <div className={'h-[50px] flex justify-end items-center gap-2 border border-gray-80 bg-gray-95 px-3'}>
        <div className={'text-gray-10 font-pre-13-m-130'}>선택된 항목</div>
        <button
          onClick={handleSaleRegister}
          className={
            'h-[32px] rounded-lg text-gray-10 bg-gray-100 border border-gray-70 flex items-center justify-center transition font-pre-13-m-130 px-3'
          }
        >
          판매접수
        </button>

        <button
          onClick={handleSaleConfirm}
          className={
            'h-[32px] rounded-lg text-gray-10 bg-gray-100 border border-gray-70 flex items-center justify-center transition font-pre-13-m-130 px-3'
          }
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
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              신청일
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              파트너사명
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              코드명
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              상태
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              판매요청수량
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              정산(지급)금액
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
              <td className={'h-[48px] border p-2'}>
                <input
                  type={'checkbox'}
                  className={`w-5 h-5 appearance-none rounded-md border border-[#CDD0D5] bg-white 
                    checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIiBmaWxsPSJub25lIj48cGF0aCBkPSJNMTMgMkg3QzQuMjM4NTggMiAyIDQuMjM4NTggMiA3VjEzQzIgMTUuNzYxNCA0LjIzODU4IDE4IDcgMThIMTNDMTUuNzYxNCAxOCAxOCAxNS43NjE0IDE4IDEzVjdDMTggNC4yMzg1OCAxNS43NjE0IDIgMTMgMloiIGZpbGw9IiM0MDlFRkYiIHN0cm9rZT0iIzQyODNDOSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xNC4xMjUgNy43NUw4LjYyNDk3IDEzTDUuODc1IDEwLjM3NSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] 
                    checked:bg-no-repeat checked:bg-center checked:border-0 disabled:bg-gray-90`}
                  checked={checkedItems[item.uniqueId] || false}
                  disabled={item.type !== '1' || item.status !== '22'}
                  onChange={(event) => handleSingleCheck(event.target.checked, item.uniqueId.toString())}
                />
              </td>
              <td className={'h-[48px] border p-2'}>{item.uniqueId}</td>
              <td className={'border p-2'}>{item.tradeNumber}</td>
              <td className={'border p-2'}>{item.applyDate}</td>
              <td className={'border p-2'}>{item.partnerName}</td>
              <td className={'border p-2'}>{item.codeName}</td>
              <td className={'border p-2'}>{convertDealStatus(item.status)}</td>
              <td className={'border p-2'}>{item.requestAmount?.toLocaleString('ko-KR') || 0}</td>
              <td className={'border p-2'}>{item.paymentAmount?.toLocaleString('ko-KR') || 0}</td>
              <td className={'w-[80px] border p-2'}>
                <button
                  onClick={() => {
                    setSelectedHistoryIndex(index);
                    setIsCoinHistoryModalOpen(true);
                  }}
                  className={'border border-gray-70 bg-gray-100 px-3 py-2 rounded-lg text-gray-10 font-pre-13-m-130'}
                >
                  이력
                </button>
              </td>
              <td className={'w-[80px] border p-2'}>
                <button
                  onClick={() => handleSingleSendCoin(item)}
                  className={
                    'border text-primary-50 border-primary-50 bg-gray-100 px-3 py-2 rounded-lg font-pre-13-m-130 disabled:text-gray-50 disabled:bg-gray-90 disabled:border-gray-90'
                  }
                  disabled={item.type !== '1' || item.status !== '22'}
                >
                  {convertSaleType(item.type)}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <SaleCACoinHistoryModal
        coinHistoryModalTableData={data[selectedHistoryIndex]}
        isOpen={isCoinHistoryModalOpen}
        onClose={() => setIsCoinHistoryModalOpen(false)}
      />

      <SaleCoinModal
        saleCoinModalTableData={selectedItem ? [selectedItem] : data.filter((item) => checkedItems[item.uniqueId])}
        isOpen={isSendCoinModalOpen}
        onClose={() => {
          setIsSendCoinModalOpen(false);
          setSelectedItem(undefined);
        }}
        type={'ca'}
        useDefaultDeposit={useDefaultDeposit}
      />
    </div>
  );
}
