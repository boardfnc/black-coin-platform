'use client';

import { useSearchParams } from 'next/navigation';

import { useCallback, useState } from 'react';

import type { ICoinBuyTableData } from '@/components/organisms/admin/table/CoinBuyTable.types';
import type { ICoinPurchaseManagersRequest } from '@/services/coin/coin.types';

import { AdminHeadline } from '@/components/atoms/headlines';
import { Select } from '@/components/atoms/inputs';
import { Filter } from '@/components/organisms/admin/filter';
import { BuyCoinModal } from '@/components/organisms/admin/modal';
import { Pagination, GoToPage } from '@/components/organisms/admin/pagination';
import { CoinBuyTable } from '@/components/organisms/admin/table';
import { useFetch } from '@/hooks';
import { coinPurchaseManagersService } from '@/services/coin/coin';

const filterSelect = {
  text: '거래번호',
  visible: false,
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
      label: '은행',
      value: 'bank',
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
      label: '구매취소',
      value: '14',
    },
  ],
};

export default function CoinBuy() {
  const searchParams = useSearchParams();

  const [isBuyCoinModalOpen, setIsBuyCoinModalOpen] = useState(false);

  const page = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('view') ?? 15);

  const fetchCoinBuy = useCallback(
    () =>
      coinPurchaseManagersService({
        page,
        per_page: perPage,
        search_keyword: searchParams.get('search') || undefined,
        search_type: searchParams.get('searchType') as ICoinPurchaseManagersRequest['search_type'],
        created_at_start: searchParams.get('startDate') || undefined,
        created_at_end: searchParams.get('endDate') || undefined,
        delng_sttus: searchParams.get('status')?.split(',') || undefined,
        orderby: searchParams.get('order')?.split(',') || undefined,
      }),
    [searchParams, page, perPage],
  );

  const { data, execute } = useFetch(fetchCoinBuy);

  const statisticsData = data?.data?.map(
    (item, index) =>
      ({
        uniqueId: page * perPage - (perPage - 1) + index,
        managerId: item.mngr_id,
        dealingId: item.ca_delng_dtls_id,
        bank: item.bank,
        accountNumber: item.acnutno,
        accountHolder: item.dpstr,
        applyDate: item.created_at,
        completeDate: item.compt_dd,
        tradeNumber: item.delng_no,
        type: item.delng_se,
        status: item.delng_sttus,
        requestAmount: item.delng_qy,
        bonusAmount: item.bnus_qy,
        paymentAmount: item.compt_qy,
      }) satisfies ICoinBuyTableData,
  );

  const dataTotalLength = data?.pagination?.total ?? 0;
  const dataTotalPageCount = data?.pagination?.total_pages ?? 0;

  return (
    <>
      <div className={'w-full h-full bg-gray-100'}>
        <div className={'flex flex-col gap-5'}>
          <AdminHeadline title={'코인 구매'} subTitle={['내 코인 관리', '코인 구매']} />

          <div className={'flex flex-col gap-8 mx-4'}>
            <div className={'flex flex-row justify-end items-center gap-2'}>
              <button
                className={'w-[130px] h-[40px] text-gray-100 bg-orange-orange50 rounded-[12px] font-pre-14-m-130'}
                onClick={() => setIsBuyCoinModalOpen(true)}
              >
                코인 구매
              </button>
            </div>

            <div className={'flex flex-col gap-8'}>
              <Filter
                date={{ text: '신청일' }}
                search={{ defaultSearchType: 'delng_no' }}
                select={filterSelect}
                checkbox={checkbox}
              />

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

                <CoinBuyTable data={statisticsData} refetch={execute} />

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

      <BuyCoinModal
        isOpen={isBuyCoinModalOpen}
        onClose={() => setIsBuyCoinModalOpen(false)}
        mode={'payment'}
        refetch={execute}
      />
    </>
  );
}
