import { UserListId } from '@/components/templates/admin/content/user-manage';

interface IUserListIdPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserListIdPage({ params }: IUserListIdPageProps) {
  const { id } = await params;

  return <UserListId id={id} />;
}
