import { useSearchParams } from 'next/navigation';

import { useCallback, useState } from 'react';

import type IUserDetailPartnerSearchModalProps from './UserDetailPartnerSearchModal.types';
import type { IAdminManagersRequest } from '@/services/admin/member/adminManagers.types';

import { IconLine24Close } from '@/components/atoms/icons/icon-line';
import { Modal } from '@/components/atoms/modals';
import { Pagination } from '@/components/organisms/admin/pagination';
import { useFetch } from '@/hooks';
import { adminManagersService } from '@/services/admin/member/adminManagers';

export default function UserDetailPartnerSearchModal(props: IUserDetailPartnerSearchModalProps) {
  const { isOpen, onClose } = props;

  const [search, setSearch] = useState('');

  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('view') ?? 15);

  const DataParam = useCallback(
    () =>
      adminManagersService({
        page,
        per_page: perPage,
        search_keyword: search,
        search_type: 'prtnr_nm',
        sbscrb_dt_start: searchParams.get('startDate') || undefined,
        sbscrb_dt_end: searchParams.get('endDate') || undefined,
        mngr_sttus: Number(searchParams.get('status')) || undefined,
        orderby: (searchParams.get('order')?.split(',') as IAdminManagersRequest['orderby']) || undefined,
      }),
    [page, perPage, search, searchParams],
  );

  const { data, execute } = useFetch(DataParam);

  const totalPage = data?.pagination?.total_pages ?? 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} width={'860px'}>
      <div className={'flex flex-row justify-between items-center pb-5'}>
        <div className={'text-gray-10 font-pre-20-m-130'}>파트너사 검색</div>

        <button className={'text-gray-10'} onClick={onClose}>
          <IconLine24Close className={'text-gray-10'} />
        </button>
      </div>

      <div className={'flex flex-col gap-6'}>
        <div className={'flex flex-row justify-between items-center gap-[10px] pt-3 pb-2'}>
          <input
            className={
              'w-full text-gray-10 font-pre-13-r-130 placeholder:text-gray-50 border border-gray-80 rounded-lg h-[32px] py-2 px-4'
            }
            type={'text'}
            placeholder={'입력'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className={'w-[90px] font-pre-14-m-130 text-gray-100 bg-gray-0 h-[32px] px-4 rounded-[8px]'}
            onClick={() => execute()}
          >
            조회
          </button>
        </div>

        <div className={'flex flex-col gap-3'}>
          <div className={'flex gap-1 items-center text-gray-10 font-pre-16-m-130'}>
            <div className={'text-gray-0 font-pre-16-m-130'}>목록</div>
            <div className={'text-primary-50 font-pre-16-m-130'}>{totalPage}</div>
          </div>

          <div className={'h-[360px] overflow-y-auto'}>
            <div className={'relative'}>
              <table className={'w-full border-collapse text-center'}>
                <thead className={'sticky top-0 z-10'}>
                  <tr className={'h-[32px] bg-gray-95'}>
                    <th className={'px-4 font-pre-13-m-130 text-gray-0 border border-gray-80'}>NO.</th>
                    <th className={'px-4 font-pre-13-m-130 text-gray-0 border border-gray-80'}>파트너사명</th>
                    <th className={'px-4 font-pre-13-m-130 text-gray-0 border border-gray-80'}>코드명</th>
                    <th className={'px-4 font-pre-13-m-130 text-gray-0 border border-gray-80'}>담당자연락처</th>
                    <th className={'px-4 font-pre-13-m-130 text-gray-0 border border-gray-80'}>사이트주소</th>
                  </tr>
                </thead>

                <tbody>
                  {data?.data?.map((item, index) => {
                    const key = page * perPage - (perPage - 1) + index;

                    return (
                      <tr key={key} className={'h-[43px] bg-gray-100'}>
                        <td className={'px-4 font-pre-13-r-130 text-gray-0 border border-gray-80'}>{key}</td>
                        <td className={'px-4 font-pre-13-r-130 text-gray-0 border border-gray-80'}>{item.prtnr_nm}</td>
                        <td className={'px-4 font-pre-13-r-130 text-gray-0 border border-gray-80'}>{item.code}</td>
                        <td className={'px-4 font-pre-13-r-130 text-gray-0 border border-gray-80'}>{item.mp_no}</td>
                        <td className={'px-4 font-pre-13-r-130 text-gray-0 border border-gray-80'}>
                          <a className={'text-primary-50 underline'} href={'https://www.example.com'} target={'_blank'}>
                            {item.site_adres}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className={'flex justify-center items-center'}>
          <Pagination totalPage={totalPage} />
        </div>
      </div>
    </Modal>
  );
}
