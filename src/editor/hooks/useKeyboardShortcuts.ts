import { useEffect } from "react";
import { useEditorHistory } from "./useEditorHistory";

export const useKeyboardShortcuts = () => {
  const { undo, redo, canUndo, canRedo } = useEditorHistory();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const controlKey = isMac ? e.metaKey : e.ctrlKey;

      if (controlKey && e.key.toLowerCase() === "z") {
        if (e.shiftKey && canRedo()) {
          e.preventDefault();
          redo();
        } else if (!e.shiftKey && canUndo()) {
          e.preventDefault();
          undo();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, canUndo, canRedo]);
};
