import type { PropsWithChildren } from 'react';

import LoginModal from '@/components/organisms/modal/wallet/Login';

export default async function PlatformLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <>
      {children}

      <LoginModal />
    </>
  );
}
