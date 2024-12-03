'use client';

import { useSearchParams } from 'next/navigation';

import { useCallback } from 'react';

import type { ITransactionHistoryMyTradeTableData } from '@/components/organisms/admin/table/TransactionHistoryMyTrade.types';
import type { IAdminManagerDetailsRequest } from '@/services/dealings/adminManager.types';

import { AdminHeadline } from '@/components/atoms/headlines';
import { Select } from '@/components/atoms/inputs';
import { useAuthor } from '@/components/atoms/provider/AdminProvider';
import { Filter } from '@/components/organisms/admin/filter';
import { Pagination, GoToPage } from '@/components/organisms/admin/pagination';
import { TransactionHistoryMyTradeTable } from '@/components/organisms/admin/table';
import { useFetch } from '@/hooks';
import { dealingsManagerDetailsService } from '@/services/dealings/dealings';

const category = {
  text: '거래구분/상태',
  options: [
    {
      value: '2',
      label: '구매',
      children: [
        {
          value: '11',
          label: '구매신청',
        },
        {
          value: '12',
          label: '구매대기',
        },
        {
          value: '13',
          label: '구매완료',
        },
        {
          value: '14',
          label: '구매취소',
        },
      ],
    },
    {
      value: '1',
      label: '판매',
      children: [
        {
          value: '21',
          label: '판매 신청',
        },
        {
          value: '22',
          label: '판매대기',
        },
        {
          value: '23',
          label: '판매완료',
        },
        {
          value: '24',
          label: '판매취소',
        },
      ],
    },
    {
      value: '4',
      label: '취소',
    },
  ],
};

export default function MyTrade() {
  const { isSuperAdmin } = useAuthor();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('view') ?? 15);

  const fetchManagerDetails = useCallback(
    () =>
      dealingsManagerDetailsService({
        page,
        per_page: perPage,
        search_keyword: searchParams.get('search') || undefined,
        search_type: searchParams.get('searchType') as IAdminManagerDetailsRequest['search_type'],
        delng_se: searchParams.get('primaryCategory') || undefined,
        delng_sttus: searchParams.get('secondaryCategory')?.split(',') || undefined,
        created_at_start: searchParams.get('startDate') || undefined,
        created_at_end: searchParams.get('endDate') || undefined,
      }),
    [searchParams, page, perPage],
  );

  const { data } = useFetch(fetchManagerDetails);

  const managerDetailsData = data?.data?.map(
    (item, index) =>
      ({
        uniqueId: page * perPage - (perPage - 1) + index,
        indexId: item.ca_delng_dtls_id,
        memberId: item.mngr_id,
        tradeNumber: item.delng_no,
        applyDate: item.created_at,
        type: item.delng_se,
        status: item.delng_sttus,
        purchasePrevCount: item.hold_qy,
        purchaseCount: item.delng_qy,
        completeDate: item.compt_dd || '-',
      }) satisfies ITransactionHistoryMyTradeTableData,
  );

  const statisticsDataTotalLength = data?.pagination?.total ?? 0;
  const statisticsDataTotalPageCount = data?.pagination?.total_pages ?? 0;

  if (isSuperAdmin) return null;

  return (
    <>
      <div className={'w-full h-full bg-gray-100'}>
        <div className={'flex flex-col gap-5'}>
          <AdminHeadline title={'CA 거래 내역'} subTitle={['거래 내역', 'CA 거래 내역']} />

          <div className={'flex flex-col gap-8 mx-4'}>
            <Filter
              date={{ text: isSuperAdmin ? '검색어' : '신청일' }}
              search={{ defaultSearchType: 'delng_no' }}
              select={{ text: isSuperAdmin ? '검색어' : '거래번호', visible: isSuperAdmin }}
              category={category}
            />

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

              <TransactionHistoryMyTradeTable data={managerDetailsData} />

              <div className={'w-full flex justify-center items-center gap-3'}>
                <Select />

                <Pagination totalPage={statisticsDataTotalPageCount} />

                <GoToPage />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
