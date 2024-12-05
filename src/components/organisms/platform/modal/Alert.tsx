import type { IAlertModalProps } from './Alert.types';

import { IconLine24RoundWarning } from '@/components/atoms/icons/icon-line';
import { Modal } from '@/components/atoms/modals';

export default function Alert({ isOpen, title, description, onClose }: IAlertModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={'flex flex-col items-center gap-8 py-1 px-3'}>
        <div className={'flex flex-col items-center gap-4'}>
          <div
            className={
              'flex justify-center items-center w-[45px] h-[45px] sm:w-20 sm:h-20 p-2.5 sm:p-3.5 text-red-60 bg-red-95 rounded-[60px]'
            }
          >
            <IconLine24RoundWarning className={'w-6 h-6 sm:w-8 sm:h-8'} />
          </div>

          <div className={'flex flex-col items-center gap-2'}>
            <div className={'text-gray-10 font-suit-20-b-130 sm:font-suit-20-r-130'}>{title}</div>
            <div
              className={'text-gray-30 font-suit-15-r-130 sm:font-suit-16-r-130'}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>

        <div>
          <button
            className={
              'h-8 sm:h-12 text-gray-100 sm:text-gray-10 rounded-[60px] font-suit-13-m-130 sm:font-suit-16-m-130 border border-transparent sm:border-gray-0 px-4 sm:px-[90px] bg-green-fmg50 sm:bg-transparent'
            }
            onClick={onClose}
          >
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
