import { dehydrate } from '@tanstack/react-query';

import { Wallet } from '@/components/templates/wallet';
import { exchangeCheckService } from '@/services/platform/coin/exchange';
import { exchangeCheckQueryKey } from '@/services/platform/coin/exchange.query';
import { QueryHydrate } from '@/utils/react-query';
import getQueryClient from '@/utils/react-query/getQueryClient';

interface IWalletPageProps {
  searchParams: Promise<{
    code: string;
    name: string;
    'essential-key': string;
    phone: string;
    bank: string;
    'bank-account': string;
    'bank-account-holder': string;
    'auto-login': string;
  }>;
}

export default async function WalletPage(_: IWalletPageProps) {
  const { queryClient, isLogin } = await getQueryClient();

  if (isLogin) {
    queryClient.prefetchQuery({
      queryKey: exchangeCheckQueryKey,
      queryFn: () => exchangeCheckService(),
    });
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <QueryHydrate state={dehydratedState}>
      <Wallet />
    </QueryHydrate>
  );
}
