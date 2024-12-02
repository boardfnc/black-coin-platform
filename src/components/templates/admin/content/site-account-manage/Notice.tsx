'use client';

import { AdminHeadline } from '@/components/atoms/headlines';

export default function Notice() {
  return (
    <div className={'w-full h-full bg-gray-100'}>
      <div className={'flex flex-col gap-5'}>
        <AdminHeadline title={'공지사항'} subTitle={['사이트/계좌 관리', '공지사항']} />
      </div>
    </div>
  );
}
