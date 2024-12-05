import Header from '@/components/organisms/layouts/wallet/Header';
import { Wallet } from '@/components/templates/wallet';

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

  return (
    <>
      <Header />

      <Wallet />
    </>
  );
}
