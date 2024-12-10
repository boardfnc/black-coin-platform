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

export default async function WalletPage(_: IWalletPageProps) {
  return <Wallet />;
}
