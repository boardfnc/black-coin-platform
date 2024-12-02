import { create } from 'zustand';

import type { IToastStore } from '@/components/atoms/alarms/Toast.types';

export const useToastStore = create<IToastStore>((set) => ({
  message: '',
  type: 'info',
  isOpen: false,
  duration: 3000,
  setToast: (toast: Partial<IToastStore>) => set((state) => ({ ...state, ...toast })),
}));
