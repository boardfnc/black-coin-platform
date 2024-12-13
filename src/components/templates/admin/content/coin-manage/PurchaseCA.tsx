'use client';

import { useSearchParams } from 'next/navigation';

import { useCallback } from 'react';

import type { IPurchaseCATableData } from '@/components/organisms/admin/table/PurchaseCATable.types';
import type { IAdminReceivedDetailsRequest } from '@/services/admin/coin/adminReceived.types';

import { AdminHeadline } from '@/components/atoms/headlines';
import { Select } from '@/components/atoms/inputs';
import { Filter } from '@/components/organisms/admin/filter';
import { Pagination, GoToPage } from '@/components/organisms/admin/pagination';
import { PurchaseCATable } from '@/components/organisms/admin/table';
import { useFetch } from '@/hooks';
import { adminPurchaseManagersService } from '@/services/admin/coin/adminPurchase';

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

export default function PurchaseCA() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('view') ?? 15);

  const fetchPurchaseCA = useCallback(
    () =>
      adminPurchaseManagersService({
        page,
        per_page: perPage,
        search_keyword: searchParams.get('search') || undefined,
        search_type: searchParams.get('searchType') as IAdminReceivedDetailsRequest['search_type'],
        created_at_start: searchParams.get('startDate') || undefined,
        created_at_end: searchParams.get('endDate') || undefined,
        delng_sttus: searchParams.get('status')?.split(',') || undefined,
        orderby: searchParams.get('order')?.split(',') || undefined,
      }),
    [searchParams, page, perPage],
  );

  const { data, execute } = useFetch(fetchPurchaseCA);

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
        phoneNumber: item.mp_no,
        siteUrl: item.site_adres,
        ipAddress: item.reg_ip,
        applyDate: item.created_at,
        tradeNumber: item.delng_no,
        partnerName: item.prtnr_nm,
        codeName: item.code,
        type: item.delng_se,
        status: item.delng_sttus,
        requestAmount: item.delng_qy,
        bonusAmount: item.bnus_qy,
        paymentAmount: item.compt_qy,
      }) satisfies IPurchaseCATableData,
  );

  const dataTotalLength = data?.pagination?.total ?? 0;
  const dataTotalPageCount = data?.pagination?.total_pages ?? 0;

  return (
    <>
      <div className={'w-full h-full bg-gray-100'}>
        <div className={'flex flex-col gap-5'}>
          <AdminHeadline title={'코인 구매 관리 (CA)'} subTitle={['코인 관리', '코인 구매 관리 (CA)']} />

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

                <PurchaseCATable data={statisticsData} refetch={execute} />

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
    </>
  );
}
