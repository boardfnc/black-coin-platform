import type { PropsWithChildren } from 'react';

import { Join, Login } from '@/components/organisms/wallet/modal';

export default async function PlatformLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <>
      {children}

      <Login />

      <Join />
    </>
  );
}
