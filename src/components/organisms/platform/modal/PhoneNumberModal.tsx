'use client';

import { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Modal from '@/components/atoms/modals/Modal';
import { useToast } from '@/hooks';
import { accountContactUpdateService, accountShowService } from '@/services/platform/my-page/account';
import { accountShowQueryKey } from '@/services/platform/my-page/account.query';

interface ChangePhoneNumberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePhoneNumberModal({ isOpen, onClose }: ChangePhoneNumberModalProps) {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: accountShowQueryKey,
    queryFn: () => accountShowService(),
    enabled: isOpen,
  });

  const existingPhone = data?.data.mp_no || '';
  const [existingPhone1, existingPhone2, existingPhone3] = [
    existingPhone.slice(0, 3),
    existingPhone.slice(3, 7),
    existingPhone.slice(7, 11),
  ];

  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
  const { open: openToast } = useToast();

  const { mutate } = useMutation({
    mutationFn: accountContactUpdateService,
    onSuccess() {
      openToast({ type: 'info', message: '연락처 변경 완료!' });

      queryClient.invalidateQueries({ queryKey: accountShowQueryKey });

      onClose();
    },
    onError() {
      openToast({ type: 'error', message: '연락처 변경에 실패했습니다.' });
    },
  });

  const handleSubmit = () => {
    const phoneNumber = `${phone1}${phone2}${phone3}`;
    if (phone2.length !== 4 || phone3.length !== 4) {
      return openToast({ type: 'error', message: '올바른 전화번호를 입력해주세요.' });
    }

    mutate({ mp_no: phoneNumber });
  };

  const isFormValid = phone1 && phone2.length === 4 && phone3.length === 4;

  return (
    <Modal isOpen={isOpen} onClose={onClose} width={'450px'}>
      <div className={'flex flex-col gap-10 p-5'}>
        <div className={'flex flex-col justify-center items-center gap-4'}>
          <div className={'text-gray-0 font-suit-40-900-113'}>black</div>
          <div className={'text-gray-20 font-suit-20-600-150'}>연락처 변경</div>
        </div>

        <div className={'flex flex-col gap-6'}>
          <div className={'flex flex-col gap-1'}>
            <div className={'flex gap-1'}>
              <div className={'font-suit-16-m-130 text-gray-40'}>기존 연락처</div>
            </div>

            <div className={'flex gap-2 items-center'}>
              <input
                className={
                  'flex-auto w-[100px] h-[40px] px-4 rounded-xl bg-gray-90 border border-gray-80 font-suit-14-r-130 text-gray-0 text-center'
                }
                value={existingPhone1}
                readOnly
              />
              <span className={'flex items-center'}>-</span>
              <input
                className={
                  'flex-auto w-[100px] h-[40px] px-4 rounded-xl bg-gray-90 border border-gray-80 font-suit-14-r-130 text-gray-0 text-center'
                }
                value={existingPhone2}
                readOnly
              />
              <span className={'flex items-center'}>-</span>
              <input
                className={
                  'flex-auto w-[100px] h-[40px] px-4 rounded-xl bg-gray-90 border border-gray-80 font-suit-14-r-130 text-gray-0 text-center'
                }
                value={existingPhone3}
                readOnly
              />
            </div>
          </div>

          <div className={'flex flex-col gap-1'}>
            <div className={'flex gap-1'}>
              <div className={'font-suit-16-m-130 text-gray-40'}>새로운 연락처</div>
              <div className={'font-suit-16-m-130 text-red-50'}>*</div>
            </div>

            <div className={'flex gap-2 items-center'}>
              <input
                className={
                  'flex-auto w-[100px] h-[40px] px-4 rounded-xl bg-white border border-gray-80 font-suit-14-r-130 text-gray-0 text-center'
                }
                value={phone1}
                onChange={(e) => setPhone1(e.target.value.replace(/[^0-9]/g, '').slice(0, 3))}
                maxLength={3}
              />
              <span className={'flex items-center'}>-</span>
              <input
                className={
                  'flex-auto w-[100px] h-[40px] px-4 rounded-xl bg-white border border-gray-80 font-suit-14-r-130 text-gray-0 text-center'
                }
                value={phone2}
                onChange={(e) => setPhone2(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                maxLength={4}
              />
              <span className={'flex items-center'}>-</span>
              <input
                className={
                  'flex-auto w-[100px] h-[40px] px-4 rounded-xl bg-white border border-gray-80 font-suit-14-r-130 text-gray-0 text-center'
                }
                value={phone3}
                onChange={(e) => setPhone3(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                maxLength={4}
              />
            </div>
          </div>

          <div className={'flex gap-4 mt-4'}>
            <button className={'w-1/3 p-3 text-gray-10 bg-gray-90 rounded-3xl font-suit-16-m-130'} onClick={onClose}>
              취소
            </button>

            <button
              className={
                'w-2/3 p-3 text-gray-100 bg-purple-fmg60 rounded-3xl font-suit-16-m-130 disabled:bg-gray-90 disabled:text-gray-50'
              }
              disabled={!isFormValid}
              onClick={handleSubmit}
            >
              완료
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
