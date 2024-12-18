'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { selectOptions } from './Select.utils';

import type { ISelectProps } from './Select.types';

export default function Select({
  paramsName = 'view',
  options = selectOptions,
  className,
  ...restProps
}: ISelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(name, value);
    params.set('page', '1');

    return params.toString();
  };

  return (
    <div className={'relative w-[150px] group'}>
      <select
        className={
          className ||
          'peer w-full text-gray-10 font-pre-13-r-130 h-8 border border-gray-70 rounded-lg ps-3.5 pe-10 py-[7px] appearance-none focus:border-primary-80'
        }
        onChange={(event) => {
          router.push(pathname + '?' + createQueryString(paramsName, event.target.value));
        }}
        value={searchParams.get(paramsName) || '15'}
        {...restProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <svg
        className={
          'absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 peer-focus:rotate-180'
        }
        xmlns={'http://www.w3.org/2000/svg'}
        width={'18'}
        height={'18'}
        viewBox={'0 0 18 18'}
        fill={'none'}
      >
        <path
          d={'M5.25 6.75L7.84767 9.8672C8.44736 10.5868 9.55264 10.5868 10.1523 9.8672L12.75 6.75'}
          stroke={'#4C4E52'}
          strokeLinecap={'round'}
          strokeLinejoin={'round'}
        />
      </svg>
    </div>
  );
}
