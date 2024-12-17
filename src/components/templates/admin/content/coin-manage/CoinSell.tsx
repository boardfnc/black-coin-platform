'use client';

import { useSearchParams } from 'next/navigation';

import { useCallback, useState } from 'react';

import type { ICoinSellTableData } from '@/components/organisms/admin/table/CoinSellTable.types';
import type { ICoinSaleManagersRequest } from '@/services/admin/coin/coin.types';

import { AdminHeadline } from '@/components/atoms/headlines';
import { Select } from '@/components/atoms/inputs';
import { Filter } from '@/components/organisms/admin/filter';
import { SellCoinModal } from '@/components/organisms/admin/modal';
import { Pagination, GoToPage } from '@/components/organisms/admin/pagination';
import { CoinSellTable } from '@/components/organisms/admin/table';
import { useFetch } from '@/hooks';
import { coinSaleManagersService } from '@/services/admin/coin/coin';

const filterSelect = {
  text: '거래번호',
  visible: false,
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
      label: '판매접수',
      value: '22',
    },
    {
      label: '판매완료',
      value: '23',
    },
    {
      label: '판매취소',
      value: '24',
    },
  ],
};

export default function CoinSell() {
  const searchParams = useSearchParams();

  const [isBuyCoinModalOpen, setIsBuyCoinModalOpen] = useState(false);

  const page = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('view') ?? 15);

  const fetchCoinBuy = useCallback(
    () =>
      coinSaleManagersService({
        page,
        per_page: perPage,
        search_keyword: searchParams.get('search') || undefined,
        search_type: searchParams.get('searchType') as ICoinSaleManagersRequest['search_type'],
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
        tradeNumber: item.delng_no,
        type: item.delng_se,
        status: item.delng_sttus,
        requestAmount: item.delng_qy,
        holdAmount: item.hold_qy,
        bonusAmount: item.bnus_qy,
        paymentAmount: item.compt_qy,
        completeDate: item.compt_dt,
      }) satisfies ICoinSellTableData,
  );

  const dataTotalLength = data?.pagination?.total ?? 0;
  const dataTotalPageCount = data?.pagination?.total_pages ?? 0;

  return (
    <>
      <div className={'w-full h-full bg-gray-100'}>
        <div className={'flex flex-col gap-5'}>
          <AdminHeadline title={'코인 판매'} subTitle={['내 코인 관리', '코인 판매']} />

          <div className={'flex flex-col gap-8 mx-4'}>
            <div className={'flex flex-row justify-end items-center gap-2'}>
              <button
                className={'w-[130px] h-10 text-gray-100 bg-green-fmg50 rounded-xl font-pre-14-m-130'}
                onClick={() => setIsBuyCoinModalOpen(true)}
              >
                코인 판매
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

                <CoinSellTable data={statisticsData} refetch={execute} />

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

      <SellCoinModal
        isOpen={isBuyCoinModalOpen}
        onClose={() => setIsBuyCoinModalOpen(false)}
        mode={'payment'}
        refetch={execute}
      />
    </>
  );
}
