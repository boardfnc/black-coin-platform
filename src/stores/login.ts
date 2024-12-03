import { create } from 'zustand';

interface LoginStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useLogin = create<LoginStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
