import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { ROUTES } from '@/constants';
import morganSystem from '@/utils/morgan';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  morganSystem(request, event);

  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  const isPageRequest = !pathname.includes('.');

  if (isPageRequest) {
    if (process.env.APP_NAME === 'platform') {
      if (pathname.includes(ROUTES.ADMIN.ROOT)) {
        return NextResponse.redirect(new URL(ROUTES.PLATFORM.HOME, request.url));
      }
    }

    if (process.env.APP_NAME === 'admin') {
      const token = request.cookies.get('token')?.value;

      if (token == null && pathname !== ROUTES.ADMIN.LOGIN) {
        return NextResponse.redirect(new URL(ROUTES.ADMIN.LOGIN, request.url));
      }

      if (!pathname.includes(ROUTES.ADMIN.ROOT + '/')) {
        if (!pathname.includes(ROUTES.ADMIN.MAIN)) {
          return NextResponse.redirect(new URL(ROUTES.ADMIN.MAIN, request.url));
        }
      }
    }
  }

  return response;
}
