import type { ChangeEvent } from 'react';
import { useState } from 'react';

import type { IUserListCreateAuthorModalProps } from './UserListCreateAuthorModal.types';

import IconLine24SquareInfo from '@/components/atoms/icons/icon-line/SquareInfo';
import Modal from '@/components/atoms/modals/Modal';
import { useRequest } from '@/hooks';
import { adminManagersPostService } from '@/services/admin/member/adminManagers';

export default function UserListCreateAuthorModal(props: IUserListCreateAuthorModalProps) {
  const { isOpen, onClose } = props;

  const { request } = useRequest();

  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    passwordConfirm: '',
    partnerName: '',
    contactNumber: '',
    siteUrl: '',
    bankName: '',
    accountNumber: '',
    accountHolder: '',
    feePerCase: '',
    purchaseFeePercent: '',
    saleFeePercent: '',
  });

  const [errors, setErrors] = useState({
    userId: '',
    password: '',
    passwordConfirm: '',
    partnerName: '',
    contactNumber: '',
    siteUrl: '',
    accountNumber: '',
    accountHolder: '',
  });

  const validateForm = () => {
    const newErrors = { ...errors };
    let isValid = true;

    const userIdRegex = /^[A-Za-z0-9]{4,20}$/;
    if (!formData.userId) {
      newErrors.userId = '정보를 입력해주세요.';
      isValid = false;
    } else if (!userIdRegex.test(formData.userId)) {
      if (formData.userId.length < 4 || formData.userId.length > 20) {
        newErrors.userId = '4자 ~ 20자 이하까지 입력가능합니다.';
      } else {
        newErrors.userId = '아이디는 영문과 숫자만 입력이 가능합니다.';
      }
      isValid = false;
    } else {
      newErrors.userId = '';
    }

    if (!formData.password) {
      newErrors.password = '정보를 입력해주세요.';
      isValid = false;
    } else if (formData.password.length < 6 || formData.password.length > 20) {
      newErrors.password = '비밀번호는 6자~20자 이하까지 입력이 가능합니다.';
      isValid = false;
    } else {
      newErrors.password = '';
    }

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
      isValid = false;
    } else {
      newErrors.passwordConfirm = '';
    }

    if (!formData.partnerName) {
      newErrors.partnerName = '정보를 입력해주세요.';
      isValid = false;
    } else {
      newErrors.partnerName = '';
    }

    if (!formData.contactNumber) {
      newErrors.contactNumber = '정보를 입력해주세요.';
      isValid = false;
    } else {
      newErrors.contactNumber = '';
    }

    if (!formData.siteUrl) {
      newErrors.siteUrl = '정보를 입력해주세요.';
      isValid = false;
    } else {
      newErrors.siteUrl = '';
    }

    if (!formData.accountNumber) {
      newErrors.accountNumber = '정보를 입력해주세요.';
      isValid = false;
    } else {
      newErrors.accountNumber = '';
    }

    if (!formData.accountHolder) {
      newErrors.accountHolder = '정보를 입력해주세요.';
      isValid = false;
    } else {
      newErrors.accountHolder = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setFormData({
      userId: '',
      password: '',
      passwordConfirm: '',
      partnerName: '',
      contactNumber: '',
      siteUrl: '',
      bankName: '',
      accountNumber: '',
      accountHolder: '',
      feePerCase: '',
      purchaseFeePercent: '',
      saleFeePercent: '',
    });
    setErrors({
      userId: '',
      password: '',
      passwordConfirm: '',
      partnerName: '',
      contactNumber: '',
      siteUrl: '',
      accountNumber: '',
      accountHolder: '',
    });
    onClose();
  };

  const handleSubmit = () => {
    if (validateForm()) {
      request(() =>
        adminManagersPostService({
          login_id: formData.userId,
          prtnr_nm: formData.partnerName,
          mp_no: formData.contactNumber,
          site_adres: formData.siteUrl,
          bank: formData.bankName,
          acnutno: formData.accountNumber,
          dpstr: formData.accountHolder,
          csby_fee: Number(formData.feePerCase),
          password: formData.password,
          purchs_fee: Number(formData.purchaseFeePercent),
          sle_fee: Number(formData.saleFeePercent),
        }),
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} width={'600px'} height={'800px'}>
      <div className={'flex flex-col gap-10 ps-5 pe-4 h-full bg-gray-100'}>
        <div className={'flex flex-col gap-4 text-center'}>
          <div className={'text-gray-0 font-pre-24-b-130'}>ADMIN</div>

          <div className={'flex flex-col gap-1.5'}>
            <div className={'text-gray-0 font-pre-22-m-130'}>CA 아이디 생성</div>
            <div className={'text-gray-30 font-pre-16-r-130'}>CA 회원 생성을 위해 모든 정보를 입력해주세요.</div>
          </div>
        </div>

        <div className={'flex flex-col gap-10 overflow-y-scroll h-[500px] pe-3'}>
          <div className={'flex flex-col gap-6'}>
            <div className={'flex gap-1.5 text-gray-30 font-pre-16-r-130 px-2.5 items-center'}>
              <IconLine24SquareInfo className={'text-orange-orange50'} />

              <div className={'text-gray-0 font-pre-13-r-130'}>
                입력한 정보는 회원가입 후 회원정보에서 수정이 가능합니다.
              </div>
            </div>

            <div className={'text-gray-0 font-pre-20-600-130 flex flex-col gap-6'}>Step 01. 회원정보</div>

            <div className={'flex flex-col items-start gap-1'}>
              <div className={'font-pre-14-m-130 flex items-center gap-1'}>
                <span className={'text-gray-40'}>아이디</span>
                <span className={'text-red-50'}>*</span>
              </div>
              <input
                name={'userId'}
                value={formData.userId}
                onChange={handleChange}
                className={`text-gray-0 placeholder:text-gray-50 font-pre-16-r-130 py-4 w-full border-b ${
                  errors.userId ? 'border-red-60 text-red-60' : ''
                }`}
                placeholder={'아이디'}
              />
              {errors.userId && <span className={'text-red-60 text-sm'}>{errors.userId}</span>}
            </div>

            <div className={'flex flex-col items-start gap-1'}>
              <div className={'font-pre-14-m-130 flex items-center gap-1'}>
                <span className={'text-gray-40'}>비밀번호</span>
                <span className={'text-red-50'}>*</span>
              </div>
              <input
                name={'password'}
                value={formData.password}
                onChange={handleChange}
                type={'password'}
                className={`text-gray-0 placeholder:text-gray-50 font-pre-16-r-130 py-4 w-full border-b ${
                  errors.password ? 'border-red-60 text-red-60' : ''
                }`}
                placeholder={'비밀번호'}
              />
              {errors.password && <span className={'text-red-60 text-sm'}>{errors.password}</span>}
            </div>

            <div className={'flex flex-col items-start gap-1'}>
              <div className={'font-pre-14-m-130 flex items-center gap-1'}>
                <span className={'text-gray-40'}>비밀번호 확인</span>
                <span className={'text-red-50'}>*</span>
              </div>
              <input
                name={'passwordConfirm'}
                value={formData.passwordConfirm}
                onChange={handleChange}
                type={'password'}
                className={`text-gray-0 placeholder:text-gray-50 font-pre-16-r-130 py-4 w-full border-b ${
                  errors.passwordConfirm ? 'border-red-60 text-red-60' : ''
                }`}
                placeholder={'비밀번호 확인'}
              />
              {errors.passwordConfirm && <span className={'text-red-60 text-sm'}>{errors.passwordConfirm}</span>}
            </div>
          </div>

          <div className={'text-gray-0 font-pre-20-600-130 flex flex-col gap-6'}>Step 02. 계정정보</div>

          <div className={'flex flex-col items-start gap-1'}>
            <div className={'font-pre-14-m-130 flex items-center gap-1'}>
              <span className={'text-gray-40'}>파트너사명</span>
              <span className={'text-red-50'}>*</span>
            </div>
            <input
              name={'partnerName'}
              value={formData.partnerName}
              onChange={handleChange}
              className={`text-gray-0 placeholder:text-gray-50 font-pre-16-r-130 py-4 w-full border-b ${
                errors.partnerName ? 'border-red-60 text-red-60' : ''
              }`}
              placeholder={'파트너사명'}
            />
            {errors.partnerName && <span className={'text-red-60 text-sm'}>{errors.partnerName}</span>}
          </div>

          <div className={'flex flex-col items-start gap-1'}>
            <div className={'font-pre-14-m-130 flex items-center gap-1'}>
              <span className={'text-gray-40'}>담당자연락처</span>
              <span className={'text-red-50'}>*</span>
            </div>
            <input
              name={'contactNumber'}
              value={formData.contactNumber}
              onChange={handleChange}
              className={`text-gray-0 placeholder:text-gray-50 font-pre-16-r-130 py-4 w-full border-b ${
                errors.contactNumber ? 'border-red-60 text-red-60' : ''
              }`}
              placeholder={'담당자연락처'}
            />
            {errors.contactNumber && <span className={'text-red-60 text-sm'}>{errors.contactNumber}</span>}
          </div>

          <div className={'flex flex-col items-start gap-1'}>
            <div className={'font-pre-14-m-130 flex items-center gap-1'}>
              <span className={'text-gray-40'}>사이트주소</span>
              <span className={'text-red-50'}>*</span>
            </div>
            <input
              name={'siteUrl'}
              value={formData.siteUrl}
              onChange={handleChange}
              className={`text-gray-0 placeholder:text-gray-50 font-pre-16-r-130 py-4 w-full border-b ${
                errors.siteUrl ? 'border-red-60 text-red-60' : ''
              }`}
              placeholder={'사이트주소'}
            />
            {errors.siteUrl && <span className={'text-red-60 text-sm'}>{errors.siteUrl}</span>}
          </div>

          <div className={'text-gray-0 font-pre-20-600-130 flex flex-col gap-6'}>Step 03. 계좌정보</div>

          <div className={'flex flex-col items-start gap-1'}>
            <div className={'font-pre-14-m-130 flex items-center gap-1'}>
              <span className={'text-gray-40'}>은행명</span>
              <span className={'text-red-50'}>*</span>
            </div>
            <select
              name={'bankName'}
              value={formData.bankName}
              onChange={handleChange}
              className={'text-gray-50 font-pre-16-r-130 py-3 px-2.5 w-full border rounded-xl'}
            >
              <option value={''}>은행명</option>
            </select>
          </div>

          <div className={'flex flex-col items-start gap-1'}>
            <div className={'font-pre-14-m-130 flex items-center gap-1'}>
              <span className={'text-gray-40'}>계좌번호</span>
              <span className={'text-red-50'}>*</span>
            </div>
            <input
              name={'accountNumber'}
              value={formData.accountNumber}
              onChange={handleChange}
              className={`text-gray-0 placeholder:text-gray-50 font-pre-16-r-130 py-4 w-full border-b ${
                errors.accountNumber ? 'border-red-60 text-red-60' : ''
              }`}
              placeholder={'(-)제외 숫자만 입력'}
            />
            {errors.accountNumber && <span className={'text-red-60 text-sm'}>{errors.accountNumber}</span>}
          </div>

          <div className={'flex flex-col items-start gap-1'}>
            <div className={'font-pre-14-m-130 flex items-center gap-1'}>
              <span className={'text-gray-40'}>예금주명</span>
              <span className={'text-red-50'}>*</span>
            </div>
            <input
              name={'accountHolder'}
              value={formData.accountHolder}
              onChange={handleChange}
              className={`text-gray-0 placeholder:text-gray-50 font-pre-16-r-130 py-4 w-full border-b ${
                errors.accountHolder ? 'border-red-60 text-red-60' : ''
              }`}
              placeholder={'입력'}
            />
            {errors.accountHolder && <span className={'text-red-60 text-sm'}>{errors.accountHolder}</span>}
          </div>

          <div className={'text-gray-0 font-pre-20-600-130 flex flex-col gap-6'}>Step 04. 수수료정보</div>

          <div className={'flex flex-col items-start gap-1'}>
            <div className={'font-pre-14-m-130 flex items-center gap-1'}>
              <span className={'text-gray-40'}>건당 수수료(원)</span>
              <span className={'text-red-50'}>*</span>
            </div>
            <div className={'relative w-full'}>
              <input
                name={'feePerCase'}
                value={formData.feePerCase}
                onChange={handleChange}
                className={
                  'px-3.5 text-gray-0 placeholder:text-gray-50 font-pre-16-r-130 py-4 w-full border rounded-xl pr-8'
                }
                placeholder={'0'}
              />
              <span className={'absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-50 font-pre-16-r-130'}>원</span>
            </div>
          </div>

          <div className={'flex flex-col items-start gap-1'}>
            <div className={'font-pre-14-m-130 flex items-center gap-1'}>
              <span className={'text-gray-40'}>구매 수수료(%)</span>
              <span className={'text-red-50'}>*</span>
            </div>
            <div className={'relative w-full'}>
              <input
                name={'purchaseFeePercent'}
                value={formData.purchaseFeePercent}
                onChange={handleChange}
                className={
                  'px-3.5 text-gray-0 placeholder:text-gray-50 font-pre-16-r-130 py-4 w-full border rounded-xl pr-8'
                }
                placeholder={'0'}
              />
              <span className={'absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-50 font-pre-16-r-130'}>%</span>
            </div>
          </div>

          <div className={'flex flex-col items-start gap-1'}>
            <div className={'font-pre-14-m-130 flex items-center gap-1'}>
              <span className={'text-gray-40'}>판매 수수료(%)</span>
              <span className={'text-red-50'}>*</span>
            </div>
            <div className={'relative w-full'}>
              <input
                name={'saleFeePercent'}
                value={formData.saleFeePercent}
                onChange={handleChange}
                className={
                  'px-3.5 text-gray-0 placeholder:text-gray-50 font-pre-16-r-130 py-4 w-full border rounded-xl pr-8'
                }
                placeholder={'0'}
              />
              <span className={'absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-50 font-pre-16-r-130'}>%</span>
            </div>
          </div>
        </div>

        <div className={'flex justify-end items-start gap-2 h-12'}>
          <button
            className={'h-full text-gray-10 font-pre-16-r-130 bg-gray-90 px-4 rounded-3xl w-[20%]'}
            onClick={handleClose}
          >
            취소
          </button>

          <button
            className={'h-full text-gray-100 font-pre-16-m-130 bg-gray-0 px-4 rounded-3xl w-[80%]'}
            onClick={handleSubmit}
          >
            아이디 생성
          </button>
        </div>
      </div>
    </Modal>
  );
}
