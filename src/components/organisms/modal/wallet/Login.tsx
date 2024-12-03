'use client';

import { useSearchParams } from 'next/navigation';

import { useState, useMemo } from 'react';

import { useMutation } from '@tanstack/react-query';

import Modal from '@/components/atoms/modals/Modal';
import { joinService } from '@/services/auth/join';
import { useLogin } from '@/stores/login';

export default function LoginModal() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [success, setSuccess] = useState(false);

  const { isOpen, closeModal } = useLogin();

  const searchParams = useSearchParams();

  const { mutate } = useMutation({
    mutationFn: joinService,
    onSuccess: () => setSuccess(true),
  });

  const code = searchParams.get('code');
  const name = searchParams.get('name');
  const essentialKey = searchParams.get('essential-key');
  const phone = searchParams.get('phone');
  const bank = searchParams.get('bank');
  const bankAccount = searchParams.get('bank-account');
  const bankAccountHolder = searchParams.get('bank-account-holder');

  const isFormValid = useMemo(() => {
    return id !== '' && password !== '' && passwordConfirm !== '';
  }, [id, password, passwordConfirm]);

  const handleJoin = () => {
    if (
      !id ||
      !password ||
      !passwordConfirm ||
      !code ||
      !name ||
      !phone ||
      !bank ||
      !essentialKey ||
      !bankAccount ||
      !bankAccountHolder
    ) {
      alert('진행할 수 없습니다.');
      return;
    }

    mutate({
      code,
      nm: name,
      mp_no: phone,
      esntl_key: essentialKey,
      bank,
      acnutno: bankAccount,
      dpstr: bankAccountHolder,
      login_id: id,
      password,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className={'flex flex-col gap-[70px] p-10'}>
        <div className={'flex flex-col gap-10'}>
          <div className={'flex flex-col justify-center items-center gap-4'}>
            <div className={'text-gray-0 font-suit-40-900-113'}>Blackcoin</div>

            <div className={'flex flex-col justify-center items-center gap-1.5'}>
              <div className={'text-gray-20 font-suit-20-600-150'}>JOIN-US</div>
              <div className={'text-gray-30 font-suit-14-r-130'}>회원가입을 위해 아래의 정보를 입력해주세요.</div>
            </div>
          </div>

          <div className={'flex flex-col gap-6'}>
            <div>
              <div className={'flex gap-1'}>
                <div className={'font-suit-13-m-130 text-gray-40'}>아이디</div>
                <div className={'text-red-50'}>*</div>
              </div>

              <input
                value={id}
                onChange={(event) => setId(event.target.value)}
                className={
                  'w-full px-3 py-4 border border-gray-80 rounded-[14px] placeholder:text-gray-60 font-suit-16-400-130'
                }
                placeholder={'아이디'}
              />
            </div>

            <div>
              <div className={'flex gap-1'}>
                <div className={'font-suit-13-m-130 text-gray-40'}>비밀번호</div>
                <div className={'text-red-50'}>*</div>
              </div>

              <input
                type={'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={
                  'w-full px-3 py-4 border border-gray-80 rounded-[14px] placeholder:text-gray-60 font-suit-16-400-130'
                }
                placeholder={'비밀번호'}
              />
            </div>

            <div>
              <div className={'flex gap-1'}>
                <div className={'font-suit-13-m-130 text-gray-40'}>비밀번호 확인</div>
                <div className={'text-red-50'}>*</div>
              </div>

              <input
                type={'password'}
                value={passwordConfirm}
                onChange={(event) => setPasswordConfirm(event.target.value)}
                className={
                  'w-full px-3 py-4 border border-gray-80 rounded-[14px] placeholder:text-gray-60 font-suit-16-400-130'
                }
                placeholder={'비밀번호 확인'}
              />
            </div>

            <div className={'text-gray-40 text-sm mt-4'}>
              ✻ 아이디와 비밀번호를 잊지 않도록 현재 이용중인 사이트와 동일하게 설정하는 것을 권장합니다.
            </div>
          </div>

          <div className={'flex gap-4 mt-6'}>
            <button className={'w-1/3 p-3 text-gray-10 bg-gray-80 rounded-3xl font-suit-17-m-130'} onClick={closeModal}>
              취소
            </button>

            <button
              className={
                'w-2/3 p-3 text-gray-100 bg-gray-0 rounded-3xl font-suit-17-m-130 disabled:bg-gray-90 disabled:text-gray-50'
              }
              disabled={!isFormValid}
              onClick={handleJoin}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
