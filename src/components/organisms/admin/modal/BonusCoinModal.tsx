import { useState } from 'react';

import OverrideModal from './ConfirmColModal';

import type { IBonusCoinModalProps } from './BonusCoinModal.types';

import { IconLine24RoundWarning } from '@/components/atoms/icons/icon-line';
import IconLine24Close from '@/components/atoms/icons/icon-line/Close';
import Modal from '@/components/atoms/modals/Modal';

export default function BonusCoinModal({ isOpen, onClose, onComplete, hasExistingValue }: IBonusCoinModalProps) {
  const [directInput, setDirectInput] = useState<string>('');
  const [percentageInput, setPercentageInput] = useState<string>('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  const handleDirectInputChange = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    setDirectInput(numericValue);
    setPercentageInput('');
  };

  const handlePercentageInputChange = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    if (Number(numericValue) <= 1000) {
      setPercentageInput(numericValue);
      setDirectInput('');
    }
  };

  const handleClose = () => {
    setDirectInput('');
    setPercentageInput('');
    onClose();
  };

  const handleComplete = () => {
    if (hasExistingValue()) {
      setIsConfirmModalOpen(true);
      return;
    }

    const bonusAmount = directInput ? Number(directInput) : Number(percentageInput);
    onComplete(bonusAmount, !!percentageInput);
    handleClose();
  };

  const handleConfirmComplete = () => {
    const bonusAmount = directInput ? Number(directInput) : Number(percentageInput);
    onComplete(bonusAmount, !!percentageInput);
    setIsConfirmModalOpen(false);
    handleClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} width={'500px'} height={'auto'}>
        <div className={'flex flex-col gap-[30px] px-[10px] pt-1 pb-3'}>
          <div className={'flex flex-col gap-5'}>
            <div className={'flex items-center justify-between'}>
              <div className={'text-gray-10 font-pre-20-m-130'}>보너스 코인 지급</div>
              <button onClick={handleClose}>
                <IconLine24Close className={'text-gray-10'} />
              </button>
            </div>

            <ul className={'text-gray-20 font-pre-13-r-130'}>
              <li>✻ 보너스 코인 직접 입력 또는 구매 요청 수량에 대한 % 입력 둘 중에 하나만 사용이 가능합니다.</li>
              <li>✻ 코인 직접 입력 도중 %로 입력 시 직접입력에 입력되어있던 숫자는 자동으로 사라집니다.</li>
            </ul>
          </div>

          <div className={'flex flex-col gap-5'}>
            <div className={'flex flex-col gap-1'}>
              <div className={'text-gray-40 font-pre-14-m-130'}>보너스 코인 직접 입력</div>

              <div className={'flex gap-[10px] items-center'}>
                <div className={'flex items-center gap-2'}>
                  <input
                    className={'w-full h-[48px] px-3.5 border border-gray-80 rounded-[14px]'}
                    type={'text'}
                    value={directInput}
                    onChange={(event) => handleDirectInputChange(event.target.value)}
                    placeholder={'0'}
                  />
                  <span className={'text-gray-20 font-pre-16-r-130'}>C</span>
                </div>
                <div className={'text-gray-20 font-pre-16-r-130'}>을 보너스로 지급</div>
              </div>
            </div>

            <div className={'flex flex-col gap-1'}>
              <div className={'text-gray-40 font-pre-14-m-130'}>보너스 코인 %로 입력</div>
              <div className={'flex items-center gap-[10px]'}>
                <div className={'whitespace-pre text-gray-20 font-pre-16-r-130'}>구매 요청 수량의</div>

                <div className={'flex items-center gap-1'}>
                  <input
                    type={'text'}
                    value={percentageInput}
                    onChange={(event) => handlePercentageInputChange(event.target.value)}
                    placeholder={'0'}
                    className={'w-full h-[48px] px-3.5 border border-gray-80 rounded-[14px]'}
                  />
                  <span className={'text-gray-20 font-pre-16-r-130'}>%</span>
                </div>
                <div className={'whitespace-pre text-gray-20 font-pre-16-r-130 '}>을 보너스로 지급</div>
              </div>
            </div>
          </div>

          <div className={'flex justify-end gap-2'}>
            <button
              onClick={handleClose}
              className={
                'text-gray-10 font-pre-16-m-130 w-[90px] h-[48px] px-4 flex justify-center items-center border border-gray-80 rounded-[60px]'
              }
            >
              취소
            </button>
            <button
              onClick={handleComplete}
              disabled={!directInput && !percentageInput}
              className={
                'transition text-gray-100 bg-primary-50 disabled:bg-gray-50 font-pre-16-m-130 w-[90px] h-[48px] px-4 flex justify-center items-center rounded-[60px]'
              }
            >
              완료
            </button>
          </div>
        </div>
      </Modal>

      <OverrideModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmComplete}
        icon={<IconLine24RoundWarning width={32} height={32} preserveAspectRatio={'none'} />}
        iconColor={'red'}
        title={'안내'}
        content={'수량이 이미 등록되어있는 리스트가 있습니다.\n덮어씌우기를 할 경우 현재 입력된 수량으로 수정됩니다.'}
        confirmText={'덮어쓰기'}
      />
    </>
  );
}
