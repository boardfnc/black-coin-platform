'use client';

import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import Modal from '@/components/atoms/modals/Modal';
import { useToast } from '@/hooks';
import { accountPasswordUpdateService } from '@/services/platform/my-page/account';
import { accountShowQueryKey } from '@/services/platform/my-page/account.query';

interface IPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PasswordModal({ isOpen, onClose }: IPasswordModalProps) {
  const queryClient = useQueryClient();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { open: openToast } = useToast();

  const { mutate } = useMutation({
    mutationFn: accountPasswordUpdateService,
    onSuccess() {
      openToast({ type: 'info', message: '비밀번호 변경 완료!' });
      onClose();
      queryClient.invalidateQueries({ queryKey: accountShowQueryKey });
    },
    onError() {
      openToast({ type: 'error', message: '비밀번호 변경에 실패했습니다.' });
    },
  });

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      return openToast({ type: 'error', message: '새 비밀번호가 일치하지 않습니다.' });
    }

    mutate({ password: newPassword });
  };

  const isFormValid = currentPassword && newPassword && confirmPassword && newPassword === confirmPassword;

  return (
    <Modal isOpen={isOpen} onClose={onClose} width={'450px'}>
      <div className={'flex flex-col gap-10 p-5'}>
        <div className={'flex flex-col justify-center items-center gap-4'}>
          <div className={'text-gray-0 font-suit-40-900-113'}>black</div>
          <div className={'text-gray-20 font-suit-20-600-150'}>비밀번호 변경</div>
        </div>

        <div className={'flex flex-col gap-6'}>
          <label>
            <div className={'flex gap-1'}>
              <div className={'font-suit-13-m-130 text-gray-40'}>현재 비밀번호</div>
              <div className={'text-red-50'}>*</div>
            </div>
            <input
              type={'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={
                'w-full px-3 py-4 border border-gray-80 rounded-[14px] placeholder:text-gray-60 font-suit-16-400-130'
              }
              placeholder={'비밀번호'}
            />
          </label>

          <label>
            <div className={'flex gap-1'}>
              <div className={'font-suit-13-m-130 text-gray-40'}>새로운 비밀번호</div>
              <div className={'text-red-50'}>*</div>
            </div>
            <input
              type={'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={
                'w-full px-3 py-4 border border-gray-80 rounded-[14px] placeholder:text-gray-60 font-suit-16-400-130'
              }
              placeholder={'입력(6~18자리 이내)'}
            />
          </label>

          <label>
            <div className={'flex gap-1'}>
              <div className={'font-suit-13-m-130 text-gray-40'}>비밀번호 확인</div>
              <div className={'text-red-50'}>*</div>
            </div>
            <input
              type={'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={
                'w-full px-3 py-4 border border-gray-80 rounded-[14px] placeholder:text-gray-60 font-suit-16-400-130'
              }
              placeholder={'새로운 비밀번호 확인'}
            />
          </label>

          <div className={'flex gap-2 mt-4'}>
            <button
              className={'w-1/3 p-3 text-gray-10 bg-gray-80 bg-gray-90 rounded-3xl font-suit-16-m-130'}
              onClick={onClose}
            >
              취소
            </button>

            <button
              className={
                'w-2/3 p-3 text-gray-100 bg-purple-fmg60 rounded-3xl font-suit-17-m-130 disabled:bg-gray-90 disabled:text-gray-50'
              }
              disabled={!isFormValid}
              onClick={handleSubmit}
            >
              변경하기
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
