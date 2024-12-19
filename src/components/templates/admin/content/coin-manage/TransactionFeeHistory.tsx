'use client';

import { useSearchParams } from 'next/navigation';

import { useCallback } from 'react';

import type { ITransactionFeeHistoryTableData } from '@/components/organisms/admin/table/TransactionFeeHistoryTable.types';
import type { IAdminReceivedDetailsRequest } from '@/services/admin/coin/adminReceived.types';
import type { ICoinDealingsFeeDetailsRequest } from '@/services/admin/coin/coin.types';

import { AdminHeadline } from '@/components/atoms/headlines';
import { Select } from '@/components/atoms/inputs';
import { useAuthor } from '@/components/atoms/provider/AdminProvider';
import { Filter } from '@/components/organisms/admin/filter';
import { Pagination, GoToPage } from '@/components/organisms/admin/pagination';
import TransactionFeeHistoryTable from '@/components/organisms/admin/table/TransactionFeeHistoryTable';
import { useFetch } from '@/hooks';
import { adminManagerDetailsService } from '@/services/admin/coin/adminDealings';
import { coinDealingsFeeDetailsService } from '@/services/admin/coin/coin';

const filterSelect = {
  options: [
    {
      label: '거래번호',
      value: 'delng_no',
    },
    {
      label: '파트너사명',
      value: 'prtnr_nm',
    },
    {
      label: '코드',
      value: 'code',
    },
    {
      label: '회원명',
      value: 'nm',
    },
    {
      label: '아이디',
      value: 'login_id',
    },
  ],
};

const checkboxSuperAdminOptions = [
  {
    label: '전체',
    value: '0',
  },
  {
    label: 'VVIP',
    value: '1',
  },
  {
    label: 'VIP',
    value: '2',
  },
  {
    label: '일반회원',
    value: '3',
  },
  {
    label: '신규회원',
    value: '4',
  },
  {
    label: '등급없음(CA)',
    value: '5',
  },
];

const checkboxAdminOptions = [
  {
    label: '전체',
    value: '0',
  },
  {
    label: 'VVIP',
    value: '1',
  },
  {
    label: 'VIP',
    value: '2',
  },
  {
    label: '일반회원',
    value: '3',
  },
  {
    label: '신규회원',
    value: '4',
  },
];

const subCheckbox = {
  text: '구분',
  options: [
    {
      label: '전체',
      value: '0',
    },
    {
      label: '판매',
      value: '1',
    },
    {
      label: '구매',
      value: '2',
    },
    {
      label: '정산',
      value: '3',
    },
  ],
};

export default function TransactionFeeHistory() {
  const { isSuperAdmin } = useAuthor();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('view') ?? 15);

  const fetchTransactionFeeHistory = useCallback(
    () =>
      isSuperAdmin
        ? adminManagerDetailsService({
            search_keyword: searchParams.get('search') || undefined,
            search_type: searchParams.get('searchType') as IAdminReceivedDetailsRequest['search_type'],
            created_at_start: searchParams.get('startDate') || undefined,
            created_at_end: searchParams.get('endDate') || undefined,
            mber_grd: searchParams.get('status')?.split(',') || undefined,
            delng_se: searchParams.get('subStatus')?.split(',') || undefined,
            orderby: searchParams.get('order')?.split(',') || undefined,
            page: Number(searchParams.get('page') ?? 1),
            per_page: Number(searchParams.get('view') ?? 15),
          })
        : coinDealingsFeeDetailsService({
            search_keyword: searchParams.get('search') || undefined,
            search_type: searchParams.get('searchType') as ICoinDealingsFeeDetailsRequest['search_type'],
            created_at_start: searchParams.get('startDate') || undefined,
            created_at_end: searchParams.get('endDate') || undefined,
            mber_grd: searchParams.get('status')?.split(',') || undefined,
            delng_se: searchParams.get('subStatus')?.split(',') || undefined,
            orderby: searchParams.get('order')?.split(',') || undefined,
            page: Number(searchParams.get('page') ?? 1),
            per_page: Number(searchParams.get('view') ?? 15),
          }),
    [searchParams, isSuperAdmin],
  );

  const { data } = useFetch(fetchTransactionFeeHistory);

  const checkbox = {
    text: '회원 등급',
    options: isSuperAdmin ? checkboxSuperAdminOptions : checkboxAdminOptions,
  };

  const statisticsData = data?.data?.map(
    (item, index) =>
      ({
        uniqueId: page * perPage - (perPage - 1) + index,
        memberId: item.mber_id,
        managerId: item.mngr_id,
        codeName: ('code' in item && typeof item.code === 'string' && item.code) || '',
        partnerName: ('prtnr_nm' in item && typeof item.prtnr_nm === 'string' && item.prtnr_nm) || '',
        authorRank: item.mber_grd,
        loginId: item.login_id,
        authorName: item.nm,
        date: item.created_at,
        tradeNumber: item.delng_no,
        type: item.delng_se,
        perFee: item.csby_fee,
        sellFee: item.sle_fee,
        buyFee: item.purchs_fee,
        caCoin: item.ca_coin_blce || 0,
        feeBalance: item.fee_blce || 0,
      }) satisfies ITransactionFeeHistoryTableData,
  );

  const statisticsDataTotalLength = data?.pagination?.total ?? 0;
  const statisticsDataTotalPageCount = data?.pagination?.total_pages ?? 0;

  return (
    <div className={'w-full h-full bg-gray-100'}>
      <div className={'flex flex-col gap-5'}>
        <AdminHeadline
          title={'거래 수수료 내역'}
          subTitle={isSuperAdmin ? ['코인 관리', '거래 수수료 내역'] : ['내 코인 관리', '거래 수수료 내역']}
        />

        <div className={'flex flex-col gap-8 mx-4'}>
          <Filter select={filterSelect} checkbox={checkbox} subCheckbox={subCheckbox} />

          <div className={'flex gap-3 flex-col justify-center items-start text-gray-0 font-pre-16-m-130'}>
            <div className={'flex w-full justify-between items-center'}>
              <div className={'flex gap-1'}>
                <span className={'text-gray-0 font-pre-16-r-130'}>목록</span>
                <span className={'text-primary-50 font-pre-16-m-130'}>{statisticsDataTotalLength}</span>
              </div>

              <div className={'flex gap-1'}>
                <Select />
              </div>
            </div>

            <TransactionFeeHistoryTable data={statisticsData} />

            <div className={'w-full flex justify-center items-center gap-3'}>
              <Select />

              <Pagination totalPage={statisticsDataTotalPageCount} />

              <GoToPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
