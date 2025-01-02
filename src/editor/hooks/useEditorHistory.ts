import { create } from "zustand";
import { EditorCommand } from "../types/command.types";

interface EditorHistory {
  undoStack: EditorCommand[];
  redoStack: EditorCommand[];
  maxHistorySize: number;
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
  maxHistorySize: 20, // Keep last 20 commands

  addCommand: (command: EditorCommand) => {
    // Execute the command
    command.execute();

    set((state) => {
      const newUndoStack = [...state.undoStack, command];
      
      // Limit the undo stack size
      if (newUndoStack.length > state.maxHistorySize) {
        newUndoStack.shift(); // Remove oldest command
      }

      return {
        undoStack: newUndoStack,
        redoStack: [], // Clear redo stack when new command is added
      };
    });
  },

  undo: () => {
    const { undoStack, redoStack } = get();
    if (undoStack.length === 0) return;

    const command = undoStack[undoStack.length - 1];
    command.undo();

    set((state) => ({
      undoStack: state.undoStack.slice(0, -1),
      redoStack: [...state.redoStack, command].slice(-state.maxHistorySize),
    }));
  },

  redo: () => {
    const { undoStack, redoStack } = get();
    if (redoStack.length === 0) return;

    const command = redoStack[redoStack.length - 1];
    command.execute();

    set((state) => ({
      undoStack: [...state.undoStack, command].slice(-state.maxHistorySize),
      redoStack: state.redoStack.slice(0, -1),
    }));
  },

  canUndo: () => get().undoStack.length > 0,
  canRedo: () => get().redoStack.length > 0,

  clear: () => set({ undoStack: [], redoStack: [] }),
}));