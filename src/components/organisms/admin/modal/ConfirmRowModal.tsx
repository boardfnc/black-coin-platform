import type { IConfirmRowModalProps } from './ConfirmRowModal.types';

import { Modal } from '@/components/atoms/modals';

export default function ConfirmModal({
  onClose,
  onConfirm,
  isOpen,
  icon,
  iconColor = 'primary',
  title,
  content,
  cancelText = '취소',
  confirmText = '확인',
  width = '500px',
}: IConfirmRowModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width={width}>
      <div className={'py-1 px-4'}>
        <div className={'flex flex-row gap-4'}>
          {icon && (
            <div className={`text-${iconColor}-50 p-2.5 bg-${iconColor}-95 w-11 h-11 rounded-[35px]`}>{icon}</div>
          )}

          <div className={'flex flex-col gap-2.5'}>
            <span className={'text-gray-0 font-pre-18-r-130'}>{title}</span>

            <div className={'text-start mb-6'}>
              {typeof content === 'string' ? (
                <p className={'text-gray-30 font-pre-15-r-130 whitespace-pre-line'}>{content}</p>
              ) : (
                content
              )}
            </div>
          </div>
        </div>

        <div className={'flex justify-center gap-2'}>
          <button className={'w-full h-12 text-gray-0 font-pre-16-m-130 bg-gray-90 rounded-3xl'} onClick={onClose}>
            {cancelText}
          </button>

          <button
            className={'w-full h-12 text-gray-100 font-pre-16-m-130 bg-primary-50 rounded-3xl'}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
