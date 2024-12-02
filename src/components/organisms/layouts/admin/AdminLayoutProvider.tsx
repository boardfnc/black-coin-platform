'use client';

import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import Header from './Header';
import SideBar from './SideBar';

export default function AdminLayoutProvider({ children }: PropsWithChildren) {
  const [isOpen] = useState(true);

  return (
    <div className={'flex flex-col min-h-screen'}>
      <div className={'flex'}>
        <SideBar isOpen={isOpen} />
        <div className={`bg-gray-100 flex-1 transition-all duration-300 ${isOpen ? 'ml-[250px]' : 'ml-[60px]'}`}>
          <Header />

          <main className={'w-[1500px] h-full min-h-screen pt-[60px] pb-[60px]'}>{children}</main>
        </div>
      </div>
    </div>
  );
}
