'use client';

import { useSearchParams } from 'next/navigation';

import { useCallback } from 'react';

import type { IGradeManageTableData } from '@/components/organisms/admin/table/GradeManageTable.types';
import type { IAdminMemberGradesRequest } from '@/services/admin/member/adminMembers.types';

import { AdminHeadline } from '@/components/atoms/headlines';
import { Select } from '@/components/atoms/inputs';
import { Filter } from '@/components/organisms/admin/filter';
import { Pagination, GoToPage } from '@/components/organisms/admin/pagination';
import GradeManageTable from '@/components/organisms/admin/table/GradeManageTable';
import { useFetch } from '@/hooks';
import { adminMemberGradesService } from '@/services/admin/member/adminMembers';

const selectOptions = [
  { value: 'prtnr_nm', label: '파트너사명' },
  { value: 'code', label: '코드명' },
];

export default function GradeManage() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('view') ?? 15);

  const fetchGradeList = useCallback(
    () =>
      adminMemberGradesService({
        page,
        per_page: perPage,
        search_type: (searchParams.get('searchType') as IAdminMemberGradesRequest['search_type']) || undefined,
        search_keyword: searchParams.get('search') || undefined,
      }),
    [searchParams, page, perPage],
  );

  const { data } = useFetch(fetchGradeList);

  const userListData = data?.data?.map(
    (item, index) =>
      ({
        uniqueId: page * perPage - (perPage - 1) + index,
        managerId: Number(item.mngr_id),
        id: '-',
        partnerName: item.prtnr_nm,
        codeName: item.code,
        memberCount: item.mber_count,
        memberRank: item.comput_stdr_se,
        vvipStandard: item.vvip_stdr,
        vipStandard: item.vip_stdr,
        generalStandard: item.gnrl_stdr,
        newStandard: '0',
        coin: String(item.code),
      }) satisfies IGradeManageTableData,
  );

  const dataTotalLength = data?.pagination?.total ?? 0;
  const dataTotalPageCount = data?.pagination?.total_pages ?? 0;

  return (
    <div className={'w-full h-full bg-gray-100'}>
      <div className={'flex flex-col gap-5'}>
        <AdminHeadline title={'회원 등급 관리'} subTitle={['회원 관리', '회원 등급 관리']} />

        <div className={'flex flex-col gap-8 mx-4'}>
          <Filter date={{ visible: false, text: '가입일' }} select={{ text: '검색어', options: selectOptions }} />

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

            <GradeManageTable data={userListData} />

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
