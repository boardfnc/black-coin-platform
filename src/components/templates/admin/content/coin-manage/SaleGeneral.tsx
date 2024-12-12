'use client';

import { useSearchParams } from 'next/navigation';

import { useCallback } from 'react';

import type { ISaleGeneralTableData } from '@/components/organisms/admin/table/SaleGeneralTable.types';
import type { IAdminSaleMembersRequest } from '@/services/admin/coin/adminSale.types';

import { AdminHeadline } from '@/components/atoms/headlines';
import { Select } from '@/components/atoms/inputs';
import { Filter } from '@/components/organisms/admin/filter';
import { Pagination, GoToPage } from '@/components/organisms/admin/pagination';
import SaleGeneralTable from '@/components/organisms/admin/table/SaleGeneralTable';
import { useFetch } from '@/hooks';
import { adminSaleMembersService } from '@/services/admin/coin/adminSale';

const filterSelect = {
  options: [
    {
      label: '거래번호',
      value: 'delng_no',
    },
    {
      label: '회원 아이디',
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

const subCheckbox = {
  options: [
    {
      label: '전체',
      value: '0',
    },
    {
      label: '판매신청',
      value: '21',
    },
    {
      label: '판매접수',
      value: '22',
    },
    {
      label: '판매완료',
      value: '23',
    },
    {
      label: '거래취소',
      value: '24',
    },
  ],
};

export default function SaleGeneral() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('view') ?? 15);

  const fetchSaleGeneral = useCallback(
    () =>
      adminSaleMembersService({
        page,
        per_page: perPage,
        created_at_start: searchParams.get('startDate') || undefined,
        created_at_end: searchParams.get('endDate') || undefined,
        search_keyword: searchParams.get('search') || undefined,
        search_type: searchParams.get('searchType') as IAdminSaleMembersRequest['search_type'],
        mber_grd: searchParams.get('status')?.split(',') || undefined,
        delng_sttus: searchParams.get('subStatus')?.split(',') || undefined,
        orderby: searchParams.get('order')?.split(',') || undefined,
      }),
    [searchParams, page, perPage],
  );

  const { data, execute } = useFetch(fetchSaleGeneral);

  const statisticsData = data?.data?.map(
    (item, index) =>
      ({
        uniqueId: page * perPage - (perPage - 1) + index,
        managerId: item.mngr_id,
        memberId: item.mber_id,
        ipAddress: item.reg_ip,
        dealingId: item.mber_delng_dtls_id,
        bank: item.bank,
        accountNumber: item.acnutno,
        accountHolder: item.dpstr,
        loginId: item.login_id,
        name: item.nm,
        authorRank: item.mber_grd,
        phoneNumber: '',
        siteUrl: item.site_adres,
        applyDate: item.created_at,
        tradeNumber: item.delng_no,
        partnerName: item.prtnr_nm,
        codeName: '',
        type: item.delng_se,
        status: item.delng_sttus,
        requestAmount: item.delng_qy,
        bonusAmount: item.bnus_qy,
        paymentAmount: item.pymnt_am,
      }) satisfies ISaleGeneralTableData,
  );

  const dataTotalLength = data?.pagination?.total ?? 0;
  const dataTotalPageCount = data?.pagination?.total_pages ?? 0;

  return (
    <div className={'w-full h-full bg-gray-100'}>
      <div className={'flex flex-col gap-5'}>
        <AdminHeadline title={'코인 판매 관리 (일반)'} subTitle={['코인 관리', '코인 판매 관리 (일반)']} />

        <div className={'flex flex-col gap-8 mx-4'}>
          <Filter select={filterSelect} checkbox={checkbox} subCheckbox={subCheckbox} />

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

            <SaleGeneralTable data={statisticsData} refetch={execute} />

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
