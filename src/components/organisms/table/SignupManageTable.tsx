import type { ISignupManageTableProps } from './SignupManageTable.types';

export default function SignupManageTable({ data }: ISignupManageTableProps) {
  if (!data) return null;

  return (
    <table className={'w-full border-collapse text-center'}>
      <thead className={'text-gray-20 font-pre-13-m-130'}>
        <tr className={'bg-gray-99'}>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            날짜
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
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
          <th className={'border border-gray-80 p-2'} colSpan={2}>
            계좌번호
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            상태
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            수령
          </th>
          <th className={'border border-gray-80 p-2'} rowSpan={2}>
            처리
          </th>
        </tr>
      </thead>

      <tbody className={'text-gray-0 font-pre-13-r-130'}>
        {data.map((item, index) => (
          <tr key={index} className={'bg-gray-100'}>
            <td className={'border p-2'}>{item.date}</td>
            <td className={'border p-2'}>{item.partnerName}</td>
            <td className={'border p-2'}>{item.totalPurchaseCount}</td>
            <td className={'border p-2'}>{item.totalPurchaseCoin}</td>
            <td className={'border p-2'}>{item.totalSaleCount}</td>
            <td className={'border p-2'}>{item.totalSaleCoin}</td>
            <td className={'border p-2'}>{item.recoveredCoin}</td>
            <td className={'border p-2'}>{item.totalFeePerCase}</td>
            <td className={'border p-2'}>{item.purchaseFee}</td>
            <td className={'border p-2'}>{item.saleFee}</td>
            <td className={'border p-2'}>{item.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
