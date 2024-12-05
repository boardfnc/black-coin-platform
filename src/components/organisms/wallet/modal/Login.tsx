'use client';

import { useSearchParams } from 'next/navigation';

import { useState, useMemo } from 'react';

import { useMutation } from '@tanstack/react-query';

import { IconLine24Close } from '@/components/atoms/icons/icon-line';
import { Image } from '@/components/atoms/images';
import Modal from '@/components/atoms/modals/Modal';
import { useToast } from '@/hooks';
import { digitalIllustration } from '@/images/background';
import { platformLoginService } from '@/services/platform/auth/login';
import { useLogin } from '@/stores/login';

export default function LoginModal() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [autoSave, setAutoSave] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.cookie.includes('auto=true');
    }
    return false;
  });

  const { open: openToast } = useToast();
  const { isOpen, closeModal } = useLogin();
  const searchParams = useSearchParams();

  const { mutate } = useMutation({
    mutationFn: platformLoginService,
    onSuccess(data) {
      if (data != null) {
        const { status, message } = data;

        if (!status) return openToast({ type: 'error', message: message || '알 수 없는 오류가 발생했습니다.' });

        setSuccess(true);
      }
    },
  });

  const code = searchParams.get('code');
  const name = searchParams.get('name');
  const essentialKey = searchParams.get('essential-key');
  const phone = searchParams.get('phone');
  const bank = searchParams.get('bank');
  const bankAccount = searchParams.get('bank-account');
  const bankAccountHolder = searchParams.get('bank-account-holder');

  const isFormValid = useMemo(() => {
    return id !== '' && password !== '';
  }, [id, password]);

  const handleLogin = () => {
    if (!id || !password || !code || !name || !phone || !bank || !essentialKey || !bankAccount || !bankAccountHolder) {
      return alert('진행할 수 없습니다.');
    }

    mutate({
      code,
      login_id: id,
      password,
    });
  };

  const handleAutoSaveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setAutoSave(isChecked);
    document.cookie = `auto=${isChecked}; path=/; max-age=31536000`;
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} width={success ? '500px' : '450px'}>
      {success && (
        <div className={'p-5'}>
          <div className={'flex justify-end'}>
            <button onClick={closeModal}>
              <IconLine24Close />
            </button>
          </div>

          <div className={'flex flex-col gap-10'}>
            <div className={'text-center text-gray-0 font-suit-40-900-113'}>blackcoin</div>

            <div className={'flex flex-col justify-center items-center gap-10'}>
              <div className={'flex flex-col justify-center items-center'}>
                <div className={'text-gray-20 font-suit-20-600-150'}>블랙코인 회원가입을 축하합니다!</div>
                <div className={'text-gray-20 font-suit-20-600-150'}>자유롭게 서비스 이용이 가능합니다.</div>
              </div>

              <Image src={digitalIllustration} alt={'coin wallet'} width={200} height={176} />
            </div>

            <button className={'h-12 rounded-[24px] text-gray-100 bg-purple-fmg60'}>지갑 연동</button>
          </div>
        </div>
      )}

      {!success && (
        <div className={'flex flex-col gap-[70px] p-10'}>
          <form className={'flex flex-col gap-10'}>
            <div className={'flex flex-col justify-center items-center gap-4'}>
              <div className={'text-gray-0 font-suit-40-900-113'}>blackcoin</div>

              <div className={'flex flex-col justify-center items-center gap-1.5'}>
                <div className={'text-gray-20 font-suit-20-600-150'}>LOG-IN</div>
              </div>
            </div>

            <div className={'flex flex-col gap-6'}>
              <label>
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
              </label>

              <label>
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
              </label>

              <label className={'flex flex-row gap-2 items-center px-[14px]'}>
                <input type={'checkbox'} checked={autoSave} onChange={handleAutoSaveChange} />
                <div className={'text-gray-40 text-sm'}>아이디, 비밀번호 자동 저장 및 지갑 연동</div>
              </label>
            </div>

            <div className={'flex gap-4'}>
              <button
                className={'w-1/3 p-3 text-gray-10 bg-gray-80 rounded-3xl font-suit-17-m-130'}
                onClick={closeModal}
              >
                취소
              </button>

              <button
                className={
                  'w-2/3 p-3 text-gray-100 bg-purple-fmg60 rounded-3xl font-suit-17-m-130 disabled:bg-gray-90 disabled:text-gray-50'
                }
                disabled={!isFormValid}
                onClick={handleLogin}
              >
                지갑연동
              </button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
}
