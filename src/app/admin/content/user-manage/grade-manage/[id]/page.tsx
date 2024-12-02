import { GradeManageId } from '@/components/templates/admin/content/user-manage';

interface IGradeManageDetailPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    type: string;
    VVIP: number;
    VIP: number;
    general: number;
  }>;
}

export default async function GradeManageDetailPage({ params, searchParams }: IGradeManageDetailPageProps) {
  const { id } = await params;
  const { type, VVIP, VIP, general } = await searchParams;

  return <GradeManageId id={id} type={type} VVIP={VVIP} VIP={VIP} general={general} />;
}
