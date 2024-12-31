import { create } from "zustand";

interface HistoryState {
  snapshots: Array<{
    id: string;
    timestamp: number;
    description: string;
    type: "transform" | "layer" | "color" | "batch";
  }>;
  currentIndex: number;
  goToSnapshot: (index: number) => void;
  addSnapshot: (
    snapshot: Omit<HistoryState["snapshots"][0], "id" | "timestamp">
  ) => void;
  clear: () => void;
}

export const useHistoryPanel = create<HistoryState>((set) => ({
  snapshots: [],
  currentIndex: -1,

  goToSnapshot: (index) => set({ currentIndex: index }),

  addSnapshot: (snapshot) =>
    set((state) => ({
      snapshots: [
        ...state.snapshots,
        {
          ...snapshot,
          id: Date.now().toString(),
          timestamp: Date.now(),
        },
      ],
      currentIndex: state.snapshots.length,
    })),

  clear: () => set({ snapshots: [], currentIndex: -1 }),
}));
