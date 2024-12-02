import { useState, useEffect, useRef } from 'react';

import { IconLine24ArrowDown } from '../icons/icon-line';

import type { ICategoryOption } from '@/components/organisms/filter/Filter.types';

interface MultiSelectProps {
  options: ICategoryOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  className?: string;
  displayStyle?: 'default' | 'inline';
}

export function MultiSelect({
  options,
  selectedValues,
  onChange,
  className,
  displayStyle = 'default',
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  const selectedLabels = options
    .filter((option) => selectedValues.includes(option.value))
    .map((option) => option.label);

  let displayText = '선택';

  if (displayStyle === 'inline') {
    if (selectedLabels.length > 0) {
      displayText = selectedLabels.join(', ');
    }
  } else {
    if (selectedLabels.length > 0) {
      displayText = `${selectedLabels[0]} 외 ${selectedLabels.length - 1}개`;
    }
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        className={
          'w-[200px] h-8 px-3.5 flex items-center justify-between border border-gray-70 rounded-lg text-gray-10 font-pre-13-r-130'
        }
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={'truncate pr-6'}>{displayText}</span>
        <IconLine24ArrowDown
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          width={18}
          height={18}
          preserveAspectRatio={'none'}
        />
      </button>

      {isOpen && (
        <div className={'absolute z-10 w-full mt-1 border border-gray-70 rounded-lg bg-white'}>
          <div className={'flex flex-col'}>
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`px-3 py-3 text-left rounded-[4px] text-gray-10 font-pre-13-r-130 flex items-center gap-2
                  ${
                    selectedValues.includes(option.value)
                      ? 'bg-sub-blue-s-blue-10 text-sub-blue-s-d-blue-10'
                      : 'hover:bg-gray-90'
                  }`}
              >
                <div
                  className={`w-4 h-4 border rounded flex items-center justify-center
                    ${selectedValues.includes(option.value) ? 'border-primary-40 bg-primary-50' : 'border-gray-70'}`}
                >
                  {selectedValues.includes(option.value) && (
                    <svg className={'w-3 h-3 text-white'} viewBox={'0 0 24 24'} fill={'none'} stroke={'currentColor'}>
                      <path strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={2} d={'M5 13l4 4L19 7'} />
                    </svg>
                  )}
                </div>
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
