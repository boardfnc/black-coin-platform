import type { NextRequest } from 'next/server';

export const getRequestIP = (request: NextRequest) => {
  let ipAddress = undefined;

  if (!ipAddress) ipAddress = request.headers.get('X-Forwarded-For');
  if (!ipAddress) ipAddress = request.headers.get('Proxy-Client-IP');
  if (!ipAddress) ipAddress = request.headers.get('WL-Proxy-Client-IP');
  if (!ipAddress) ipAddress = request.headers.get('HTTP_CLIENT_IP');
  if (!ipAddress) ipAddress = request.headers.get('HTTP_X_FORWARDED_FOR');

  return ipAddress;
};
