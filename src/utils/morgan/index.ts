import type { NextFetchEvent, NextRequest } from 'next/server';

import { getRequestIP } from './lib';

import dayjs from '@/utils/dayjs';

const morganSystem = (request: NextRequest, _event: NextFetchEvent) => {
  if (process.env.NODE_ENV !== 'production') return null;

  const debugText = [
    `\x1b[30m{`,
    `\x1b[32mDATE\x1b[0m: ${dayjs().format('YYYY-MM-DD HH:mm:ss')},`,
    `\x1b[32mIP\x1b[0m: ${getRequestIP(request)},`,
    `\x1b[32mUSER-AGENT\x1b[0m: ${request.headers.get('user-agent')},`,
    `\x1b[32mURL\x1b[0m: ${request.method} | ${request.nextUrl.href} | ${request.headers.get('referer')},`,
    `\x1b[32mACCEPT\x1b[0m: ${request.headers.get('accept')} | ${request.headers.get('accept-encoding')} | ${request.headers.get('accept-language')},`,
    `\x1b[30m},`,
  ].join('\n');

  console.info(debugText);

  return debugText;
};
export default morganSystem;
