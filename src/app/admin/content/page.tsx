import { redirect } from 'next/navigation';

import ROUTES from '@/constants/routes';

export default function MainPage() {
  redirect(ROUTES.ADMIN.STATISTICS);
}
