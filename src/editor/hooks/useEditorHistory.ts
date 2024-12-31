import { create } from "zustand";
import { EditorCommand } from "../types/command.types";
import { useHistoryPanel } from "./useHistoryPanel";

interface EditorHistory {
  undoStack: EditorCommand[];
  redoStack: EditorCommand[];
  addCommand: (command: EditorCommand) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  clear: () => void;
}

export const useEditorHistory = create<EditorHistory>((set, get) => ({
  undoStack: [],
  redoStack: [],

  addCommand: (command: EditorCommand) => {
    // Execute the command
    command.execute();

    // Add to history panel
    useHistoryPanel.getState().addSnapshot({
      description: command.description,
      type: command.batchId ? "batch" : "single",
    });

    // Update the stacks
    set((state) => ({
      undoStack: [...state.undoStack, command],
      redoStack: [], // Clear redo stack when new command is added
    }));
  },

  undo: () => {
    const { undoStack, redoStack } = get();
    if (undoStack.length === 0) return;

    const command = undoStack[undoStack.length - 1];
    command.undo();

    set({
      undoStack: undoStack.slice(0, -1),
      redoStack: [...redoStack, command],
    });

    // Update history panel
    const { currentIndex } = useHistoryPanel.getState();
    useHistoryPanel.getState().goToSnapshot(Math.max(0, currentIndex - 1));
  },

  redo: () => {
    const { undoStack, redoStack } = get();
    if (redoStack.length === 0) return;

    const command = redoStack[redoStack.length - 1];
    command.execute();

    set({
      undoStack: [...undoStack, command],
      redoStack: redoStack.slice(0, -1),
    });

    // Update history panel
    const { currentIndex, snapshots } = useHistoryPanel.getState();
    useHistoryPanel
      .getState()
      .goToSnapshot(Math.min(snapshots.length - 1, currentIndex + 1));
  },

  canUndo: () => get().undoStack.length > 0,
  canRedo: () => get().redoStack.length > 0,

  clear: () => {
    set({ undoStack: [], redoStack: [] });
    useHistoryPanel.getState().clear();
  },
}));
