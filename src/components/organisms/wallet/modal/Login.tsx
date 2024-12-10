'use client';

import type { ChangeEvent, FormEvent } from 'react';
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
  const [code, setCode] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [autoLogin, setAutoLogin] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.cookie.includes('auto-login=true');
    }
    return false;
  });

  const { open: openToast } = useToast();
  const { isOpen, closeModal } = useLogin();

  const { mutate } = useMutation({
    mutationFn: platformLoginService,
    onSuccess(data) {
      if (data != null) {
        if (data.status) {
          document.cookie = `auto-login=${autoLogin}; path=/; max-age=31536000`;

          setSuccess(true);
        } else {
          return openToast({ type: 'error', message: data.message || '알 수 없는 오류가 발생했습니다.' });
        }
      }
    },
  });

  const isFormValid = useMemo(() => {
    return code !== '' && id !== '' && password !== '';
  }, [code, id, password]);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutate({
      login_id: id,
      password,
      code,
    });
  };

  const handleAutoSaveChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    setAutoLogin(isChecked);
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
          <form onSubmit={handleLogin} className={'flex flex-col gap-10'}>
            <div className={'flex flex-col justify-center items-center gap-4'}>
              <div className={'text-gray-0 font-suit-40-900-113'}>blackcoin</div>

              <div className={'flex flex-col justify-center items-center gap-1.5'}>
                <div className={'text-gray-20 font-suit-20-600-150'}>LOG-IN</div>
              </div>
            </div>

            <div className={'flex flex-col gap-6'}>
              <label>
                <div className={'flex gap-1'}>
                  <div className={'font-suit-13-m-130 text-gray-40'}>추천 코드</div>
                  <div className={'text-red-50'}>*</div>
                </div>

                <input
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  className={
                    'w-full px-3 py-4 border border-gray-80 rounded-[14px] placeholder:text-gray-60 font-suit-16-400-130'
                  }
                  placeholder={'추천 코드'}
                />
              </label>

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
                <input type={'checkbox'} checked={autoLogin} onChange={handleAutoSaveChange} />
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
                type={'submit'}
                className={
                  'w-2/3 p-3 text-gray-100 bg-purple-fmg60 rounded-3xl font-suit-17-m-130 disabled:bg-gray-90 disabled:text-gray-50'
                }
                disabled={!isFormValid}
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
