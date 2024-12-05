import { redirect } from 'next/navigation';

import { dehydrate } from '@tanstack/react-query';

import { Sell } from '@/components/templates/platform/content/sell';
import { ROUTES } from '@/constants';
import { userInformationShowService } from '@/services/platform/auth/user';
import { userInformationShowQueryKey } from '@/services/platform/auth/user.query';
import { generateQueryClient, QueryHydrate } from '@/utils/react-query';

export default async function SellPage() {
  const queryClient = await generateQueryClient();

  try {
    const data = await userInformationShowService();

    if (data == null) {
      return redirect(ROUTES.ROOT);
    }

    await queryClient.prefetchQuery({
      queryKey: userInformationShowQueryKey,
      queryFn: () => data,
    });

    const dehydratedState = dehydrate(queryClient);

    return (
      <QueryHydrate state={dehydratedState}>
        <Sell />
      </QueryHydrate>
    );
  } catch (_) {
    redirect(ROUTES.ROOT);
  }
}
