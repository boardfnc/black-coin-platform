import Link from 'next/link';

import type { IGradeManageTableProps } from './GradeManageTable.types';

import { ROUTES } from '@/constants';
import { convertMemberGradeStandard } from '@/utils/covert';

export default function GradeManageTable({ data }: IGradeManageTableProps) {
  if (!data) return null;

  console.log(data);

  return (
    <table className={'w-full border-collapse text-center'}>
      <thead className={'text-gray-20 font-pre-13-m-130'}>
        <tr className={'bg-gray-99'}>
          <th className={'h-[48px] border border-gray-80 p-2'} rowSpan={2}>
            NO.
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            파트너사명
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            코드명
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            회원수
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            등급산출기준
          </th>
          <th className={'border border-gray-80 p-2'} colSpan={4}>
            등급별 기준
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            수정
          </th>
        </tr>
        <tr className={'bg-gray-90'}>
          <th className={'border border-gray-80 p-2'}>VVIP</th>
          <th className={'border border-gray-80 p-2'}>VIP</th>
          <th className={'border border-gray-80 p-2'}>일반</th>
          <th className={'border border-gray-80 p-2'}>신규</th>
        </tr>
      </thead>

      <tbody className={'text-gray-0 font-pre-13-r-130'}>
        {data.map((item, index) => (
          <tr key={index} className={'bg-gray-100'}>
            <td className={'h-[52px] border p-2'}>{item.uniqueId}</td>
            <td className={'border p-2'}>{item.partnerName}</td>
            <td className={'border p-2'}>{item.codeName}</td>
            <td className={'border p-2'}>{item.memberCount.toLocaleString('ko-KR')}</td>
            <td className={'border p-2'}>{convertMemberGradeStandard(item.memberRank)}</td>
            <td className={'border p-2'}>
              {item.vvipStandard != null ? item.vvipStandard.toLocaleString('ko-KR') : '-'}
            </td>
            <td className={'border p-2'}>
              {item.vipStandard != null ? item.vipStandard.toLocaleString('ko-KR') : '-'}
            </td>
            <td className={'border p-2'}>
              {item.generalStandard != null ? item.generalStandard.toLocaleString('ko-KR') : '-'}
            </td>
            <td className={'border p-2'}>
              {item.newStandard != null ? item.newStandard.toLocaleString('ko-KR') : '-'}
            </td>
            <td className={'border p-2 w-20'}>
              <Link
                href={ROUTES.ADMIN.USER_MANAGE.GRADE_MANAGE_DETAIL(item.managerId, {
                  type: item.memberRank,
                  VVIP: item.vvipStandard?.toString(),
                  VIP: item.vipStandard?.toString(),
                  general: item.generalStandard?.toString(),
                })}
                className={'text-gray-0 font-pre-13-m-130 border border-gray-70 rounded-lg p-2 px-3'}
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
