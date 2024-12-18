import { dehydrate } from '@tanstack/react-query';

import { Home } from '@/components/templates/platform/content/home';
import { QueryHydrate } from '@/utils/react-query';
import getQueryClient from '@/utils/react-query/getQueryClient';

export default async function HomePage() {
  const { queryClient } = await getQueryClient();

  const dehydratedState = dehydrate(queryClient);

  return (
    <QueryHydrate state={dehydratedState}>
      <Home />
    </QueryHydrate>
  );
}
