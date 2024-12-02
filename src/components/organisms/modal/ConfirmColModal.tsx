import type { IConfirmColModalProps } from './ConfirmColModal.types';

import { Modal } from '@/components/atoms/modals';

export default function ConfirmColModal({
  isOpen,
  onClose,
  onConfirm,
  icon,
  iconColor = 'primary',
  title,
  content,
  cancelText = '취소',
  confirmText = '확인',
  width = '500px',
}: IConfirmColModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width={width}>
      <div className={'py-1 px-4'}>
        <div className={'flex flex-col justify-center items-center gap-4'}>
          {icon && (
            <div
              className={`flex justify-center items-center text-${iconColor}-50 p-2.5 bg-${iconColor}-95 w-20 h-20 rounded-[35px]`}
            >
              {icon}
            </div>
          )}

          <div className={'flex flex-col gap-2.5'}>
            <span className={'text-center text-gray-0 font-pre-18-r-130'}>{title}</span>

            <div className={'text-start mb-8'}>
              {typeof content === 'string' ? (
                <p className={'text-center text-gray-30 font-pre-15-r-130 mb-2 whitespace-pre-line'}>{content}</p>
              ) : (
                content
              )}
            </div>
          </div>
        </div>

        <div className={'flex justify-center gap-2'}>
          <button
            className={'w-full h-[48px] text-gray-0 font-pre-16-m-130 bg-gray-90 rounded-[24px]'}
            onClick={onClose}
          >
            {cancelText}
          </button>

          <button
            className={'w-full h-[48px] text-gray-100 font-pre-16-m-130 bg-primary-50 rounded-[24px]'}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
