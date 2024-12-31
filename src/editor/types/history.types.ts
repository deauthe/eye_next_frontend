export interface HistoryState {
  currentIndex: number;
  snapshots: Array<{
    id: string;
    timestamp: number;
    description: string;
    batchId?: string;
    type: "single" | "batch";
    icon?: string;
  }>;
}
