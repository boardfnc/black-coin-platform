import { redirect } from 'next/navigation';

import { dehydrate } from '@tanstack/react-query';

import { MyPage } from '@/components/templates/platform/content/my-page';
import { ROUTES } from '@/constants';
import { userInformationShowService } from '@/services/platform/auth/user';
import { userInformationShowQueryKey } from '@/services/platform/auth/user.query';
import { QueryHydrate } from '@/utils/react-query';
import getQueryClient from '@/utils/react-query/getQueryClient';

export default async function MyPagePage() {
  const { queryClient } = await getQueryClient();

  try {
    const data = await userInformationShowService();

    if (data == null) {
      return redirect(ROUTES.PLATFORM.LOGIN);
    }

    await queryClient.prefetchQuery({
      queryKey: userInformationShowQueryKey,
      queryFn: () => data,
    });

    const dehydratedState = dehydrate(queryClient);

    return (
      <QueryHydrate state={dehydratedState}>
        <MyPage />
      </QueryHydrate>
    );
  } catch (_) {
    return redirect(ROUTES.PLATFORM.LOGIN);
  }
}
