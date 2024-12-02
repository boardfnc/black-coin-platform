import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { ROUTES } from '@/constants';

export default async function NotFound() {
  if (process.env.APP_NAME === 'platform') {
    redirect(ROUTES.ROOT);
  }

  if (process.env.APP_NAME === 'admin') {
    const token = (await cookies()).get('token');

    if (token) redirect(ROUTES.ADMIN.MAIN);

    redirect(ROUTES.ADMIN.LOGIN);
  }
}
