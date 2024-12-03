'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import type { IPaginationProps } from './Pagination.types';

import { IconLine24ArrowLeft, IconLine24ArrowRight } from '@/components/atoms/icons/icon-line';

export default function Pagination({ totalPage, viewCount = 5 }: IPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPageFromURL = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNum: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNum.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pages = [];

  pages.push(
    <Link
      key={'prev'}
      href={currentPageFromURL > 1 ? createPageURL(currentPageFromURL - 1) : '#'}
      className={`p-1 rounded border border-gray-80 text-gray-10 ${currentPageFromURL <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={(event) => currentPageFromURL <= 1 && event.preventDefault()}
    >
      <IconLine24ArrowLeft />
    </Link>,
  );

  const startPage = Math.max(1, Math.min(currentPageFromURL - Math.floor(viewCount / 2), totalPage - viewCount + 1));
  const endPage = Math.min(startPage + viewCount - 1, totalPage);

  if (startPage > 1) {
    pages.push(
      <Link key={1} href={createPageURL(1)} className={'text-gray-10'}>
        1
      </Link>,
      <span key={'start-dots'} className={'text-gray-10'}>
        ...
      </span>,
    );
  }

  for (let i = startPage; i <= endPage; i += 1) {
    pages.push(
      <Link
        key={i}
        href={createPageURL(i)}
        className={`w-[32px] h-[32px] flex justify-center items-center text-gray-0 font-pre-14-r-130 px-2 py-1 rounded ${currentPageFromURL === i ? 'bg-gray-90 active !p-[10px] !rounded-[10px]' : ''}`}
      >
        {i}
      </Link>,
    );
  }

  if (endPage < totalPage) {
    pages.push(
      <span key={'end-dots'} className={'text-gray-10'}>
        ...
      </span>,
      <Link key={totalPage} href={createPageURL(totalPage)} className={'text-gray-10'}>
        {totalPage}
      </Link>,
    );
  }

  pages.push(
    <Link
      key={'next'}
      href={currentPageFromURL < totalPage ? createPageURL(currentPageFromURL + 1) : '#'}
      className={`p-1 rounded border border-gray-80 text-gray-10 ${currentPageFromURL >= totalPage ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={(event) => currentPageFromURL >= totalPage && event.preventDefault()}
    >
      <IconLine24ArrowRight />
    </Link>,
  );

  return <div className={'flex items-center gap-3'}>{pages}</div>;
}
