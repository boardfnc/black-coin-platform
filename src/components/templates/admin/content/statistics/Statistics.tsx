'use client';

import { useSearchParams } from 'next/navigation';

import { useCallback } from 'react';

import type { IStatisticsTableData } from '@/components/organisms/table/StatisticsTable.types';
import type { IAdminDatesRequest } from '@/services/statistics/adminDates.types';

import { AdminHeadline } from '@/components/atoms/headlines';
import { Select } from '@/components/atoms/inputs';
import { useAuthor } from '@/components/atoms/provider/AdminProvider';
import { Filter } from '@/components/organisms/filter';
import { Pagination, GoToPage } from '@/components/organisms/pagination';
import StatisticsTable from '@/components/organisms/table/StatisticsTable';
import { useFetch } from '@/hooks';
import { adminDatesService } from '@/services/statistics/adminDates';
import { datesService } from '@/services/statistics/dates';

export default function Statistics() {
  const searchParams = useSearchParams();
  const { isSuperAdmin } = useAuthor();

  const filterSelect = {
    visible: isSuperAdmin,
    options: [
      {
        label: '파트너사',
        value: 'prtnr_nm',
      },
      {
        label: '코드',
        value: 'code',
      },
    ],
  };

  const page = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('view') ?? 15);

  const fetchStatistics = useCallback(
    () =>
      isSuperAdmin
        ? adminDatesService({
            page,
            per_page: perPage,
            search_keyword: searchParams.get('search') || undefined,
            search_type: searchParams.get('searchType') as IAdminDatesRequest['search_type'],
            stats_de_start: searchParams.get('startDate') || undefined,
            stats_de_end: searchParams.get('endDate') || undefined,
          })
        : datesService({
            page,
            per_page: perPage,

            stats_de_start: searchParams.get('startDate') || undefined,
            stats_de_end: searchParams.get('endDate') || undefined,
          }),
    [searchParams, page, perPage, isSuperAdmin],
  );

  const { data } = useFetch(fetchStatistics);

  const statisticsData = data?.data?.map(
    (item, index) =>
      ({
        uniqueId: page * perPage - (perPage - 1) + index,
        date: item.stats_de,
        partnerName: ('prtnr_nm' in item && typeof item.prtnr_nm === 'string' && item.prtnr_nm) || undefined,
        totalPurchaseCount: item.purchs_co,
        totalPurchaseCoin: item.purchs_qy,
        totalSaleCount: item.sle_co,
        totalSaleCoin: item.sle_qy,
        recoveredCoin: item.rirvl_qy,
        totalFeePerCase: item.csby_fee_am,
        purchaseFee: item.purchs_fee_am,
        saleFee: item.sle_fee_am,
        total: item.purchs_co - (item.sle_co + item.hold_qy) - item.csby_fee_am - item.purchs_fee_am - item.sle_fee_am,
      }) satisfies IStatisticsTableData,
  );

  const dataTotalLength = data?.pagination?.total ?? 0;
  const dataTotalPageCount = data?.pagination?.total_pages ?? 0;

  return (
    <div className={'w-full h-full bg-gray-100'}>
      <div className={'flex flex-col gap-5'}>
        <AdminHeadline title={'날짜 별 통계'} subTitle={'날짜 별 통계'} />

        <div className={'flex flex-col gap-8 mx-4'}>
          <Filter search={{ visible: isSuperAdmin }} select={filterSelect} />

          <div className={'flex gap-3 flex-col justify-center items-start text-gray-0 font-pre-16-m-130'}>
            <div className={'flex w-full justify-between items-center'}>
              <div className={'flex gap-1'}>
                <span className={'text-gray-0 font-pre-16-r-130'}>목록</span>
                <span className={'text-primary-50 font-pre-16-m-130'}>{dataTotalLength}</span>
              </div>

              <div className={'flex gap-1'}>
                <Select />
              </div>
            </div>

            <StatisticsTable data={statisticsData} />

            <div className={'w-full flex justify-center items-center gap-3'}>
              <Select />

              <Pagination totalPage={dataTotalPageCount} />

              <GoToPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
