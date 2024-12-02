import { create } from 'zustand';

type TRefetchStore = {
  sideBarRefetch: (() => void) | null;
  setSideBarRefetch: (refetch: () => void) => void;
};

export const useRefetch = create<TRefetchStore>((set) => ({
  sideBarRefetch: null,
  setSideBarRefetch: (refetch) => set({ sideBarRefetch: refetch }),
}));
