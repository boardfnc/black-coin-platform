import { useCallback } from 'react';

import type { IToastProps, IToastHook } from '@/components/atoms/alarms/Toast.types';

import { useToastStore } from '@/stores/toast';

export const useToast = (): IToastHook => {
  const setToast = useToastStore((state) => state.setToast);

  const open = useCallback(
    ({ message, type = 'info', duration = 3000 }: IToastProps) => {
      setToast({
        message,
        type,
        isOpen: true,
        duration,
      });
    },
    [setToast],
  );

  const close = useCallback(() => {
    setToast({
      message: '',
      type: 'info',
      isOpen: false,
      duration: 3000,
    });
  }, [setToast]);

  return { open, close };
};
