import { Design, Transform } from "./editor.types";

export interface EditorCommand {
  execute: () => void;
  undo: () => void;
  description: string;
  timestamp?: number;
  batchId?: string;
}

export interface CommandHistory {
  undoStack: EditorCommand[];
  redoStack: EditorCommand[];
}


export interface BatchCommand extends EditorCommand {
  commands: EditorCommand[];
}
