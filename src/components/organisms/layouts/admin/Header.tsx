'use client';

import { useRouter } from 'next/navigation';

import { useCallback } from 'react';

import { Image } from '@/components/atoms/images';
import { useAuthor } from '@/components/atoms/provider/AdminProvider';
import ROUTES from '@/constants/routes';
import { useFetch, useRequest } from '@/hooks';
import { KingProfile } from '@/mocks/images';
import { logoutService } from '@/services/admin/auth';
import { memberMyPageService } from '@/services/admin/member/members';

export default function Header() {
  const router = useRouter();
  const { request } = useRequest();
  const { isSuperAdmin } = useAuthor();

  const memberMyPageFetch = useCallback(() => memberMyPageService(), []);

  const { data: memberData } = useFetch(memberMyPageFetch, { enabled: !isSuperAdmin });

  const handleLogout = async () => {
    const data = await request(() => logoutService());

    if (data?.status) router.push(ROUTES.ADMIN.LOGIN);
  };

  return (
    <div
      className={
        'fixed top-0 right-0 z-50 flex items-center justify-end h-[60px] bg-gradient-to-r from-[#28282A] to-[#979797] px-6'
      }
      style={{ width: 'calc(100% - 222px)' }}
    >
      <div className={'inline-flex items-center gap-5'}>
        <div className={'inline-flex items-center gap-2.5'}>
          <div className={'relative w-10 h-10 bg-variable-collection-color-gray-100 rounded-20 overflow-hidden'}>
            <Image className={'absolute w-10 h-10 top-0 left-0 object-cover'} src={KingProfile} alt={'프로필 이미지'} />
          </div>

          <div className={'inline-flex flex-col items-start gap-1'}>
            <div className={'text-white font-pre-14-b-120'}>
              {isSuperAdmin ? 'Super Admin' : memberData?.data.login_id}
            </div>
            {!isSuperAdmin && <div className={'text-white font-pre-12-r-110'}>관리자 계정</div>}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className={'flex items-center justify-center h-[24px] px-3 py-1 rounded-[20px] border border-white'}
        >
          <span className={'font-pre-12-m-130 text-gray-100'}>로그아웃</span>
        </button>
      </div>
    </div>
  );
}
