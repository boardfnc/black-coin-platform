import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useCallback, useState, useEffect } from 'react';

import { superAdminSideBarMenu, adminSideBarMenu } from './SideBar.config';

import type { ISideBarProps } from './SideBar.types';

import { IconLine24ArrowDown } from '@/components/atoms/icons/icon-line';
import IconLineSavingMoney from '@/components/atoms/icons/icon-line/SavingMoney';
import { Image } from '@/components/atoms/images';
import { useAuthor } from '@/components/atoms/provider/AdminProvider';
import { useFetch } from '@/hooks';
import { KingProfile } from '@/mocks/images';
import { memberMyPageService } from '@/services/admin/member/members';
import { adminUserService } from '@/services/admin/setup/adminUser';
import { useRefetch } from '@/stores/refetch';

export default function SideBar({ isOpen }: ISideBarProps) {
  const pathname = usePathname();
  const { isSuperAdmin, loginId } = useAuthor();

  const adminUserFetch = useCallback(() => adminUserService(), []);
  const memberMyPageFetch = useCallback(() => memberMyPageService(), []);
  const { setSideBarRefetch } = useRefetch();
  const { data: adminData, execute: adminExecute } = useFetch(adminUserFetch, { enabled: isSuperAdmin });
  const { data: memberData, execute: memberExecute } = useFetch(memberMyPageFetch, { enabled: !isSuperAdmin });

  const [openDropdowns, setOpenDropdowns] = useState<number[]>([]);

  const toggleDropdown = (index: number) => {
    setOpenDropdowns((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  const isPathActive = (currentPath: string) => pathname.startsWith(currentPath);

  const sideBarMenu = isSuperAdmin ? superAdminSideBarMenu : adminSideBarMenu;

  useEffect(() => {
    if (isSuperAdmin) {
      setSideBarRefetch(adminExecute);
    } else {
      setSideBarRefetch(memberExecute);
    }
  }, [adminExecute, isSuperAdmin, memberExecute, setSideBarRefetch]);

  return (
    <div
      className={`fixed left-0 top-0 h-screen transition-all duration-300 bg-gray-100 z-50
      ${isOpen ? 'w-[250px]' : 'w-[60px]'}`}
    >
      <div className={'bg-gray-10 flex items-center justify-between h-[60px] px-4'}>
        {isOpen && <h1 className={'text-gray-100 font-suit-12-750-130'}>Black Coin ADMIN</h1>}
      </div>

      <div className={'relative w-[250px] h-screen bg-gray-95 border-r border-gray-80'}>
        <div className={'flex flex-col items-start gap-4 pt-10 px-[14px]'}>
          <span className={'text-gray-40 font-suit-12-750-130'}>UserInfo</span>

          <div className={`flex flex-row items-center gap-4 self-stretch ${!isSuperAdmin ? 'justify-between' : ''}`}>
            <div className={'w-[67px] h-[67px] rounded-[140px] overflow-hidden'}>
              <Image src={KingProfile} alt={'프로필 이미지'} priority />
            </div>

            {isSuperAdmin && <span className={'text-gray-0 font-pre-20-m-130'}>SuperAdmin</span>}

            {!isSuperAdmin && (
              <div className={'flex flex-col justify-end items-end gap-1'}>
                <span className={'text-gray-0 font-pre-20-m-130'}>{memberData?.data.prtnr_nm}</span>
                <span className={'text-gray-30 font-pre-14-r-130'}>{loginId}</span>
              </div>
            )}
          </div>

          {!isSuperAdmin && (
            <div className={'w-full flex flex-col gap-4 pt-5 pb-1'}>
              <div className={'text-gray-40 font-suit-12-750-130'}>Coin</div>

              <div
                className={
                  'w-full flex flex-row items-center justify-between px-2.5 py-3 border border-line-line03 rounded-[10px]'
                }
              >
                <span className={'text-yellow-50 font-pre-13-r-130'}>
                  <IconLineSavingMoney />
                </span>
                <span className={'text-gray-0 font-pre-16-m-130'}>
                  {(memberData?.data.hold_coin || 0).toLocaleString('ko-KR')}
                </span>
              </div>
            </div>
          )}

          <div className={'flex flex-row justify-between items-center gap-4 self-stretch py-5'}>
            <span className={'text-gray-40 font-suit-12-750-130'}>IP Address</span>

            {!isSuperAdmin && (
              <span className={'text-gray-30 font-suit-14-750-130'}>{memberData?.data.last_conect_ip}</span>
            )}

            {isSuperAdmin && (
              <span className={'text-gray-30 font-suit-14-750-130'}>{adminData?.data.last_conect_ip}</span>
            )}
          </div>
        </div>

        <div className={'flex items-center justify-start px-3.5 py-4 bg-gray-10'}>
          <span className={'text-gray-100 font-suit-12-750-130'}>Admin Menu</span>
        </div>

        <ul
          className={`overflow-y-auto bg-gray-100 h-full ${isSuperAdmin ? 'max-h-[calc(100vh-320px)]' : 'max-h-[calc(100vh-440px)]'}`}
        >
          {sideBarMenu.map(({ title, icon: Icon, dropdown, path }, index) => {
            const isDropdownOpen = openDropdowns.includes(index);
            const isChildActive = dropdown?.some((item) => item.path === pathname);

            return (
              <li key={title}>
                {dropdown ? (
                  <button
                    onClick={() => toggleDropdown(index)}
                    className={`relative z-20  w-full h-[56px] flex items-center justify-start px-3.5 py-3.5 bg-gray-100
                      ${isChildActive || dropdown.some((item) => isPathActive(item.path)) ? 'text-orange-orange45 border-r-2 border-r-orange-500' : 'text-gray-10'}`}
                  >
                    <div className={'flex flex-row items-center justify-between w-full gap-4'}>
                      <div className={`flex items-center gap-1.5 ${isChildActive ? 'text-orange-orange45' : ''}`}>
                        <Icon />
                        <span className={'font-pre-14-m-130'}>{title}</span>
                      </div>

                      <IconLine24ArrowDown
                        className={`transform transition-transform duration-300 
                          ${isDropdownOpen ? 'rotate-180' : ''} 
                          ${isChildActive ? 'text-orange-orange45' : ''}`}
                      />
                    </div>
                  </button>
                ) : (
                  <Link
                    href={path}
                    className={`relative z-20 w-full h-[56px] flex items-center px-3.5 py-3 hover:bg-gray-80 bg-gray-100
                      ${isPathActive(path) ? 'bg-orange-orange95 text-orange-orange45 before:absolute before:right-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-orange-500' : 'text-gray-20 before:absolute before:right-0 before:top-0 before:bottom-0 before:w-[1px] before:bg-gray-80'}`}
                  >
                    <div className={`flex items-center gap-1.5 ${pathname === path ? 'text-orange-orange50' : ''}`}>
                      <Icon />
                      <span className={`font-pre-14-m-130`}>{title}</span>
                    </div>
                  </Link>
                )}

                {dropdown && (
                  <div
                    className={`relative overflow-hidden transition-all duration-300 z-20
                    ${isDropdownOpen ? 'max-h-[500px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'}`}
                  >
                    {dropdown.map(({ title, path }) => (
                      <div key={title}>
                        <Link
                          href={path}
                          className={`w-full h-[56px] relative flex items-center px-3.5 py-3 bg-gray-95 hover:bg-gray-80
                          ${
                            isPathActive(path)
                              ? 'bg-orange-orange95 text-orange-orange45 before:absolute before:right-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-orange-500'
                              : 'text-gray-20'
                          }`}
                        >
                          <span className={'font-pre-14-m-130'}>{title}</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className={'absolute bottom-10 left-3.5 w-full h-[60px] text-gray-40 font-suit-12-750-130 z-10'}>
          Section Name
        </div>
      </div>
    </div>
  );
}
