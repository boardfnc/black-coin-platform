/* eslint-disable @typescript-eslint/no-empty-function */

import Link from 'next/link';

import { useState } from 'react';

import { ConfirmModal } from '../modal';

import type { ISignupTableProps } from './SignupTable.types';
import type { IConfirmColModalProps } from '../modal/ConfirmColModal.types';

import { IconLine24RoundWarning } from '@/components/atoms/icons/icon-line';
import { ROUTES } from '@/constants';
import { useRequest, useToast } from '@/hooks';
import {
  adminMemberSubscribeConsentService,
  adminMemberSubscribeRejectionService,
} from '@/services/admin/member/adminMembers';
import { dayjs } from '@/utils';
import { covertMemberJoinProgress } from '@/utils/covert';

export default function SignupTable({ data, refetch }: ISignupTableProps) {
  const [showConfirmParams, setShowConfirmParams] = useState<IConfirmColModalProps>({
    isOpen: false,
    onClose() {},
    onConfirm() {},
    icon: <IconLine24RoundWarning />,
    title: '',
    content: '',
  });

  const { open: openToast } = useToast();
  const { request } = useRequest();

  if (!data) return null;

  const consentSignup = async (id: number) => {
    const response = await request(() => adminMemberSubscribeConsentService({ mber_id: id }));

    if (response != null && 'status' in response && response.status) {
      openToast({
        type: 'success',
        message: '회원 가입 승인 처리 완료',
      });

      refetch();
    }

    return response;
  };

  const rejectSignup = async (id: number) => {
    const response = await request(() => adminMemberSubscribeRejectionService({ mber_id: id }));

    if (response != null && 'status' in response && response.status) {
      openToast({
        type: 'success',
        message: '거절 처리 되었습니다.',
      });

      refetch();
    }

    return response;
  };

  return (
    <>
      <table className={'w-full border-collapse text-center'}>
        <thead className={'text-gray-20 font-pre-13-m-130'}>
          <tr className={'bg-gray-99'}>
            <th className={'h-12 border border-gray-80 p-2'} rowSpan={2}>
              NO.
            </th>
            <th className={'w-[120px] border border-gray-80 p-2'} rowSpan={2}>
              가입일
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              아이디
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              연락처
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              추천코드명
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              파트너사명
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              은행명
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              예금주
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              계좌번호
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              상태
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              수정
            </th>
            <th className={'w-[130px] border border-gray-80 p-2'} rowSpan={2}>
              처리
            </th>
          </tr>
        </thead>

        <tbody className={'text-gray-0 font-pre-13-r-130'}>
          {data.map((item, index) => (
            <tr key={index} className={'bg-gray-100'}>
              <td className={'border p-2'}>{item.uniqueId}</td>
              <td className={'border p-2'}>{dayjs(item.joinDate).format('YYYY.MM.DD HH:mm')}</td>
              <td className={'border p-2'}>{item.loginId}</td>
              <td className={'border p-2'}>{item.phoneNumber}</td>
              <td className={'border p-2'}>{item.codeName}</td>
              <td className={'border p-2'}>{item.partnerName}</td>
              <td className={'border p-2'}>{item.bankName}</td>
              <td className={'border p-2'}>{item.accountName}</td>
              <td className={'border p-2'}>{item.accountNumber}</td>
              <td className={`border p-2 ${Number(item.memberStatus) === 3 ? 'text-red-50' : 'text-gray-0'} `}>
                {covertMemberJoinProgress(Number(item.memberStatus))}
              </td>
              <td className={'w-20 h-[52px] border p-2'}>
                {Number(item.memberStatus) === 3 && (
                  <button className={'text-gray-100 bg-gray-80 px-3 py-2 rounded-lg font-pre-13-m-13'} disabled>
                    수정
                  </button>
                )}

                {Number(item.memberStatus) !== 3 && (
                  <Link
                    className={'border border-gray-70 bg-gray-100 px-3 py-2 rounded-lg text-gray-0 font-pre-13-m-130'}
                    href={ROUTES.ADMIN.USER_MANAGE.GENERAL_USER_DETAIL(item.id)}
                  >
                    수정
                  </Link>
                )}
              </td>
              <td className={'w-20 h-[52px] border p-2'}>
                <div className={'flex flex-row gap-[10px]'}>
                  {Number(item.memberStatus) === 3 && (
                    <div
                      className={
                        'mx-auto flex justify-center items-center h-8 px-3 rounded-[8px] bg-gray-80 text-gray-100 font-pre-13-m-130'
                      }
                    >
                      처리 완료
                    </div>
                  )}

                  {Number(item.memberStatus) !== 3 && (
                    <>
                      <button
                        className={
                          'border border-primary-50 bg-gray-100 px-3 py-2 rounded-lg text-primary-50 font-pre-13-m-130'
                        }
                        onClick={() => {
                          setShowConfirmParams({
                            isOpen: true,
                            onClose: () => setShowConfirmParams((prev) => ({ ...prev, isOpen: false })),
                            onConfirm() {
                              consentSignup(item.id);
                              setShowConfirmParams((prev) => ({ ...prev, isOpen: false }));
                            },
                            icon: <IconLine24RoundWarning />,
                            title: '회원 가입 승인',
                            content: '해당 회원을 가입 승인 처리 합니다.\n계속 진행하시겠습니까?',
                          });
                        }}
                      >
                        승인
                      </button>

                      <button
                        className={
                          'border border-red-50 bg-gray-100 px-3 py-2 rounded-lg text-red-50 font-pre-13-m-130'
                        }
                        onClick={() => {
                          setShowConfirmParams({
                            isOpen: true,
                            onClose: () => setShowConfirmParams((prev) => ({ ...prev, isOpen: false })),
                            onConfirm() {
                              rejectSignup(item.id);
                              setShowConfirmParams((prev) => ({ ...prev, isOpen: false }));
                            },
                            icon: <IconLine24RoundWarning />,
                            iconColor: 'red',
                            title: '회원 가입 거절',
                            content: '해당 회원을 가입 거절 처리 합니다.\n계속 진행하시겠습니까?',
                          });
                        }}
                        disabled={Number(item.memberStatus) === 3}
                      >
                        거절
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmModal {...showConfirmParams} />
    </>
  );
}
