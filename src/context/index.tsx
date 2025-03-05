import { create } from 'zustand'

type Store = {
  depth: number;
  setDepth: (e: number) => void;
}

export const useStore = create<Store>()((set) => ({
  depth: 0,
  setDepth: (e) => set({ depth: e }),
})) 