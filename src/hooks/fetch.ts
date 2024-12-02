/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/navigation';

import { useCallback, useState, useEffect } from 'react';

import { useToast } from './toast';

import type { IBaseResponse } from '@/services/_fetch/types';

import { ROUTES } from '@/constants';
import { isRefreshTokenError } from '@/utils';
import { isUnauthorizedError } from '@/utils/token';

interface IUseFetchOptions {
  enabled?: boolean;
  retry?: number;
}

export default function useFetch<T = IBaseResponse>(
  func: (options?: IUseFetchOptions) => Promise<T>,
  options?: IUseFetchOptions & {
    enabled?: boolean | undefined;
    deps?: any[];
  },
) {
  const router = useRouter();
  const { open: openToast } = useToast();

  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<IBaseResponse | undefined>(undefined);
  const [retryCount, setRetryCount] = useState(0);

  const execute = useCallback(
    async (currentOptions?: IUseFetchOptions) => {
      if (func == null) return;

      const maxRetries = currentOptions?.retry ?? 1;

      if (retryCount >= maxRetries) return;

      setIsLoading(true);

      try {
        const response = await func(currentOptions);

        if (typeof response === 'object' && response != null) {
          if (
            'status_code' in response &&
            response.status_code != null &&
            (typeof response.status_code === 'string' || typeof response.status_code === 'number')
          ) {
            const statusCode = response.status_code;

            if (isUnauthorizedError(statusCode) || isRefreshTokenError(statusCode)) {
              router.push(ROUTES.ADMIN.LOGIN);
              setData(undefined);
              return undefined;
            }
          }

          setData(response);
          return response;
        }

        throw response;
      } catch (error) {
        const errorResponse = error as IBaseResponse;

        if (!errorResponse?.status) {
          setRetryCount((prev) => prev + 1);
          setError(errorResponse);

          if (errorResponse?.message) {
            const message = errorResponse.status_code
              ? `Error! [${errorResponse.status_code}] 오류로 인해 해당 작업을 완료하지 못했어요.`
              : errorResponse.message;

            openToast({
              message,
              type: 'error',
            });
          }
        }

        return errorResponse;
      } finally {
        setIsLoading(false);
      }
    },
    [func, retryCount],
  );

  useEffect(() => {
    if (options?.enabled !== false) execute(options);
  }, [options?.enabled, ...(options?.deps || []), execute]);

  return { data, isLoading, error, execute };
}
