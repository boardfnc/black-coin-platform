import Link from 'next/link';

import type { IWithdrawalListTableProps } from './WithdrawalListTable.types';

import { useAuthor } from '@/components/atoms/provider/AdminProvider';
import { ROUTES } from '@/constants';
import { dayjs } from '@/utils';
import { convertMembershipGrade, convertMembershipStatus } from '@/utils/covert';

export default function WithdrawalListTable({ data }: IWithdrawalListTableProps) {
  const { isSuperAdmin } = useAuthor();

  if (!data) return null;

  return (
    <table className={'w-full border-collapse text-center'}>
      <thead className={'text-gray-20 font-pre-13-m-130'}>
        <tr className={'bg-gray-99'}>
          <th className={'h-[48px] border border-gray-80 p-2'} rowSpan={2}>
            NO.
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
            회원등급
          </th>
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
            회수자 아이디
          </th>
          <th className={'w-[120px] border border-gray-80 p-2'} rowSpan={2}>
            회수일
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            회수 코인
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            회원상태
          </th>
          <th className={'w-[80px] border border-gray-80 p-2'} rowSpan={2}>
            수정
          </th>
        </tr>
      </thead>

      <tbody className={'text-gray-0 font-pre-13-r-130'}>
        {data.map((item, index) => (
          <tr key={index} className={'bg-gray-100'}>
            <td className={'border p-2'}>{item.uniqueId}</td>

            {isSuperAdmin && (
              <>
                <td className={'border p-2'}>{item.partnerName}</td>
                <td className={'border p-2'}>{item.codeName}</td>
              </>
            )}
            <td className={'border p-2'}>{convertMembershipGrade(Number(item.memberRank))}</td>
            <td className={'border p-2'}>{item.loginId}</td>
            <td className={'border p-2'}>{item.coin.toLocaleString('ko-KR')}</td>
            <td className={'border p-2'}>{item.purchaseCount.toLocaleString('ko-KR')}</td>
            <td className={'border p-2'}>{item.saleCount.toLocaleString('ko-KR')}</td>
            <td className={'border p-2'}>{item.returnMemberId}</td>
            <td className={'border p-2'}>{dayjs(item.returnDate).format('YYYY.MM.DD HH:mm')}</td>
            <td className={'border p-2'}>{item.returnCoin.toLocaleString('ko-KR')}</td>
            <td className={`border p-2 ${Number(item.memberStatus) === 2 ? 'text-red-50' : 'text-gray-0'} `}>
              {convertMembershipStatus(Number(item.memberStatus))}
            </td>
            <td className={'w-[80px] h-[52px] border p-2'}>
              <Link
                className={'border border-gray-70 bg-gray-100 px-3 py-2 rounded-lg text-gray-0 font-pre-13-m-130'}
                href={ROUTES.ADMIN.USER_MANAGE.GENERAL_USER_DETAIL(item.id)}
              >
                수정
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
