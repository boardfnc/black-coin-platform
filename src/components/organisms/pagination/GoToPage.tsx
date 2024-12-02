'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useState, useEffect } from 'react';
import type { KeyboardEvent } from 'react';

export default function GoToPage() {
  const [currentPage, setCurrentPage] = useState('1');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const page = searchParams.get('page') || '1';
    setCurrentPage(page);
  }, [searchParams]);

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const params = new URLSearchParams(window.location.search);
      params.set('page', currentPage);
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <div className={'flex gap-2 items-center'}>
      <span className={'text-gray-0 font-pre-13-r-130'}>이동</span>

      <input
        className={
          'w-[100px] text-center text-gray-0 font-pre-13-r-130 border border-gray-70 rounded-lg px-3.5 py-[7px]'
        }
        type={'text'}
        onKeyDown={handleKeyPress}
        value={currentPage}
        onChange={(event) => setCurrentPage(event.target.value)}
      />
    </div>
  );
}
