import { create } from 'zustand';

interface IJoinStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useJoin = create<IJoinStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
