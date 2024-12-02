'use client';

import { useSearchParams } from 'next/navigation';

import { useCallback } from 'react';

import type { IPurchaseUserTableData } from '@/components/organisms/table/PurchaseUserTable.types';
import type { IAdminPurchaseMembersRequest } from '@/services/coin/adminPurchase.types';

import { AdminHeadline } from '@/components/atoms/headlines';
import { Select } from '@/components/atoms/inputs';
import { Filter } from '@/components/organisms/filter';
import { Pagination, GoToPage } from '@/components/organisms/pagination';
import { PurchaseUserTable } from '@/components/organisms/table';
import { useFetch } from '@/hooks';
import { adminPurchaseMembersService } from '@/services/coin/adminPurchase';

const filterSelect = {
  options: [
    {
      label: '거래번호',
      value: 'delng_no',
    },
    {
      label: '아이디',
      value: 'login_id',
    },
    {
      label: '회원명',
      value: 'nm',
    },
    {
      label: '예금주',
      value: 'dpstr',
    },
    {
      label: '계좌번호',
      value: 'acnutno',
    },
  ],
};

const checkbox = {
  text: '회원 등급',
  options: [
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
  ],
};

const range = {
  text: '당일구매횟수',
  min: 0,
  max: 0,
  placeholder: {
    start: '최소',
    end: '최대',
  },
};

const subCheckbox = {
  text: '진행상태',
  options: [
    {
      label: '전체',
      value: '0',
    },
    {
      label: '구매신청',
      value: '11',
    },
    {
      label: '구매대기',
      value: '12',
    },
    {
      label: '구매완료',
      value: '13',
    },
    {
      label: '거래취소',
      value: '14',
    },
  ],
};

export default function PurchaseGeneral() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('view') ?? 15);

  const fetchPurchaseGeneral = useCallback(
    () =>
      adminPurchaseMembersService({
        page,
        per_page: perPage,
        search_keyword: searchParams.get('search') || undefined,
        search_type: searchParams.get('searchType') as IAdminPurchaseMembersRequest['search_type'],
        created_at_start: searchParams.get('startDate') || undefined,
        created_at_end: searchParams.get('endDate') || undefined,
        mber_grd: searchParams.get('status')?.split(',') || undefined,
        delng_sttus: searchParams.get('subStatus')?.split(',') || undefined,
        orderby: searchParams.get('order')?.split(',') || undefined,
        mumm_today_purchs_co: searchParams.get('rangeStart') || undefined,
        mxmm_today_purchs_co: searchParams.get('rangeEnd') || undefined,
      }),
    [searchParams, page, perPage],
  );

  const { data } = useFetch(fetchPurchaseGeneral);

  const statisticsData = data?.data?.map(
    (item, index) =>
      ({
        uniqueId: page * perPage - (perPage - 1) + index,
        managerId: item.mngr_id,
        memberId: item.mber_id,
        dealingId: item.mber_delng_dtls_id,
        bank: item.bank,
        accountNumber: item.acnutno,
        accountHolder: item.dpstr,
        loginId: item.login_id,
        name: item.nm,
        authorRank: item.mber_grd,
        phoneNumber: item.mp_no,
        siteUrl: item.site_adres,
        ipAddress: item.reg_ip,
        applyDate: item.created_at,
        tradeNumber: item.delng_no,
        partnerName: item.prtnr_nm,
        todayPurchsCount: item.today_purchs_co,
        type: item.delng_se,
        status: item.delng_sttus,
        requestAmount: item.pymnt_am,
        bonusAmount: item.bnus_qy,
        paymentAmount: item.compt_qy,
      }) satisfies IPurchaseUserTableData,
  );

  const dataTotalLength = data?.pagination?.total ?? 0;
  const dataTotalPageCount = data?.pagination?.total_pages ?? 0;

  return (
    <div className={'w-full h-full bg-gray-100'}>
      <div className={'flex flex-col gap-5'}>
        <AdminHeadline title={'코인 구매 관리 (일반)'} subTitle={['코인 관리', '코인 구매 관리 (일반)']} />

        <div className={'flex flex-col gap-8 mx-4'}>
          <Filter select={filterSelect} checkbox={checkbox} subCheckbox={subCheckbox} range={range} />

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

            <PurchaseUserTable data={statisticsData} />

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
