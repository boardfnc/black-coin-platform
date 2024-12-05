'use server';

import { cache } from 'react';

import { QueryClient } from '@tanstack/query-core';

export const generateQueryClient = cache(async () => new QueryClient());
