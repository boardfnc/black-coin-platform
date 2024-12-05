import type { PropsWithChildren } from 'react';

import { PlatformHeader, PlatformFooter } from '@/components/organisms/layouts/platform';

export default async function PlatformLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <>
      <PlatformHeader />

      {children}

      <PlatformFooter />
    </>
  );
}
