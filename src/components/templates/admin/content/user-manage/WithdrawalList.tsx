'use client';

import { useSearchParams } from 'next/navigation';

import { useCallback } from 'react';

import type { IWithdrawalListTableData } from '@/components/organisms/admin/table/WithdrawalListTable.types';
import type { IAdminMemberRetrievalMembersRequest } from '@/services/member/adminMembers.types';
import type { IMemberRetrievalMembersRequest } from '@/services/member/members.types';

import { AdminHeadline } from '@/components/atoms/headlines';
import { Select } from '@/components/atoms/inputs';
import { useAuthor } from '@/components/atoms/provider/AdminProvider';
import { Filter } from '@/components/organisms/admin/filter';
import { Pagination, GoToPage } from '@/components/organisms/admin/pagination';
import WithdrawalListTable from '@/components/organisms/admin/table/WithdrawalListTable';
import { useFetch } from '@/hooks';
import { adminMemberRetrievalMembersService } from '@/services/member/adminMembers';
import { memberRetrievalMembersService } from '@/services/member/members';

const filterSelect = {
  text: '검색어',
  visible: false,
  options: [
    {
      label: '아이디',
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
  ],
};

const checkboxOptions = {
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

const radioOptions = {
  options: [
    {
      label: '전체',
      value: '0',
    },
    {
      label: '정상',
      value: '1',
    },
    {
      label: '차단',
      value: '2',
    },
  ],
};

export default function WithdrawalList() {
  const { isSuperAdmin } = useAuthor();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('view') ?? 15);

  const fetchWithdrawalList = useCallback(
    () =>
      isSuperAdmin
        ? adminMemberRetrievalMembersService({
            page,
            per_page: perPage,
            created_dt_start: searchParams.get('startDate') || undefined,
            created_dt_end: searchParams.get('endDate') || undefined,
            mber_sttus:
              (searchParams.get('radio') as unknown as IAdminMemberRetrievalMembersRequest['mber_sttus']) || undefined,
            search_type: searchParams.get('searchType') as IAdminMemberRetrievalMembersRequest['search_type'],
            search_keyword: searchParams.get('search') || undefined,
          })
        : memberRetrievalMembersService({
            page,
            per_page: perPage,
            created_at_start: searchParams.get('startDate') || undefined,
            created_at_end: searchParams.get('endDate') || undefined,
            mber_sttus:
              (searchParams.get('radio') as unknown as IMemberRetrievalMembersRequest['mber_sttus']) || undefined,
            mber_grd:
              (searchParams.get('status')?.split(',') as IMemberRetrievalMembersRequest['mber_grd']) || undefined,
            search_type: searchParams.get('searchType') as IMemberRetrievalMembersRequest['search_type'],
            search_keyword: searchParams.get('search') || undefined,
          }),
    [searchParams, page, perPage, isSuperAdmin],
  );

  const { data } = useFetch(fetchWithdrawalList);

  const userListData = data?.data?.map(
    (item, index) =>
      ({
        uniqueId: page * perPage - (perPage - 1) + index,
        memberId: Number(item.mber_id),
        memberDetailId: Number(item.mber_rirvl_dtls_id),
        memberRank: item.mber_grd,
        id: String(item.mber_id),
        loginId: item.login_id,
        coin: item.hold_coin,
        codeName: ('code' in item && typeof item.code === 'string' && item.code) || '',
        partnerName: ('prtnr_nm' in item && typeof item.prtnr_nm === 'string' && item.prtnr_nm) || '',
        purchaseCount: item.tot_purchs_am,
        saleCount: item.tot_sle_am,
        returnMemberId: String(item.rirvl_login_id),
        returnCoin: item.rtrvl_coin,
        memberStatus: item.mber_sttus,
        returnDate: item.created_at,
      }) satisfies IWithdrawalListTableData,
  );

  const dataTotalLength = data?.pagination?.total ?? 0;
  const dataTotalPageCount = data?.pagination?.total_pages ?? 0;

  return (
    <div className={'w-full h-full bg-gray-100'}>
      <div className={'flex flex-col gap-5'}>
        <AdminHeadline title={'회수 회원 목록'} subTitle={['회원 관리', '회수 회원 목록']} />

        <div className={'flex flex-col gap-8 mx-4'}>
          <Filter
            date={{ text: '회수일' }}
            search={{
              defaultSearchType: 'login_id',
            }}
            select={{
              text: isSuperAdmin ? '검색어' : '회원아이디',
              visible: isSuperAdmin,
              options: filterSelect.options,
            }}
            checkbox={{ text: '회원 등급', options: checkboxOptions.options }}
            radio={{ text: '회원상태', options: radioOptions.options }}
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

            <WithdrawalListTable data={userListData} />

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
