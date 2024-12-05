import { redirect } from 'next/navigation';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import Header from '@/components/organisms/layouts/wallet/Header';
import { Wallet } from '@/components/templates/wallet';
import { ROUTES } from '@/constants';
import { automaticLoginService } from '@/services/admin/auth/login';
import { automaticLoginQueryKey } from '@/services/admin/auth/login.query';
import { QueryHydrate } from '@/utils/react-query';

interface IWalletPageProps {
  searchParams: Promise<{
    code: string;
    name: string;
    'essential-key': string;
    phone: string;
    bank: string;
    'bank-account': string;
    'bank-account-holder': string;
  }>;
}

export default async function WalletPage({ searchParams }: IWalletPageProps) {
  const queryClient = new QueryClient();

  const parseSearchParams = await searchParams;

  const params = {
    code: parseSearchParams['code'],
    essentialKey: parseSearchParams['essential-key'],
    name: parseSearchParams['name'],
    phone: parseSearchParams['phone'],
    bank: parseSearchParams['bank'],
    bankAccount: parseSearchParams['bank-account'],
    bankAccountHolder: parseSearchParams['bank-account-holder'],
  };

  if (
    !params.code ||
    !params.essentialKey ||
    !params.name ||
    !params.phone ||
    !params.bank ||
    !params.bankAccount ||
    !params.bankAccountHolder
  ) {
    // redirect(ROUTES.ROOT);
  }

  const data = await automaticLoginService({
    code: params.code,
    esntl_key: params.essentialKey,
  });

  await queryClient.prefetchQuery({
    queryKey: automaticLoginQueryKey,
    queryFn: () => data,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <QueryHydrate state={dehydratedState}>
      <Header />

      <Wallet />
    </QueryHydrate>
  );
}
