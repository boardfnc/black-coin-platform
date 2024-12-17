import type { UserDetailGradeResetModalProps } from './UserDetailGradeResetModal.types';

import { IconLine24RoundWarning } from '@/components/atoms/icons/icon-line';
import { Modal } from '@/components/atoms/modals';
import { useRequest, useToast } from '@/hooks';
import { adminMemberGradeInitializationService } from '@/services/admin/member/adminMembers';

export default function UserDetailGradeResetModal({ isOpen, onClose, id, refetch }: UserDetailGradeResetModalProps) {
  const { request } = useRequest();
  const { open: openToast } = useToast();

  const handleGradeResetModalClose = () => {
    onClose();
  };

  const handleGradeReset = async () => {
    const data = await request(() =>
      adminMemberGradeInitializationService({
        id: Number(id),
      }),
    );

    if (data?.status) {
      openToast({
        message: '등급이 초기화되었습니다.',
        type: 'success',
      });

      refetch();
    }

    handleGradeResetModalClose();
  };

  return (
    <Modal width={'400px'} isOpen={isOpen} onClose={handleGradeResetModalClose}>
      <div className={'flex flex-col items-center justify-center gap-4 py-1 px-3'}>
        <div className={'flex flex-col items-center justify-center'}>
          <div className={'w-20 h-20 flex flex-col text-red-60 bg-red-95 p-6 rounded-full'}>
            <IconLine24RoundWarning width={32} height={32} preserveAspectRatio={'none'} />
          </div>
        </div>

        <div className={'w-full flex flex-col items-center justify-center gap-8'}>
          <div className={'w-full flex flex-col items-center justify-center gap-2'}>
            <h2 className={'text-gray-10 font-pre-20-m-130'}>등급 초기화</h2>

            <p className={'text-gray-30 font-pre-15-r-130 text-center whitespace-pre-line'}>
              {`등급 초기화 시 해당 회원의 고정된 등급은 사라지며\n설정한 기준에 맞춰 자동으로 회원등급이 조정됩니다.\n계속 진행하시겠습니까?`}
            </p>
          </div>

          <div className={'w-full flex justify-between items-center gap-2'}>
            <button
              className={'w-full px-4 py-2 bg-gray-90 text-gray-0 rounded-[60px]'}
              onClick={handleGradeResetModalClose}
            >
              취소
            </button>

            <button
              className={'w-full px-4 py-2 bg-primary-50 text-gray-100 rounded-[60px]'}
              onClick={handleGradeReset}
            >
              진행
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
