import router from 'next/router';

import { useToast } from './toast';

import type { IBaseResponse } from '@/services/_fetch/types';

import ROUTES from '@/constants/routes';
import { isRefreshTokenError } from '@/utils';
import { isUnauthorizedError } from '@/utils/token';

interface IUseFetchOptions {
  _?: boolean;
}

interface IRequestOptions {
  visibleErrorMessage?: boolean;
}

export default function useRequest() {
  const { open: openToast } = useToast();

  const request = async <T = IBaseResponse,>(
    func: (options?: IUseFetchOptions) => Promise<T>,
    options?: IRequestOptions,
  ) => {
    try {
      const response = await func();

      if (typeof response === 'object' && response != null) {
        if (
          'status_code' in response &&
          response.status_code != null &&
          (typeof response.status_code === 'string' || typeof response.status_code === 'number')
        ) {
          const statusCode = response.status_code;

          if (isUnauthorizedError(statusCode) || isRefreshTokenError(statusCode)) {
            router.push(ROUTES.ADMIN.LOGIN);
            return undefined;
          }

          if ('status' in response && !response.status) {
            const message =
              options?.visibleErrorMessage && 'message' in response && typeof response.message === 'string'
                ? response.message
                : `Error! [${response.status_code}] 오류로 인해 해당 작업을 완료하지 못했어요.`;

            openToast({
              message,
              type: 'error',
            });
          }
        }

        return response;
      }
    } catch (error) {
      const errorResponse = error as IBaseResponse;

      if (errorResponse != null && errorResponse.message != null) {
        const message = errorResponse.status_code
          ? `Error! [${errorResponse.status_code}] 오류로 인해 해당 작업을 완료하지 못했어요.`
          : errorResponse.message;

        openToast({
          message,
          type: 'error',
        });
      }

      return errorResponse;
    }
  };

  return { request };
}
