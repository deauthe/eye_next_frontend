import { useEffect } from "react";
import { useEditor } from "../store/editorStore";
import { useEditorHistory } from "./useEditorHistory";
import { useHistoryPanel } from "./useHistoryPanel";

export const useTimeTravel = () => {
  const { snapshots, currentIndex } = useHistoryPanel();
  const { undo, redo } = useEditorHistory();

  useEffect(() => {
    const targetIndex = currentIndex;
    const currentSnapshotIndex = snapshots.length - 1;

    // Calculate how many steps we need to undo/redo
    const stepsToTravel = currentSnapshotIndex - targetIndex;

    if (stepsToTravel > 0) {
      // Need to undo
      for (let i = 0; i < stepsToTravel; i++) {
        undo();
      }
    } else if (stepsToTravel < 0) {
      // Need to redo
      for (let i = 0; i < Math.abs(stepsToTravel); i++) {
        redo();
      }
    }
  }, [currentIndex]);
};
