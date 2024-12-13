'use client';

import { useSearchParams } from 'next/navigation';

import { useCallback } from 'react';

import type { ISaleCATableData } from '@/components/organisms/admin/table/SaleCATable.types';
import type { IAdminSaleManagersRequest } from '@/services/admin/coin/adminSale.types';

import { AdminHeadline } from '@/components/atoms/headlines';
import { Select } from '@/components/atoms/inputs';
import { Filter } from '@/components/organisms/admin/filter';
import { Pagination, GoToPage } from '@/components/organisms/admin/pagination';
import SaleCATable from '@/components/organisms/admin/table/SaleCATable';
import { useFetch } from '@/hooks';
import { adminSaleManagersService } from '@/services/admin/coin/adminSale';

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
      label: '파트너사명',
      value: 'prtnr_nm',
    },
    {
      label: '코드',
      value: 'code',
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
  text: '진행상태',
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
      label: '판매대기',
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

export default function SaleCA() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('view') ?? 15);

  const fetchSaleCA = useCallback(
    () =>
      adminSaleManagersService({
        created_at_start: searchParams.get('startDate') || undefined,
        created_at_end: searchParams.get('endDate') || undefined,
        search_keyword: searchParams.get('search') || undefined,
        search_type: searchParams.get('searchType') as IAdminSaleManagersRequest['search_type'],
        page,
        per_page: perPage,
        delng_sttus: searchParams.get('status')?.split(',') || undefined,
        orderby: searchParams.get('order')?.split(',') || undefined,
      }),
    [searchParams, page, perPage],
  );

  const { data, execute } = useFetch(fetchSaleCA);

  const statisticsData = data?.data?.map(
    (item, index) =>
      ({
        uniqueId: page * perPage - (perPage - 1) + index,
        managerId: item.mngr_id,
        dealingId: item.ca_delng_dtls_id,
        bank: item.bank,
        accountNumber: item.acnutno,
        accountHolder: item.dpstr,
        loginId: '',
        name: '',
        authorRank: '',
        phoneNumber: 'mp_no' in item && typeof item.mp_no === 'string' ? item.mp_no : '',
        siteUrl: 'site_adres' in item && typeof item.site_adres === 'string' ? item.site_adres : '',
        ipAddress: 'reg_ip' in item && typeof item.reg_ip === 'string' ? item.reg_ip : '',
        applyDate: item.created_at,
        tradeNumber: item.delng_no,
        partnerName: 'prtnr_nm' in item && typeof item.prtnr_nm === 'string' ? item.prtnr_nm : '',
        codeName: 'code' in item && typeof item.code === 'string' ? item.code : '',
        type: item.delng_se,
        status: item.delng_sttus,
        requestAmount: item.delng_qy,
        bonusAmount: item.bnus_qy,
        paymentAmount: item.compt_qy,
      }) satisfies ISaleCATableData,
  );

  const dataTotalLength = data?.pagination?.total ?? 0;
  const dataTotalPageCount = data?.pagination?.total_pages ?? 0;

  return (
    <div className={'w-full h-full bg-gray-100'}>
      <div className={'flex flex-col gap-5'}>
        <AdminHeadline title={'코인 판매 관리 (CA)'} subTitle={['내 코인 관리', '코인 판매 관리 (CA)']} />

        <div className={'flex flex-col gap-8 mx-4'}>
          <div className={'flex flex-col gap-8'}>
            <Filter select={filterSelect} checkbox={checkbox} />

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

              <SaleCATable data={statisticsData} refetch={execute} />

              <div className={'w-full flex justify-center items-center gap-3'}>
                <Select />

                <Pagination totalPage={dataTotalPageCount} />

                <GoToPage />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
