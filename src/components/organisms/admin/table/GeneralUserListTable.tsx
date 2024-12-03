import Link from 'next/link';

import { useState } from 'react';

import UserListCoinModal from '../modal/UserListCoinModal';

import type { IUserListTableProps } from './GeneralUserListTable.types';
import type { ICoinSendData } from '../modal/UserListCoinModal.types';

import { useAuthor } from '@/components/atoms/provider/AdminProvider';
import { ROUTES } from '@/constants';
import { convertMembershipGrade, convertMembershipStatus } from '@/utils/covert';

export default function GeneralUserListTable({ data, refetch }: IUserListTableProps) {
  const { isSuperAdmin } = useAuthor();
  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false);
  const [coinModalData, setCoinModalData] = useState<ICoinSendData>({
    memberId: 0,
    coin: 0,
    mode: 'payment',
  });

  if (!data) return null;

  return (
    <>
      <table className={'w-full border-collapse text-center'}>
        <thead className={'text-gray-20 font-pre-13-m-130'}>
          <tr className={'bg-gray-99'}>
            <th className={'h-[48px] border border-gray-80 p-2'} rowSpan={2}>
              NO.
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              가입일
            </th>
            {isSuperAdmin && (
              <>
                <th className={'border border-gray-80 p-2'} rowSpan={2}>
                  추천 파트너사명
                </th>
                <th className={'border border-gray-80 p-2'} rowSpan={2}>
                  코드명
                </th>
              </>
            )}
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              아이디
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              보유 코인
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              총 구매액
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              총 판매액
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              회원등급
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              마지막 접속일
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              접속 IP주소
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              회원상태
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              수정
            </th>
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              코인관리
            </th>
          </tr>
        </thead>

        <tbody className={'text-gray-0 font-pre-13-r-130'}>
          {data.map((item, index) => (
            <tr key={index} className={'bg-gray-100'}>
              <td className={'h-[52px] border p-2'}>{item.uniqueId}</td>
              <td className={'border p-2'}>{item.date}</td>
              {isSuperAdmin && (
                <>
                  <td className={'border p-2'}>{item.partnerName}</td>
                  <td className={'border p-2'}>{item.codeName}</td>
                </>
              )}
              <td className={'border p-2'}>{item.id}</td>
              <td className={'border p-2'}>{item.coin.toLocaleString('ko-KR')}</td>
              <td className={'border p-2'}>{item.purchaseCount.toLocaleString('ko-KR')}</td>
              <td className={'border p-2'}>{item.saleCount.toLocaleString('ko-KR')}</td>
              <td className={'border p-2'}>{convertMembershipGrade(Number(item.authorRank))}</td>
              <td className={'border p-2'}>{item.lastAccess}</td>
              <td className={'border p-2'}>{item.ipAddress}</td>
              <td className={'border p-2'}>{convertMembershipStatus(Number(item.authorStatus))}</td>
              <td className={'border p-2 w-[80px]'}>
                <Link
                  className={'h-[32px] text-gray-10 border rounded-lg border-gray-70 p-2'}
                  href={ROUTES.ADMIN.USER_MANAGE.GENERAL_USER_DETAIL(item.memberId)}
                >
                  수정
                </Link>
              </td>
              <td className={'border p-2 w-[130px]'}>
                <div className={'flex gap-1.5'}>
                  <button
                    className={'w-[50px] h-[32px] border text-red-50 border-red-50 rounded-lg'}
                    onClick={() => {
                      setIsCoinModalOpen(true);
                      setCoinModalData({ memberId: item.memberId, coin: item.coin, mode: 'retrieval' });
                    }}
                  >
                    회수
                  </button>
                  <button
                    className={'w-[50px] h-[32px] border text-primary-50 border-primary-50 rounded-lg'}
                    onClick={() => {
                      setIsCoinModalOpen(true);
                      setCoinModalData({ memberId: item.memberId, coin: item.coin, mode: 'payment' });
                    }}
                  >
                    잔금
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!isSuperAdmin && (
        <UserListCoinModal
          isOpen={isCoinModalOpen}
          onClose={() => setIsCoinModalOpen(false)}
          refetch={refetch}
          {...coinModalData}
        />
      )}
    </>
  );
}
