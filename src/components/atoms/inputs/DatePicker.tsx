'use client';

import { ko } from 'date-fns/locale';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  className?: string;
  wrapperClassName?: string;
  placeholder?: string;
}

export function DatePicker({
  selected,
  onChange,
  className = 'w-[200px]',
  wrapperClassName = '',
  placeholder = 'YYYY - MM - DD',
}: DatePickerProps) {
  return (
    <div className={`relative ${wrapperClassName}`}>
      <ReactDatePicker
        locale={ko}
        selected={selected}
        onChange={onChange}
        dateFormat={'yyyy - MM - dd'}
        placeholderText={placeholder}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className={'flex justify-center items-center gap-4 py-3'}>
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              <span>
                <svg
                  xmlns={'http://www.w3.org/2000/svg'}
                  width={'24'}
                  height={'24'}
                  viewBox={'0 0 24 24'}
                  fill={'none'}
                >
                  <path
                    d={'M15 7L10.3828 10.8477C9.66317 11.4474 9.66317 12.5526 10.3828 13.1523L15 17'}
                    stroke={'#28282A'}
                    strokeWidth={'1.5'}
                    strokeLinecap={'round'}
                    strokeLinejoin={'round'}
                  />
                </svg>
              </span>
            </button>
            <div className={'flex flex-row gap-6 text-center font-pre-20-b-130 text-gray-10'}>
              <span>{`${date.getFullYear()}`}</span>
              <span>{`${String(date.getMonth() + 1).padStart(2, '0')}`}</span>
            </div>
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              <span>
                <svg
                  xmlns={'http://www.w3.org/2000/svg'}
                  width={'24'}
                  height={'24'}
                  viewBox={'0 0 24 24'}
                  fill={'none'}
                >
                  <path
                    d={'M9 7L13.6172 10.8477C14.3368 11.4474 14.3368 12.5526 13.6172 13.1523L9 17'}
                    stroke={'#28282A'}
                    strokeWidth={'1.5'}
                    strokeLinecap={'round'}
                    strokeLinejoin={'round'}
                  />
                </svg>
              </span>
            </button>
          </div>
        )}
        className={`!text-gray-10 font-pre-13-r-130 h-8 px-3 py-2 border border-gray-70 rounded-lg ${className}`}
        showPopperArrow={false}
      />
      <svg
        className={'absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none'}
        width={'18'}
        height={'18'}
        viewBox={'0 0 18 18'}
        fill={'none'}
        xmlns={'http://www.w3.org/2000/svg'}
      >
        <path
          d={
            'M5.625 2.99997H12.375C14.4461 2.99997 16.125 4.6789 16.125 6.74997V12.75C16.125 14.821 14.4461 16.5 12.375 16.5H5.625C3.55393 16.5 1.875 14.821 1.875 12.75V6.74997C1.875 4.6789 3.55393 2.99997 5.625 2.99997Z'
          }
          stroke={'#666970'}
          strokeWidth={'1.25'}
        />
        <path d={'M6.37503 1.5V4.5M11.625 1.5V4.5'} stroke={'#666970'} strokeWidth={'1.25'} strokeLinecap={'round'} />
        <path d={'M1.875 7.5H16.125'} stroke={'#666970'} strokeWidth={'1.25'} strokeLinecap={'round'} />
        <path
          d={
            'M7.65005 10.875L8.65863 9.86645C8.78463 9.74045 9.00005 9.82969 9.00005 10.0079V13.7921M7.65005 13.7921H10.3501'
          }
          stroke={'#666970'}
          strokeWidth={'1.5'}
          strokeLinecap={'round'}
        />
      </svg>
    </div>
  );
}
