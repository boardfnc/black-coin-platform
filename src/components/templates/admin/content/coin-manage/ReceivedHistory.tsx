'use client';

import { useSearchParams } from 'next/navigation';

import { useCallback, useState } from 'react';

import type { IReceivedDetailTableData } from '@/components/organisms/admin/table/ReceivedDetailTable.types';
import type { IAdminReceivedDetailsRequest } from '@/services/admin/coin/adminReceived.types';
import type { ICoinReceivedDetailsRequest } from '@/services/admin/coin/coin.types';

import { AdminHeadline } from '@/components/atoms/headlines';
import { Select } from '@/components/atoms/inputs';
import { useAuthor } from '@/components/atoms/provider/AdminProvider';
import { Filter } from '@/components/organisms/admin/filter';
import { SellCoinModal, BuyCoinModal } from '@/components/organisms/admin/modal';
import { Pagination, GoToPage } from '@/components/organisms/admin/pagination';
import { SentDetailTable } from '@/components/organisms/admin/table';
import { useFetch } from '@/hooks';
import { adminReceivedDetailsService } from '@/services/admin/coin/adminReceived';
import { coinReceivedDetailsService } from '@/services/admin/coin/coin';

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

export default function SentHistory() {
  const { isSuperAdmin } = useAuthor();
  const searchParams = useSearchParams();

  const [isBuyCoinModalOpen, setIsBuyCoinModalOpen] = useState(false);
  const [isSellCoinModalOpen, setIsSellCoinModalOpen] = useState(false);

  const page = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('view') ?? 15);

  const fetchReceivedHistory = useCallback(
    () =>
      isSuperAdmin
        ? adminReceivedDetailsService({
            page,
            per_page: perPage,
            search_keyword: searchParams.get('search') || undefined,
            search_type: searchParams.get('searchType') as IAdminReceivedDetailsRequest['search_type'],
            created_at_start: searchParams.get('startDate') || undefined,
            created_at_end: searchParams.get('endDate') || undefined,
            mber_grd: searchParams.get('status')?.split(',') || undefined,
            orderby: searchParams.get('order')?.split(',') || undefined,
          })
        : coinReceivedDetailsService({
            page,
            per_page: perPage,
            search_keyword: searchParams.get('search') || undefined,
            search_type: searchParams.get('searchType') as ICoinReceivedDetailsRequest['search_type'],
            created_at_start: searchParams.get('startDate') || undefined,
            created_at_end: searchParams.get('endDate') || undefined,
            mber_grd: searchParams.get('status')?.split(',') || undefined,
            orderby: searchParams.get('order')?.split(',') || undefined,
          }),
    [searchParams, page, perPage, isSuperAdmin],
  );

  const { data } = useFetch(fetchReceivedHistory);

  const statisticsData = data?.data?.map(
    (item, index) =>
      ({
        uniqueId: page * perPage - (perPage - 1) + index,
        detailId: item.mber_exchng_dtls_id,
        codeName: ('code' in item && typeof item.code === 'string' && item.code) || '',
        tradeDate: '', // TODO: 거래일자 필요
        partnerName: ('prtnr_nm' in item && typeof item.prtnr_nm === 'string' && item.prtnr_nm) || '',
        partnerCoin: item.ca_coin_bnt,
        authorRank: item.mber_grd,
        loginId: item.login_id,
        authorName: item.nm,
        sendCoin: item.send_coin_qy,
        receiveCoin: item.receive_coin_qy,
        coin: item.mber_coin_bnt,
        memberId: item.mber_id,
        partnerId: item.mngr_id,
      }) satisfies IReceivedDetailTableData,
  );

  const statisticsDataTotalLength = data?.pagination?.total ?? 0;
  const statisticsDataTotalPageCount = data?.pagination?.total_pages ?? 0;

  const filterSelect = {
    text: isSuperAdmin ? undefined : '검색어',
    options: isSuperAdmin
      ? [
          {
            label: '파트너사명',
            value: 'prtnr_nm',
          },
          {
            label: '코드',
            value: 'code',
          },
          {
            label: '회원 아이디',
            value: 'login_id',
          },
          {
            label: '회원명',
            value: 'nm',
          },
        ]
      : [
          {
            label: '아이디',
            value: 'login_id',
          },
          {
            label: '회원명',
            value: 'nm',
          },
        ],
  };

  return (
    <>
      <div className={'w-full h-full bg-gray-100'}>
        <div className={'flex flex-col gap-5'}>
          <AdminHeadline title={'받은 코인 내역'} subTitle={['코인 관리', '받은 코인 내역']} />

          <div className={'flex flex-col gap-8 mx-4'}>
            {!isSuperAdmin && (
              <div className={'flex flex-row justify-end items-center gap-2'}>
                <button
                  className={'w-[130px] h-[40px] text-gray-100 bg-orange-orange50 rounded-[12px] font-pre-14-m-130'}
                  onClick={() => setIsBuyCoinModalOpen(true)}
                >
                  코인 구매
                </button>

                <button
                  className={'w-[130px] h-[40px] text-gray-100 bg-green-fmg50 rounded-[12px] font-pre-14-m-130'}
                  onClick={() => setIsSellCoinModalOpen(true)}
                >
                  코인 판매
                </button>
              </div>
            )}

            <Filter select={filterSelect} checkbox={checkbox} />

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

              <SentDetailTable data={statisticsData} />

              <div className={'w-full flex justify-center items-center gap-3'}>
                <Select />

                <Pagination totalPage={statisticsDataTotalPageCount} />

                <GoToPage />
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isSuperAdmin && (
        <>
          <BuyCoinModal isOpen={isBuyCoinModalOpen} onClose={() => setIsBuyCoinModalOpen(false)} mode={'payment'} />
          <SellCoinModal isOpen={isSellCoinModalOpen} onClose={() => setIsSellCoinModalOpen(false)} mode={'payment'} />
        </>
      )}
    </>
  );
}
