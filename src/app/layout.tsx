import '@/styles/globals.css';
import '@/styles/normalize.css';
import '@/styles/tailwind.css';

import Head from 'next/head';

import { Suspense } from 'react';
import type { PropsWithChildren } from 'react';

import { dehydrate } from '@tanstack/react-query';

import { Toast } from '@/components/atoms/alarms';
import { pretendardFont, suitFont } from '@/fonts';
import { metaTag } from '@/utils/metaTag';
import { QueryHydrate, QueryProvider } from '@/utils/react-query';
import getQueryClient from '@/utils/react-query/getQueryClient';

export const metadata = metaTag();

export default async function RootLayout({ children }: Readonly<PropsWithChildren>) {
  const { queryClient } = await getQueryClient();

  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang={'ko'}>
      <Head>
        <meta httpEquiv={'Content-Security-Policy'} content={'upgrade-insecure-requests'} />
      </Head>

      <body className={`${pretendardFont.variable} ${suitFont.variable} font-pretendard antialiased`}>
        <Suspense>
          <QueryProvider>
            <QueryHydrate state={dehydratedState}>{children}</QueryHydrate>

            <Toast />
          </QueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
