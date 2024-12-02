import '@/styles/globals.css';
import '@/styles/normalize.css';
import '@/styles/tailwind.css';

import { Suspense } from 'react';
import type { PropsWithChildren } from 'react';

import { Toast } from '@/components/atoms/alarms';
import { pretendardFont, suitFont } from '@/fonts';
import { metaTag } from '@/utils/metaTag';
import { QueryProvider } from '@/utils/react-query';

export const metadata = metaTag();

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang={'ko'}>
      <body className={`${pretendardFont.variable} ${suitFont.variable} font-pretendard antialiased`}>
        <Suspense>
          <QueryProvider>
            {children}

            <Toast />
          </QueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
