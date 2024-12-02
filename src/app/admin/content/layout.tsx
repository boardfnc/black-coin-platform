import { cookies } from 'next/headers';

import type { PropsWithChildren } from 'react';

import { AdminProvider } from '@/components/atoms/provider/AdminProvider';
import { AdminLayoutProvider } from '@/components/organisms/layouts/admin';

import '@/styles/globals.css';
import '@/styles/normalize.css';
import '@/styles/tailwind.css';

export default async function AdminLayout({ children }: Readonly<PropsWithChildren>) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  const parsedToken = (() => {
    try {
      if (!token || !token.value) return null;

      const tokenValue = token.value;
      if (typeof tokenValue !== 'string' || tokenValue === '{}' || tokenValue === '{"token":""}') {
        return null;
      }

      return JSON.parse(tokenValue);
    } catch (_) {
      return null;
    }
  })();

  return (
    <>
      <AdminProvider author={parsedToken}>
        <AdminLayoutProvider>{children}</AdminLayoutProvider>
      </AdminProvider>
    </>
  );
}
