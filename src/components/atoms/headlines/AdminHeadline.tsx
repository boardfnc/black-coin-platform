import { Fragment } from 'react';

import { IconLine24ArrowRight } from '../icons/icon-line';

interface IAdminHeadlineProps {
  title: string;
  subTitle?: string | string[];
}

export default function AdminHeadline({ title, subTitle }: IAdminHeadlineProps) {
  const subTitleArray = Array.isArray(subTitle) ? subTitle : [subTitle];

  return (
    <div className={'sticky top-0 flex justify-between items-center h-[50px] px-4 py-2.5 w-[calc(100dvw-258px)]'}>
      <span className={'font-pre-18-500-130 text-gray-0'}>{title}</span>
      <span className={'font-pre-15-400-130 text-gray-30'}>
        <div className={'flex items-center gap-1'}>
          {subTitleArray.map((item, index) => (
            <Fragment key={index}>
              {item}
              {index !== subTitleArray.length - 1 && (
                <IconLine24ArrowRight className={'w-5 h-5'} preserveAspectRatio={'none'} />
              )}
            </Fragment>
          ))}
        </div>
      </span>
    </div>
  );
}
