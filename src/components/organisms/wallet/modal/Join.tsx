'use client';

import { useSearchParams } from 'next/navigation';

import { useState, useMemo } from 'react';

import { useMutation } from '@tanstack/react-query';

import { IconLine24Close } from '@/components/atoms/icons/icon-line';
import { Image } from '@/components/atoms/images';
import Modal from '@/components/atoms/modals/Modal';
import { useToast } from '@/hooks';
import { digitalIllustration } from '@/images/background';
import { joinService } from '@/services/admin/auth/join';
import { useJoin } from '@/stores/join';
import { useLogin } from '@/stores/login';

export default function JoinModal() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [success, setSuccess] = useState(false);

  const { open: openToast } = useToast();
  const { isOpen: isJoinOpen, closeModal: closeJoinModal } = useJoin();
  const { openModal: openLoginModal } = useLogin();

  const searchParams = useSearchParams();

  const { mutate } = useMutation({
    mutationFn: joinService,
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
      return alert('진행할 수 없습니다.');
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
    <Modal isOpen={isJoinOpen} onClose={closeJoinModal} width={success ? '500px' : '450px'}>
      {success && (
        <div className={'p-5'}>
          <div className={'flex justify-end'}>
            <button onClick={closeJoinModal}>
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

            <button
              className={'h-12 rounded-3xl text-gray-100 bg-purple-fmg60'}
              onClick={() => {
                closeJoinModal();
                openLoginModal();
              }}
            >
              지갑 연동
            </button>
          </div>
        </div>
      )}

      {!success && (
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

              <label>
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
              </label>

              <div className={'text-gray-40 text-sm mt-4'}>
                ✻ 아이디와 비밀번호를 잊지 않도록 현재 이용중인 사이트와 동일하게 설정하는 것을 권장합니다.
              </div>
            </div>

            <div className={'flex gap-4 mt-6'}>
              <button
                className={'w-1/3 p-3 text-gray-10 bg-gray-80 rounded-3xl font-suit-17-m-130'}
                onClick={closeJoinModal}
              >
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
      )}
    </Modal>
  );
}
