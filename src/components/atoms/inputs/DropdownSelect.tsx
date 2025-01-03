import type { ChangeEvent } from 'react';
import { useState } from 'react';

interface IDropdownSelectProps {
  className?: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  onBlur?: () => void;
}

export function DropdownSelect({ className, name, value, onChange, options, onBlur }: IDropdownSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (optionValue: string) => {
    const event = {
      target: {
        name,
        value: optionValue,
      },
    } as ChangeEvent<HTMLSelectElement>;

    onChange(event);
    setIsOpen(false);
  };

  const selectedLabel = options.find((option) => option.value === value)?.label || '선택해주세요';

  return (
    <div className={`relative w-full ${className || ''}`} onBlur={onBlur}>
      <button
        type={'button'}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex h-14 px-3.5 py-[15px] justify-between items-center rounded-2xl border border-[#E2E4E7] bg-white ${className}`}
      >
        <span className={'text-gray-0'}>{selectedLabel}</span>

        <svg
          xmlns={'http://www.w3.org/2000/svg'}
          width={'18'}
          height={'18'}
          viewBox={'0 0 18 18'}
          fill={'none'}
          className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path
            d={
              'M7.61273 11.2047L5.69814 8.46601C5.01294 7.48587 4.67033 6.99581 4.68816 6.58787C4.70369 6.23265 4.87536 5.9025 5.15709 5.68606C5.48063 5.4375 6.07806 5.4375 7.27292 5.4375H11.1021C12.2969 5.4375 12.8944 5.4375 13.2179 5.68606C13.4996 5.9025 13.6713 6.23265 13.6868 6.58787C13.7047 6.99581 13.3621 7.48587 12.6769 8.46601L10.7623 11.2047C10.2325 11.9625 9.96762 12.3414 9.63762 12.4749C9.34888 12.5917 9.02612 12.5917 8.73738 12.4749C8.40738 12.3414 8.14249 11.9625 7.61273 11.2047Z'
            }
            fill={'#888B94'}
            stroke={'#888B94'}
            strokeWidth={'1.5'}
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={
            'absolute w-full mt-1 border border-[#E2E4E7] rounded-2xl bg-white max-h-[300px] overflow-y-auto z-10'
          }
        >
          <div className={'flex flex-col w-full'}>
            {options.map((option) => (
              <button
                key={option.value}
                role={'button'}
                className={`w-full px-3.5 py-3 cursor-pointer hover:bg-gray-80 text-gray-10 text-left
                  ${option.value === value ? 'text-sub-blue-s-d-blue-10 bg-sub-blue-s-blue-10' : ''}`}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
