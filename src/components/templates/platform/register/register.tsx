'use client';

import Link from 'next/link';

import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';

import { useMutation } from '@tanstack/react-query';

import { Image } from '@/components/atoms/images';
import { BankSelect } from '@/components/atoms/inputs';
import { ROUTES } from '@/constants';
import { helloIcon } from '@/images/background';
import { joinService } from '@/services/admin/auth/join';

interface IFormData {
  id: string;
  password: string;
  passwordConfirm: string;
  phone1: string;
  phone2: string;
  phone3: string;
  referralCode: string;
  bank: string;
  accountHolder: string;
  accountNumber: string;
}

interface IFormError {
  id?: string;
  password?: string;
  passwordConfirm?: string;
  phone?: string;
  referralCode?: string;
  bank?: string;
  accountHolder?: string;
  accountNumber?: string;
}

interface ITouchedFields {
  id: boolean;
  password: boolean;
  passwordConfirm: boolean;
  phone: boolean;
  referralCode: boolean;
  bank: boolean;
  accountHolder: boolean;
  accountNumber: boolean;
}

export default function PlatformRegister() {
  const [formData, setFormData] = useState<IFormData>({
    id: '',
    password: '',
    passwordConfirm: '',
    phone1: '',
    phone2: '',
    phone3: '',
    referralCode: '',
    bank: '',
    accountHolder: '',
    accountNumber: '',
  });

  const [touched, setTouched] = useState<ITouchedFields>({
    id: false,
    password: false,
    passwordConfirm: false,
    phone: false,
    referralCode: false,
    bank: false,
    accountHolder: false,
    accountNumber: false,
  });

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<IFormError>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const { mutate } = useMutation({
    mutationFn: joinService,
    onSuccess(data) {
      if (data != null) {
        if (data.status) return setSuccess(true);

        throw new Error(data.message);
      }
    },
  });

  const validateId = (id: string) => {
    if (!id) return '아이디를 입력해주세요.';
    if (id.length < 6) return '아이디는 6자리 이상 입력해야 합니다.';
    if (!/^[a-zA-Z0-9]+$/.test(id)) return '영문과 숫자만 사용이 가능합니다.';
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) return '비밀번호를 입력해주세요.';
    if (password.length < 6 || password.length > 18) return '비밀번호는 6~18자 이내로 입력해주세요.';
    return '';
  };

  const validatePhone = (phone1: string, phone2: string, phone3: string) => {
    const validFormats = [/^(\d{3})(\d{4})(\d{4})$/, /^(\d{2})(\d{4})(\d{4})$/, /^(\d{2})(\d{3})(\d{4})$/];
    const phone = `${phone1}${phone2}${phone3}`;
    if (!phone1 || !phone2 || !phone3) return '연락처를 입력해주세요.';
    if (!validFormats.some((format) => format.test(phone))) return '연락처 형식이 맞지 않습니다.';
    return '';
  };

  const handleBlur = (field: keyof ITouchedFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleInputChange = (field: keyof IFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handlePhoneInput = (event: ChangeEvent<HTMLInputElement>, field: 'phone1' | 'phone2' | 'phone3') => {
    const value = event.target.value.replace(/[^0-9]/g, '');
    handleInputChange(field, value);
    setTouched((prev) => ({ ...prev, phone: true }));
  };

  useEffect(() => {
    const newErrors: IFormError = {};

    newErrors.id = validateId(formData.id);
    newErrors.password = validatePassword(formData.password);
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }
    newErrors.phone = validatePhone(formData.phone1, formData.phone2, formData.phone3);

    if (!formData.referralCode) newErrors.referralCode = '추천코드를 입력해주세요.';
    if (!formData.bank) newErrors.bank = '은행을 선택해주세요.';
    if (!formData.accountHolder) newErrors.accountHolder = '예금주를 입력해주세요.';
    if (!formData.accountNumber) newErrors.accountNumber = '계좌번호를 입력해주세요.';

    setErrors(newErrors);
    setIsFormValid(Object.values(newErrors).every((error) => !error));
  }, [formData]);

  const onClickRegisterButton = () => {
    mutate({
      login_id: formData.id,
      password: formData.password,
      code: formData.referralCode,
      mp_no: formData.phone1 + formData.phone2 + formData.phone3,
      nm: formData.accountHolder,
      bank: formData.bank,
      acnutno: formData.accountNumber,
      dpstr: formData.accountHolder,
    });
  };

  return (
    <div className={'w-auto mx-auto px-[30px] sm:mt-[0px] mt-[200px]'}>
      <div className={'flex flex-col gap-[70px]'}>
        <div className={'flex flex-col gap-[80px] mb-[100px]'}>
          <div className={'flex flex-col justify-center items-center border-b border-gray-80 gap-3'}>
            <div className={'text-yellow-50 font-suit-32-750-130 py-5'}>Service Name</div>
          </div>

          {!success && (
            <div className={'max-w-[400px] mx-auto flex flex-col gap-[28px]'}>
              <div
                className={'text-center text-gray-10 font-suit-22-b-144 whitespace-pre'}
              >{`회원가입을 위해\n아래 항목을 입력해 주세요.`}</div>

              <div className={'flex flex-col gap-[80px]'}>
                <div className={'flex flex-col gap-6'}>
                  <div>
                    <div className={'flex gap-1'}>
                      <div className={`font-suit-13-m-130 ${touched.id && errors.id ? 'text-red-60' : 'text-gray-40'}`}>
                        아이디
                      </div>
                      <div className={'text-red-50'}>*</div>
                    </div>

                    <div className={'mt-1'}>
                      <input
                        value={formData.id}
                        onChange={(event) => handleInputChange('id', event.target.value)}
                        onBlur={() => handleBlur('id')}
                        className={`w-full px-3 py-4 border-b ${touched.id && errors.id ? 'border-red-60' : 'border-gray-80'} placeholder:text-gray-60 font-suit-16-400-130`}
                        placeholder={'아이디'}
                      />

                      {touched.id && errors.id && <div className={'mt-2 text-red-60 text-xs'}>{errors.id}</div>}
                    </div>
                  </div>

                  <div>
                    <div className={'flex gap-1'}>
                      <div
                        className={`font-suit-13-m-130 ${touched.password && errors.password ? 'text-red-60' : 'text-gray-40'}`}
                      >
                        비밀번호
                      </div>
                      <div className={'text-red-50'}>*</div>
                    </div>

                    <input
                      type={'password'}
                      value={formData.password}
                      onChange={(event) => handleInputChange('password', event.target.value)}
                      onBlur={() => handleBlur('password')}
                      className={`w-full px-3 py-4 border-b ${touched.password && errors.password ? 'border-red-60' : 'border-gray-80'} placeholder:text-gray-60 font-suit-16-400-130`}
                      placeholder={'비밀번호'}
                    />

                    {touched.password && errors.password && (
                      <div className={'mt-2 text-red-60 text-xs'}>{errors.password}</div>
                    )}
                  </div>

                  <div>
                    <div className={'flex gap-1'}>
                      <div
                        className={`font-suit-13-m-130 ${touched.passwordConfirm && errors.passwordConfirm ? 'text-red-60' : 'text-gray-40'}`}
                      >
                        비밀번호 확인
                      </div>
                      <div className={'text-red-50'}>*</div>
                    </div>

                    <input
                      type={'password'}
                      value={formData.passwordConfirm}
                      onChange={(event) => handleInputChange('passwordConfirm', event.target.value)}
                      onBlur={() => handleBlur('passwordConfirm')}
                      className={`w-full px-3 py-4 border-b ${touched.passwordConfirm && errors.passwordConfirm ? 'border-red-60' : 'border-gray-80'} placeholder:text-gray-60 font-suit-16-400-130`}
                      placeholder={'비밀번호 확인'}
                    />

                    {touched.passwordConfirm && errors.passwordConfirm && (
                      <div className={'mt-2 text-red-60 text-xs'}>{errors.passwordConfirm}</div>
                    )}
                  </div>

                  <div className={'flex flex-col gap-1'}>
                    <div className={'flex gap-1'}>
                      <div
                        className={`font-suit-13-m-130 ${touched.phone && errors.phone ? 'text-red-60' : 'text-gray-40'}`}
                      >
                        휴대폰 번호
                      </div>
                      <div className={'text-red-50'}>*</div>
                    </div>

                    <div className={'flex items-center gap-[6px]'}>
                      <input
                        value={formData.phone1}
                        onChange={(event) => handlePhoneInput(event, 'phone1')}
                        onBlur={() => handleBlur('phone')}
                        className={`px-3 py-4 text-center border rounded-[14px] ${touched.phone && errors.phone ? 'border-red-60' : 'border-gray-80'} placeholder:text-gray-60 font-suit-16-400-130 w-1/3`}
                        placeholder={'010'}
                      />
                      <div>-</div>
                      <input
                        value={formData.phone2}
                        onChange={(event) => handlePhoneInput(event, 'phone2')}
                        onBlur={() => handleBlur('phone')}
                        className={`px-3 py-4 text-center border rounded-[14px] ${touched.phone && errors.phone ? 'border-red-60' : 'border-gray-80'} placeholder:text-gray-60 font-suit-16-400-130 w-1/3`}
                        placeholder={'0000'}
                      />
                      <div>-</div>
                      <input
                        value={formData.phone3}
                        onChange={(event) => handlePhoneInput(event, 'phone3')}
                        onBlur={() => handleBlur('phone')}
                        className={`px-3 py-4 text-center border rounded-[14px] ${touched.phone && errors.phone ? 'border-red-60' : 'border-gray-80'} placeholder:text-gray-60 font-suit-16-400-130 w-1/3`}
                        placeholder={'0000'}
                      />
                    </div>

                    {touched.phone && errors.phone && <div className={'mt-2 text-red-60 text-xs'}>{errors.phone}</div>}
                  </div>

                  <div>
                    <div className={'flex gap-1'}>
                      <div
                        className={`font-suit-13-m-130 ${touched.referralCode && errors.referralCode ? 'text-red-60' : 'text-gray-40'}`}
                      >
                        추천코드
                      </div>
                      <div className={'text-red-50'}>*</div>
                    </div>

                    <input
                      value={formData.referralCode}
                      onChange={(event) => handleInputChange('referralCode', event.target.value)}
                      onBlur={() => handleBlur('referralCode')}
                      className={`w-full px-3 py-4 border-b ${touched.referralCode && errors.referralCode ? 'border-red-60' : 'border-gray-80'} placeholder:text-gray-60 font-suit-16-400-130`}
                      placeholder={'추천코드'}
                    />

                    {touched.referralCode && errors.referralCode && (
                      <div className={'mt-2 text-red-60 text-xs'}>{errors.referralCode}</div>
                    )}
                  </div>

                  <div>
                    <div className={'flex gap-1'}>
                      <div
                        className={`font-suit-13-m-130 ${touched.bank && errors.bank ? 'text-red-60' : 'text-gray-40'}`}
                      >
                        은행
                      </div>
                      <div className={'text-red-50'}>*</div>
                    </div>

                    <BankSelect
                      value={formData.bank}
                      onChange={(value) => handleInputChange('bank', value)}
                      onBlur={() => handleBlur('bank')}
                      className={`w-full px-3 py-4 border-b ${touched.bank && errors.bank ? 'border-red-60' : 'border-gray-80'} text-gray-60 font-suit-16-400-130`}
                    />

                    {touched.bank && errors.bank && <div className={'mt-2 text-red-60 text-xs'}>{errors.bank}</div>}
                  </div>

                  <div>
                    <div className={'flex gap-1'}>
                      <div
                        className={`font-suit-13-m-130 ${touched.accountHolder && errors.accountHolder ? 'text-red-60' : 'text-gray-40'}`}
                      >
                        예금주
                      </div>
                      <div className={'text-red-50'}>*</div>
                    </div>

                    <input
                      value={formData.accountHolder}
                      onChange={(event) => handleInputChange('accountHolder', event.target.value)}
                      onBlur={() => handleBlur('accountHolder')}
                      className={`w-full px-3 py-4 border-b ${touched.accountHolder && errors.accountHolder ? 'border-red-60' : 'border-gray-80'} placeholder:text-gray-60 font-suit-16-400-130`}
                      placeholder={'예금주'}
                    />

                    {touched.accountHolder && errors.accountHolder && (
                      <div className={'mt-2 text-red-60 text-xs'}>{errors.accountHolder}</div>
                    )}
                  </div>

                  <div>
                    <div className={'flex gap-1'}>
                      <div
                        className={`font-suit-13-m-130 ${touched.accountNumber && errors.accountNumber ? 'text-red-60' : 'text-gray-40'}`}
                      >
                        계좌번호
                      </div>
                      <div className={'text-red-50'}>*</div>
                    </div>

                    <input
                      value={formData.accountNumber}
                      onChange={(event) => handleInputChange('accountNumber', event.target.value)}
                      onBlur={() => handleBlur('accountNumber')}
                      className={`w-full px-3 py-4 border-b ${touched.accountNumber && errors.accountNumber ? 'border-red-60' : 'border-gray-80'} placeholder:text-gray-60 font-suit-16-400-130`}
                      placeholder={'계좌번호'}
                    />

                    {touched.accountNumber && errors.accountNumber && (
                      <div className={'mt-2 text-red-60 text-xs'}>{errors.accountNumber}</div>
                    )}
                  </div>
                </div>

                <div className={'flex flex-col gap-5'}>
                  <button
                    className={`h-12 rounded-3xl font-suit-17-m-130 ${
                      isFormValid
                        ? 'text-gray-100 bg-gray-0 cursor-pointer'
                        : 'text-gray-100 bg-gray-80 cursor-not-allowed'
                    }`}
                    onClick={onClickRegisterButton}
                    disabled={!isFormValid}
                  >
                    회원가입
                  </button>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className={'max-w-[400px] mx-auto flex flex-col gap-[80px]'}>
              <div className={'flex flex-col gap-[66px] text-gray-10 font-suit-22-b-144'}>
                <div className={'flex flex-col justify-center items-center gap-[80px]'}>
                  <Image src={helloIcon} alt={'success'} width={139} height={147} />
                </div>

                <div className={'flex flex-col gap-2 text-center'}>
                  <div className={'text-gray-10 font-suit-22-700'}>회원가입 신청이 완료되었습니다.</div>
                  <div className={'text-gray-20 font-suit-14-400'}>승인 확인 후 서비스 이용이 가능합니다.</div>
                </div>
              </div>

              <Link
                href={ROUTES.PLATFORM.HOME}
                className={
                  'flex justify-center items-center h-12 rounded-3xl font-suit-17-m-130 text-gray-100 bg-gray-0'
                }
              >
                메인 화면으로 이동
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
