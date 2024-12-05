import { create } from 'zustand';

interface ILoginStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useLogin = create<ILoginStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
