export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const BASE_API_URL =
  process.env.APP_NAME === 'platform' ? process.env.PLATFORM_BASE_API : process.env.ADMIN_BASE_API;

export const IS_ADMIN = process.env.NEXT_PUBLIC_APP_NAME === 'admin';
