import { HydrationBoundary } from '@tanstack/react-query';

import type { HydrationBoundaryProps } from '@tanstack/react-query';

function Hydrate(props: HydrationBoundaryProps) {
  return <HydrationBoundary {...props} />;
}

export default Hydrate;
