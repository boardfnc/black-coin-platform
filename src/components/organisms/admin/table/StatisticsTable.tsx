import type { IStatisticsTableProps } from './StatisticsTable.types';

import { useAuthor } from '@/components/atoms/provider/AdminProvider';

export default function StatisticsTable({ data }: IStatisticsTableProps) {
  const { isSuperAdmin } = useAuthor();

  if (!data) return null;

  return (
    <table className={'w-full border-collapse text-center'}>
      <thead className={'text-gray-20 font-pre-13-m-130'}>
        <tr className={'bg-gray-99'}>
          <th className={'h-12 border border-gray-80 p-2'} rowSpan={2}>
            날짜
          </th>
          {isSuperAdmin && (
            <th className={'border border-gray-80 p-2'} rowSpan={2}>
              파트너사명
            </th>
          )}
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            총 구매건수
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            총 구매코인
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            총 판매건수
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            총 판매코인
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            회수코인
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            건당 수수료 총합
          </th>
          <th className={'h-6 border border-gray-80 p-2'} colSpan={2}>
            이용 수수료
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            합계
          </th>
        </tr>
        <tr className={'bg-gray-90'}>
          <th className={'h-6 border border-gray-80 p-2'}>구매건</th>
          <th className={'border border-gray-80 p-2'}>판매건</th>
        </tr>
      </thead>

      <tbody className={'text-gray-0 font-pre-13-r-130'}>
        {data.map((item, index) => (
          <tr key={index} className={'bg-gray-100'}>
            <td className={'h-12 border p-2'}>{item.date}</td>
            {isSuperAdmin && <td className={'border p-2'}>{item.partnerName}</td>}
            <td className={'border p-2'}>{item.totalPurchaseCount.toLocaleString('ko-KR')}</td>
            <td className={'border p-2'}>{item.totalPurchaseCoin.toLocaleString('ko-KR')}</td>
            <td className={'border p-2'}>{item.totalSaleCount.toLocaleString('ko-KR')}</td>
            <td className={'border p-2'}>{item.totalSaleCoin.toLocaleString('ko-KR')}</td>
            <td className={'border p-2'}>{item.recoveredCoin.toLocaleString('ko-KR')}</td>
            <td className={'border p-2'}>{item.totalFeePerCase.toLocaleString('ko-KR')}</td>
            <td className={'border p-2'}>{item.purchaseFee.toLocaleString('ko-KR')}</td>
            <td className={'border p-2'}>{item.saleFee.toLocaleString('ko-KR')}</td>
            <td className={'border p-2'}>{item.total.toLocaleString('ko-KR')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
