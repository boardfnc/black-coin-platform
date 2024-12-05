import type { ChangeEvent } from 'react';
import { useState } from 'react';

import type { IUserDetailChangePasswordModalProps } from './UserDetailChangePasswordModal.types';

import Modal from '@/components/atoms/modals/Modal';
import { useRequest, useToast } from '@/hooks';
import { adminMemberPasswordUpdateService } from '@/services/admin/member/adminMembers';
import { mypagePasswordUpdateService } from '@/services/admin/member/members';

export default function UserDetailChangePasswordModal(props: IUserDetailChangePasswordModalProps) {
  const { isOpen, onClose, id, isMyProfile } = props;
  const { request } = useRequest();

  const { open: openToast } = useToast();

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setFormData({
      newPassword: '',
      confirmPassword: '',
    });
    onClose();
  };

  // NOTE: 회원 비밀번호 업데이트
  const handleSubmit = async () => {
    if (formData.newPassword === formData.confirmPassword) {
      const data = await request(() =>
        isMyProfile
          ? mypagePasswordUpdateService({
              password: formData.newPassword,
            })
          : adminMemberPasswordUpdateService({
              id: Number(id),
              password: formData.newPassword,
            }),
      );

      if (data?.status) {
        openToast({
          message: '변경사항이 저장되었습니다.',
          type: 'success',
        });

        handleClose();
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} width={'500px'}>
      <div className={'flex flex-col gap-10 p-5 h-full bg-gray-100'}>
        <div className={'flex flex-col gap-4 text-center'}>
          <div className={'text-gray-0 font-pre-24-b-130'}>ADMIN</div>

          <div className={'flex flex-col gap-1.5'}>
            <div className={'text-gray-0 font-pre-22-m-130 whitespace-pre'}>비밀번호 변경</div>
            <div className={'text-gray-30 font-pre-16-r-130'}>비밀번호 변경을 위해 정보를 정확히 입력해주세요.</div>
          </div>
        </div>

        <div className={'flex flex-col gap-6'}>
          <div className={'flex flex-col items-start gap-1'}>
            <div className={'font-pre-14-m-130 flex items-center gap-1'}>
              <span className={'text-gray-40'}>새 비밀번호</span>
              <span className={'text-red-50'}>*</span>
            </div>
            <input
              type={'password'}
              name={'newPassword'}
              value={formData.newPassword}
              onChange={handleChange}
              className={'text-gray-0 placeholder:text-gray-50 font-pre-16-r-130 py-4 w-full border-b'}
              placeholder={'새로운 비밀번호'}
            />
          </div>

          <div className={'flex flex-col items-start gap-1'}>
            <div className={'font-pre-14-m-130 flex items-center gap-1'}>
              <span className={'text-gray-40'}>새 비밀번호 확인</span>
              <span className={'text-red-50'}>*</span>
            </div>
            <input
              type={'password'}
              name={'confirmPassword'}
              value={formData.confirmPassword}
              onChange={handleChange}
              className={'text-gray-0 placeholder:text-gray-50 font-pre-16-r-130 py-4 w-full border-b'}
              placeholder={'새로운 비밀번호 확인'}
            />
          </div>
        </div>

        <div className={'px-[10px] py-[6.5px] text-gray-20 font-suit-14-r-150'}>
          ✻ 회원의 요구가 있을 경우 변경해주시기 바랍니다.
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
            비밀번호 변경
          </button>
        </div>
      </div>
    </Modal>
  );
}
