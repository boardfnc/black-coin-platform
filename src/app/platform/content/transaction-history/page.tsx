import { redirect } from 'next/navigation';

import { dehydrate } from '@tanstack/react-query';

import { TransactionHistory } from '@/components/templates/platform/content/transaction-history';
import { ROUTES } from '@/constants';
import { userInformationShowService } from '@/services/platform/auth/user';
import { userInformationShowQueryKey } from '@/services/platform/auth/user.query';
import { generateQueryClient, QueryHydrate } from '@/utils/react-query';

export default async function TransactionHistoryPage() {
  const queryClient = await generateQueryClient();

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
        <TransactionHistory />
      </QueryHydrate>
    );
  } catch (_) {
    return redirect(ROUTES.PLATFORM.LOGIN);
  }
}
