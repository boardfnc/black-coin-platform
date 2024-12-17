import Link from 'next/link';

import type { ITransactionFeeHistoryTableProps } from './TransactionFeeHistoryTable.types';

import { useAuthor } from '@/components/atoms/provider/AdminProvider';
import { ROUTES } from '@/constants';
import { dayjs } from '@/utils';
import { convertDealStatus, convertMembershipGrade } from '@/utils/covert';

export default function TransactionFeeHistoryTable({ data }: ITransactionFeeHistoryTableProps) {
  const { isSuperAdmin } = useAuthor();

  if (!data) return null;

  return (
    <table className={'w-full border-collapse text-center'}>
      <thead className={'text-gray-20 font-pre-13-m-130'}>
        <tr className={'bg-gray-99'}>
          <th className={'h-[52px] border border-gray-80 p-2'} rowSpan={2}>
            NO.
          </th>
          {isSuperAdmin && (
            <>
              <th className={'border border-gray-80 p-2'} rowSpan={2}>
                파트너사명
              </th>
              <th className={'border border-gray-80 p-2'} rowSpan={2}>
                코드명(회원명)
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
            회원명
          </th>
          <th className={'w-[160px] border border-gray-80 p-2'} rowSpan={2}>
            날짜
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            거래번호
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            구분
          </th>
          <th className={'border border-gray-80 p-2'} colSpan={3}>
            수수료
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            {isSuperAdmin ? 'CA 코인 잔액' : '수수료 잔액'}
          </th>
          {isSuperAdmin && (
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              수수료 잔액
            </th>
          )}
        </tr>
        <tr className={'bg-gray-90'}>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            건당 수수료
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            판매 수수료
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            구매 수수료
          </th>
        </tr>
      </thead>

      <tbody className={'text-gray-0 font-pre-13-r-130'}>
        {data.map((item, index) => (
          <tr key={index} className={'bg-gray-100'}>
            <td className={'h-12 border p-2'}>{item.uniqueId}</td>
            {isSuperAdmin && (
              <>
                <td className={'border p-2'}>
                  <Link
                    className={'text-primary-50 underline'}
                    href={ROUTES.ADMIN.USER_MANAGE.USER_DETAIL(item.managerId)}
                  >
                    {item.partnerName}
                  </Link>
                </td>
                <td className={'border p-2'}>{item.codeName}</td>
              </>
            )}
            <td className={'border p-2'}>{convertMembershipGrade(Number(item.authorRank))}</td>
            <td className={'border p-2'}>
              <Link
                className={'text-primary-50 underline'}
                href={ROUTES.ADMIN.USER_MANAGE.GENERAL_USER_DETAIL(item.memberId)}
              >
                {item.loginId}
              </Link>
            </td>
            <td className={'border p-2'}>{item.authorName}</td>
            <td className={'border p-2'}>{dayjs(item.date).format('YYYY.MM.DD HH:mm:ss')}</td>
            <td className={'border p-2'}>{item.tradeNumber}</td>
            <td className={'border p-2'}>{convertDealStatus(item.type)}</td>
            <td className={'border p-2'}>{item.perFee ? item.perFee.toLocaleString('ko-KR') : '-'}</td>
            <td className={'border p-2'}>
              {item.type === '1' && item.sellFee ? item.sellFee.toLocaleString('ko-KR') : '-'}
            </td>
            <td className={'border p-2'}>
              {item.type === '2' && item.buyFee ? item.buyFee.toLocaleString('ko-KR') : '-'}
            </td>
            <td className={'border p-2'}>{item.caCoin ? item.caCoin.toLocaleString('ko-KR') : '-'}</td>
            {isSuperAdmin && (
              <td className={'border p-2'}>{item.feeBalance ? item.feeBalance.toLocaleString('ko-KR') : '-'}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
