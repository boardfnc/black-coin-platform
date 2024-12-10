import type { PropsWithChildren } from 'react';

import Header from '@/components/organisms/layouts/wallet/Header';
import { Join, Login } from '@/components/organisms/wallet/modal';

export default function PlatformLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <>
      <Header />

      {children}

      <Login />

      <Join />
    </>
  );
}
