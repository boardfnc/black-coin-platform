import { GeneralUserListId } from '@/components/templates/admin/content/user-manage';

interface IGeneralUserListIdPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function GeneralUserListIdPage({ params }: IGeneralUserListIdPageProps) {
  const { id } = await params;

  return <GeneralUserListId id={id} />;
}
