import type { PropsWithChildren } from 'react';

export default async function PlatformLayout({ children }: Readonly<PropsWithChildren>) {
  return <>{children}</>;
}
