'use client';

import { useSearchParams } from 'next/navigation';

import { useCallback } from 'react';

import type { ISignupTableData } from '@/components/organisms/table/SignupTable.types';
import type { IAdminMemberSubscribesRequest } from '@/services/member/adminMembers.types';

import { AdminHeadline } from '@/components/atoms/headlines';
import { Select } from '@/components/atoms/inputs';
import { Filter } from '@/components/organisms/filter';
import { Pagination, GoToPage } from '@/components/organisms/pagination';
import SignupTable from '@/components/organisms/table/SignupTable';
import { useFetch } from '@/hooks';
import { adminMemberSubscribesService } from '@/services/member/adminMembers';

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
      label: '대기',
      value: '2',
    },
    {
      label: '거절',
      value: '3',
    },
  ],
};

export default function SignupManage() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('view') ?? 15);

  const fetchSignupList = useCallback(
    () =>
      adminMemberSubscribesService({
        page,
        per_page: perPage,
        sbscrb_dt_start: searchParams.get('startDate') || undefined,
        sbscrb_dt_end: searchParams.get('endDate') || undefined,
        search_type:
          (searchParams.get('searchType') as unknown as IAdminMemberSubscribesRequest['search_type']) || undefined,
        search_keyword: searchParams.get('search') || undefined,
        confm_sttus:
          (searchParams.get('radio') as unknown as IAdminMemberSubscribesRequest['confm_sttus']) || undefined,
      }),
    [searchParams, page, perPage],
  );

  const { data, execute } = useFetch(fetchSignupList);

  const userListData = data?.data?.map(
    (item, index) =>
      ({
        uniqueId: page * perPage - (perPage - 1) + index,
        partnerName: item.prtnr_nm,
        memberId: item.mber_id,
        codeName: item.code,
        id: item.mber_id,
        loginId: item.login_id,
        joinDate: item.sbscrb_dt,
        phoneNumber: item.mp_no,
        bankName: item.bank,
        accountName: item.dpstr,
        accountNumber: item.acnutno,
        memberStatus: item.confm_sttus,
      }) satisfies ISignupTableData,
  );

  const dataTotalLength = data?.pagination?.total ?? 0;
  const dataTotalPageCount = data?.pagination?.total_pages ?? 0;

  return (
    <div className={'w-full h-full bg-gray-100'}>
      <div className={'flex flex-col gap-5'}>
        <AdminHeadline title={'회원가입 관리'} subTitle={['회원 관리', '회원가입 관리']} />

        <div className={'flex flex-col gap-8 mx-4'}>
          <Filter
            date={{ text: '가입일' }}
            select={{ options: filterSelect.options }}
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

            <SignupTable data={userListData} refetch={execute} />

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
