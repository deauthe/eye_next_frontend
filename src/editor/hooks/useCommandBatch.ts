import { useCallback, useRef } from "react";
import { EditorCommand } from "../types/command.types";
import { useEditorHistory } from "./useEditorHistory";
import { CompositeCommand } from "../commands/commands";

export const useCommandBatch = () => {
  const batchRef = useRef<EditorCommand[]>([]);
  const { addCommand } = useEditorHistory();

  const startBatch = useCallback(() => {
    batchRef.current = [];
  }, []);

  const addToBatch = useCallback((command: EditorCommand) => {
    batchRef.current.push(command);
  }, []);

  const commitBatch = useCallback(
    (description?: string) => {
      if (batchRef.current.length === 0) return;

      if (batchRef.current.length === 1) {
        addCommand(batchRef.current[0]);
      } else {
        const batchCommand = new CompositeCommand(
          batchRef.current,
          description
        );
        addCommand(batchCommand);
      }

      batchRef.current = [];
    },
    [addCommand]
  );

  return {
    startBatch,
    addToBatch,
    commitBatch,
  };
};
