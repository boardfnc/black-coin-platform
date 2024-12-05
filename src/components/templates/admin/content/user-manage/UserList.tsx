'use client';

import { useSearchParams } from 'next/navigation';

import { useCallback, useState } from 'react';

import type { ICAUserListTableData } from '@/components/organisms/admin/table/CAUserListTable.types';
import type { IAdminManagersRequest } from '@/services/admin/member/adminManagers.types';

import { AdminHeadline } from '@/components/atoms/headlines';
import IconLine24Plus from '@/components/atoms/icons/icon-line/Plus';
import { Select } from '@/components/atoms/inputs';
import { Filter } from '@/components/organisms/admin/filter';
import UserListCreateAuthorModal from '@/components/organisms/admin/modal/UserListCreateAuthorModal';
import { Pagination, GoToPage } from '@/components/organisms/admin/pagination';
import { CAUserListTable } from '@/components/organisms/admin/table';
import { useFetch } from '@/hooks';
import { adminManagersService } from '@/services/admin/member/adminManagers';

const filterSelect = {
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

export default function UserList() {
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  const page = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('view') ?? 15);

  const fetchUserList = useCallback(
    () =>
      adminManagersService({
        page,
        per_page: perPage,
        search_keyword: searchParams.get('search') || undefined,
        search_type: searchParams.get('searchType') as IAdminManagersRequest['search_type'],
        sbscrb_dt_start: searchParams.get('startDate') || undefined,
        sbscrb_dt_end: searchParams.get('endDate') || undefined,
        mngr_sttus: Number(searchParams.get('radio')) || undefined,
      }),
    [searchParams, page, perPage],
  );

  const { data } = useFetch(fetchUserList);

  const userListData = data?.data?.map(
    (item, index) =>
      ({
        uniqueId: page * perPage - (perPage - 1) + index,
        managerId: Number(item.mngr_id),
        id: item.login_id,
        date: item.sbscrb_dt,
        partnerName: item.prtnr_nm,
        codeName: item.code,
        phoneNumber: item.mp_no,
        coin: item.hold_coin,
        purchaseCount: item.tot_purchs_am,
        saleCount: item.tot_sle_am,
        siteUrl: item.site_adres,
        charge: item.csby_fee,
        totalFeePerCase: item.tot_purchs_am,
        purchaseFee: item.purchs_fee,
        saleFee: item.sle_fee,
        authorStatus: item.mngr_sttus,
      }) satisfies ICAUserListTableData,
  );

  const dataTotalLength = data?.pagination?.total ?? 0;
  const dataTotalPageCount = data?.pagination?.total_pages ?? 0;

  return (
    <>
      <div className={'w-full h-full bg-gray-100'}>
        <div className={'flex flex-col gap-5'}>
          <AdminHeadline title={'CA 회원 목록'} subTitle={['회원 관리', 'CA 회원 목록']} />

          <div className={'flex justify-end mx-4'}>
            <button
              className={
                'flex items-center justify-center gap-1.5 font-pre-14-m-130 ps-3 pe-4 h-10 text-gray-100 bg-purple-fmg60 rounded-xl'
              }
              onClick={() => setIsOpen(true)}
            >
              <IconLine24Plus />
              CA 아이디 추가 생성
            </button>
          </div>

          <div className={'flex flex-col gap-8 mx-4'}>
            <Filter
              date={{ text: '가입일' }}
              select={filterSelect}
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

              <CAUserListTable data={userListData} />

              <div className={'w-full flex justify-center items-center gap-3'}>
                <Select />

                <Pagination totalPage={dataTotalPageCount} />

                <GoToPage />
              </div>
            </div>
          </div>
        </div>
      </div>

      <UserListCreateAuthorModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
