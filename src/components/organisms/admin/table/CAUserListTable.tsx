import Link from 'next/link';

import type { ICAUserListTableProps } from './CAUserListTable.types';

import { ROUTES } from '@/constants';
import { dayjs, formatPhoneNumber } from '@/utils';
import { convertMembershipStatus } from '@/utils/covert';

export default function CAUserListTable({ data }: ICAUserListTableProps) {
  if (!data) return null;

  return (
    <table className={'w-full border-collapse text-center'}>
      <thead className={'text-gray-20 font-pre-13-m-130'}>
        <tr className={'bg-gray-99'}>
          <th className={'h-12 border border-gray-80 p-2'} rowSpan={2}>
            NO.
          </th>
          <th className={'w-[100px] border border-gray-80 p-2'} rowSpan={2}>
            가입일
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            아이디
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            파트너사명
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            코드명
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            담당자연락처
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
            사이트주소
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            건당 수수료
          </th>
          <th className={'border border-gray-80 p-2'} colSpan={2}>
            이용 수수료
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            회원 상태
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            수정
          </th>
        </tr>
        <tr className={'bg-gray-90'}>
          <th className={'border border-gray-80 p-2'}>구매건</th>
          <th className={'border border-gray-80 p-2'}>판매건</th>
        </tr>
      </thead>

      <tbody className={'text-gray-0 font-pre-13-r-130'}>
        {data.map((item) => (
          <tr key={item.uniqueId} className={'bg-gray-100'}>
            <td className={'h-[52px] border p-2'}>{item.uniqueId}</td>
            <td className={'border p-2'}>{dayjs(item.date).format('YYYY.MM.DD')}</td>
            <td className={'border p-2'}>{item.id}</td>
            <td className={'border p-2'}>{item.partnerName}</td>
            <td className={'border p-2'}>{item.codeName}</td>
            <td className={'border p-2'}>{formatPhoneNumber(item.phoneNumber)}</td>
            <td className={'border p-2'}>{item.coin.toLocaleString('ko-KR')}</td>
            <td className={'border p-2'}>{item.purchaseCount.toLocaleString('ko-KR')}</td>
            <td className={'border p-2'}>{item.saleCount.toLocaleString('ko-KR')}</td>
            <td className={'text-primary-50 underline border p-2'}>
              <a
                href={item.siteUrl.startsWith('http') ? item.siteUrl : `https://${item.siteUrl}`}
                target={'_blank'}
                rel={'noreferrer'}
              >
                {item.siteUrl}
              </a>
            </td>
            <td className={'border p-2'}>{item.charge.toLocaleString('ko-KR') + '원'}</td>
            <td className={'border p-2'}>{item.purchaseFee + '%'}</td>
            <td className={'border p-2'}>{item.saleFee + '%'}</td>
            <td className={'border p-2'}>{convertMembershipStatus(Number(item.authorStatus))}</td>
            <td className={'border p-2'}>
              <Link
                className={'h-8 text-gray-10 border rounded-lg border-gray-70 p-2'}
                href={ROUTES.ADMIN.USER_MANAGE.USER_DETAIL(item.managerId)}
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
