'use server';

import { cache } from 'react';

import { QueryClient } from '@tanstack/react-query';

export const generateQueryClient = cache(async () => new QueryClient());
