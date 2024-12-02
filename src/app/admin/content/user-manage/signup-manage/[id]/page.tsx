import { SignupManageId } from '@/components/templates/admin/content/user-manage';

interface ISignupManageIdPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SignupManageIdPage({ params }: ISignupManageIdPageProps) {
  const { id } = await params;

  return <SignupManageId id={id} />;
}
