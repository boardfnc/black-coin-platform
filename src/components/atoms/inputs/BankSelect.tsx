import { useState } from 'react';

import { convertBank } from '../../../utils/covert';

interface BankSelectProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export function BankSelect({ className, value, onChange, onBlur }: BankSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const bankList = [
    '002',
    '003',
    '004',
    '005',
    '007',
    '011',
    '020',
    '023',
    '027',
    '031',
    '032',
    '034',
    '035',
    '037',
    '039',
    '045',
    '071',
    '081',
    '088',
    '089',
    '090',
    '092',
  ];

  return (
    <div className={`relative w-full ${className || ''}`} onBlur={onBlur}>
      <button
        type={'button'}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex h-[56px] px-[14px] py-[15px] justify-between items-center rounded-[16px] border border-[#E2E4E7] bg-white ${className}`}
      >
        <span className={'text-gray-0'}>{value ? convertBank(value) : '은행을 선택해주세요'}</span>
        <div
          className={`w-[10px] h-[10px] border-r-2 border-b-2 border-[#666666] transform transition-transform duration-200 ${
            isOpen ? 'rotate-[-135deg]' : 'rotate-45'
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={
            'absolute w-full mt-1 border border-[#E2E4E7] rounded-[16px] bg-white max-h-[300px] overflow-y-auto z-[1000]'
          }
        >
          {bankList.map((bankCode) => (
            <button
              key={bankCode}
              role={'button'}
              className={'px-[14px] py-3 cursor-pointer hover:bg-gray-80 text-gray-10'}
              onClick={() => {
                onChange(bankCode);
                setIsOpen(false);
              }}
            >
              {convertBank(bankCode)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
