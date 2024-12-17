import Link from 'next/link';

import type { ISentDetailTableProps } from './SentDetailTable.types';

import { useAuthor } from '@/components/atoms/provider/AdminProvider';
import { ROUTES } from '@/constants';
import { dayjs } from '@/utils';
import { convertMembershipGrade } from '@/utils/covert';

export default function SentDetailTable({ data }: ISentDetailTableProps) {
  const { isSuperAdmin } = useAuthor();

  if (!data) return null;

  return (
    <table className={'w-full border-collapse text-center'}>
      <thead className={'text-gray-20 font-pre-13-m-130'}>
        <tr className={'bg-gray-99'}>
          <th className={'h-[52px] border border-gray-80 p-2'} rowSpan={2}>
            NO.
          </th>
          {!isSuperAdmin && (
            <th className={'w-[100px] border border-gray-80 p-2'} rowSpan={2}>
              교환일
            </th>
          )}
          {isSuperAdmin && (
            <>
              <th className={'border border-gray-80 p-2'} rowSpan={2}>
                파트너사명
              </th>
              <th className={'border border-gray-80 p-2'} rowSpan={2}>
                코드명
              </th>
              <th className={'w-[100px] border border-gray-80 p-2'} rowSpan={2}>
                교환일
              </th>
              <th className={'border border-gray-80 p-2'} rowSpan={2}>
                파트너사 코인잔액
              </th>
            </>
          )}
          {!isSuperAdmin && (
            <>
              <th className={'border border-gray-80 p-2'} rowSpan={2}>
                내 코인 잔액
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
          {isSuperAdmin && (
            <>
              <th className={'border border-gray-80 p-2'} rowSpan={2}>
                보낸 머니수량
              </th>
              <th className={'border border-gray-80 p-2'} rowSpan={2}>
                받은 코인수량
              </th>
            </>
          )}
          {!isSuperAdmin && (
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              받은 머니수량
            </th>
          )}
          {!isSuperAdmin && (
            <>
              <th className={'border border-gray-80 p-2'} rowSpan={2}>
                지급 코인수량
              </th>
              <th className={'border border-gray-80 p-2'} rowSpan={2}>
                회원 머니잔액
              </th>
            </>
          )}
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            회원 코인잔액
          </th>
        </tr>
      </thead>

      <tbody className={'text-gray-0 font-pre-13-r-130'}>
        {data.map((item, index) => (
          <tr key={index} className={'bg-gray-100'}>
            <td className={'h-12 border p-2'}>{item.uniqueId}</td>
            <td className={'border p-2'}>
              <Link className={'text-primary-50 underline'} href={ROUTES.ADMIN.USER_MANAGE.USER_DETAIL(item.partnerId)}>
                {item.partnerName}
              </Link>
            </td>
            <td className={'border p-2'}>{item.codeName}</td>
            <td className={'border p-2'}>
              <div className={'flex flex-col gap-[2px]'}>
                <div>{dayjs(item.tradeDate).format('YYYY.MM.DD')}</div>
                <div>{dayjs(item.tradeDate).format('HH:mm:ss')}</div>
              </div>
            </td>
            <td className={'border p-2'}>{item.partnerCoin.toLocaleString('ko-KR')}</td>
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
            <td className={'border p-2'}>{item.sendCoin ? item.sendCoin.toLocaleString('ko-KR') : '-'}</td>
            <td className={'border p-2'}>{item.receiveCoin ? item.receiveCoin.toLocaleString('ko-KR') : '-'}</td>
            <td className={'border p-2'}>{item.coin ? item.coin.toLocaleString('ko-KR') : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
