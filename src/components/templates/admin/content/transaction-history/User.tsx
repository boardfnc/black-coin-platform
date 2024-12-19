'use client';

import { useSearchParams } from 'next/navigation';

import { useCallback } from 'react';

import type {} from '@/components/organisms/admin/table/TransactionHistoryCATable.types';
import type { ITransactionHistoryUserTableData } from '@/components/organisms/admin/table/TransactionHistoryUserTable.types';
import type { IAdminMemberDetailsRequest } from '@/services/admin/dealings/adminManager.types';

import { AdminHeadline } from '@/components/atoms/headlines';
import { Select } from '@/components/atoms/inputs';
import { Filter } from '@/components/organisms/admin/filter';
import { Pagination, GoToPage } from '@/components/organisms/admin/pagination';
import { TransactionHistoryUserTable } from '@/components/organisms/admin/table';
import { useFetch } from '@/hooks';
import { adminMemberDetailsService } from '@/services/admin/dealings/adminManager';

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
      label: '코드명',
      value: 'code',
    },
  ],
};

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

const checkbox = {
  text: '회원 등급',
  options: [
    {
      value: '0',
      label: '전체',
    },
    {
      value: '1',
      label: 'VVIP',
    },
    {
      value: '2',
      label: 'VIP',
    },
    {
      value: '3',
      label: '일반회원',
    },
    {
      value: '4',
      label: '신규회원',
    },
  ],
};

export default function TransactionHistoryUser() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('view') ?? 15);

  const fetchUserDetails = useCallback(
    () =>
      adminMemberDetailsService({
        page,
        per_page: perPage,
        search_keyword: searchParams.get('search') || undefined,
        search_type: searchParams.get('searchType') as IAdminMemberDetailsRequest['search_type'],
        delng_se: searchParams.get('primaryCategory') || undefined,
        delng_sttus: searchParams.get('secondaryCategory')?.split(',') || undefined,
        mber_grd: searchParams.get('status')?.split(',') || undefined,
        mngr_sttus: searchParams.get('mngrStatus') || undefined,
        created_at_start: searchParams.get('startDate') || undefined,
        created_at_end: searchParams.get('endDate') || undefined,
      }),
    [searchParams, page, perPage],
  );

  const { data } = useFetch(fetchUserDetails);

  const statisticsData = data?.data?.map(
    (item, index) =>
      ({
        uniqueId: page * perPage - (perPage - 1) + index,
        memberId: item.mber_id,
        indexId: item.mber_delng_dtls_id,
        tradeNumber: item.delng_no,
        applyDate: item.created_at,
        type: item.delng_se,
        status: item.delng_sttus,
        authorRank: item.mber_grd,
        partnerName: item.prtnr_nm,
        id: item.login_id,
        codeName: '',
        purchasePrevCount: item.hold_qy,
        purchaseCount: item.delng_qy,
        managerPhone: '',
        partnerUrl: '',
        bankName: item.rcpmny_bank,
        bankAccountName: item.rcpmny_dpstr,
        name: item.nm,
        bankAccountNumber: item.rcpmny_acnutno,
      }) satisfies ITransactionHistoryUserTableData,
  );

  const statisticsDataTotalLength = data?.pagination?.total ?? 0;
  const statisticsDataTotalPageCount = data?.pagination?.total_pages ?? 0;

  return (
    <div className={'w-full h-full bg-gray-100'}>
      <div className={'flex flex-col gap-5'}>
        <AdminHeadline title={'회원 거래 내역'} subTitle={['거래 내역', '회원 거래 내역']} />

        <div className={'flex flex-col gap-8 mx-4'}>
          <Filter select={filterSelect} category={category} checkbox={checkbox} />

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

            <TransactionHistoryUserTable data={statisticsData} />

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
