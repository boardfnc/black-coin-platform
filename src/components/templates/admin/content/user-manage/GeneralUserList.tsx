'use client';

import { useSearchParams } from 'next/navigation';

import { useCallback } from 'react';

import type { IUserListTableData } from '@/components/organisms/table/GeneralUserListTable.types';
import type { IAdminMemberRequest } from '@/services/member/adminMembers.types';
import type { IMembersRequest } from '@/services/member/members.types';

import { AdminHeadline } from '@/components/atoms/headlines';
import { Select } from '@/components/atoms/inputs';
import { useAuthor } from '@/components/atoms/provider/AdminProvider';
import { Filter } from '@/components/organisms/filter';
import { Pagination, GoToPage } from '@/components/organisms/pagination';
import { GeneralUserListTable } from '@/components/organisms/table';
import { useFetch } from '@/hooks';
import { adminMemberService } from '@/services/member/adminMembers';
import { membersService } from '@/services/member/members';

const checkboxOptions = {
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

const radioOptions = {
  text: '회원상태',
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

export default function GeneralUserList() {
  const { isSuperAdmin } = useAuthor();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('view') ?? 15);

  const fetchGeneralUserList = useCallback(
    () =>
      isSuperAdmin
        ? adminMemberService({
            page,
            per_page: perPage,
            sbscrb_dt_start: searchParams.get('startDate') || undefined,
            sbscrb_dt_end: searchParams.get('endDate') || undefined,
            search_keyword: searchParams.get('search') || undefined,
            search_type: searchParams.get('searchType') as IAdminMemberRequest['search_type'],
            mber_sttus: Number(searchParams.get('radio')) || undefined,
            mber_grd: (searchParams.get('status')?.split(',') as IAdminMemberRequest['mber_grd']) || undefined,
          })
        : membersService({
            page,
            per_page: perPage,
            sbscrb_dt_start: searchParams.get('startDate') || undefined,
            sbscrb_dt_end: searchParams.get('endDate') || undefined,
            search_keyword: searchParams.get('search') || undefined,
            search_type: searchParams.get('searchType') as IMembersRequest['search_type'],
            mber_sttus: Number(searchParams.get('radio')) || undefined,
            mber_grd: (searchParams.get('status')?.split(',') as IMembersRequest['mber_grd']) || undefined,
          }),
    [searchParams, page, perPage, isSuperAdmin],
  );

  const { data, execute } = useFetch(fetchGeneralUserList);

  const userListData = data?.data?.map(
    (item, index) =>
      ({
        uniqueId: page * perPage - (perPage - 1) + index,
        managerId: Number(item.mngr_id),
        memberId: Number(item.mber_id),
        date: item.sbscrb_dt,
        partnerName: ('prtnr_nm' in item && typeof item.prtnr_nm === 'string' && item.prtnr_nm) || '',
        codeName: ('code' in item && typeof item.code === 'string' && item.code) || '',
        id: item.login_id,
        coin: item.hold_coin,
        purchaseCount: item.rcpmny_am,
        saleCount: item.defray_am,
        authorRank: item.mber_grd,
        lastAccess: item.last_conect_dt,
        ipAddress: item.last_conect_ip,
        authorStatus: item.mber_sttus,
      }) satisfies IUserListTableData,
  );

  const userListDataTotalLength = data?.pagination?.total ?? 0;
  const userListDataTotalPageCount = data?.pagination?.total_pages ?? 0;

  const filterSelect = {
    text: isSuperAdmin ? '검색어' : '회원아이디',
    visible: isSuperAdmin,
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

  return (
    <div className={'w-full h-full bg-gray-100'}>
      <div className={'flex flex-col gap-5'}>
        <AdminHeadline title={'회원 목록'} subTitle={['회원 관리', '회원 목록']} />

        <div className={'flex flex-col gap-8 mx-4'}>
          <Filter
            date={{ text: '가입일' }}
            search={{ defaultSearchType: 'login_id' }}
            checkbox={checkboxOptions}
            select={filterSelect}
            radio={radioOptions}
          />

          <div className={'flex gap-3 flex-col justify-center items-start text-gray-0 font-pre-16-m-130'}>
            <div className={'flex w-full justify-between items-center'}>
              <div className={'flex gap-1'}>
                <span className={'text-gray-0 font-pre-16-r-130'}>목록</span>
                <span className={'text-primary-50 font-pre-16-m-130'}>{userListDataTotalLength}</span>
              </div>

              <div className={'flex gap-1'}>
                <Select />
              </div>
            </div>

            <GeneralUserListTable data={userListData} refetch={execute} />

            <div className={'w-full flex justify-center items-center gap-3'}>
              <Select />

              <Pagination totalPage={userListDataTotalPageCount} />

              <GoToPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
