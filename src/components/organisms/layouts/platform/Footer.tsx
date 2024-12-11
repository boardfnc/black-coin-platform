import { IconLine24Send } from '@/components/atoms/icons/icon-line';

export default function PlatformFooter() {
  return (
    <div className={'bg-gray-0 px-5 py-[50px] sm:px-0'}>
      <div className={'max-w-[1320px] mx-auto flex flex-col gap-3'}>
        <div className={'text-gray-100 font-suit-24-700-150'}>Black Company</div>

        <div className={'flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'}>
          <div className={'text-gray-100 font-suit-16-400-150'}>Copyright © 2024. company All rights reserved.</div>

          <div className={'flex flex-row gap-2.5'}>
            <div className={'text-gray-100 font-suit-16-400-150'}>Customer Service</div>

            <button
              className={
                'h-[28px] flex flex-row items-center justify-center gap-1.5 ps-2 pe-3 text-gray-100 font-pre-12-m-130 rounded-[60px] border border-gray-100'
              }
            >
              <IconLine24Send />
              바로가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
