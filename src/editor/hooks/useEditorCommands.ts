import { useCallback } from "react";
import { useEditor } from "../store/editorStore";
import { useEditorHistory } from "./useEditorHistory";
import {
  TransformCommand,
  UpdateDesignCommand,
  RemoveDesignCommand,
} from "../commands/editorCommands";
import { Design, Transform } from "../types/editor.types";

export const useEditorCommands = () => {
  const editorState = useEditor();
  const { addCommand } = useEditorHistory();

  const handleTransform = useCallback(
    (designId: string, transform: Partial<Transform>) => {
      const design = editorState.designsByView[editorState.activeView].find(
        (d) => d.id === designId
      );
      if (!design) return;

      const command = new TransformCommand(
        designId,
        transform,
        design.transform
      );
      addCommand(command);
    },
    [editorState, addCommand]
  );

  const handleUpdateProperties = useCallback(
    (designId: string, updates: Partial<Design>) => {
      const design = editorState.designsByView[editorState.activeView].find(
        (d) => d.id === designId
      );
      if (!design) return;

      const command = new UpdateDesignCommand(designId, updates, design);
      addCommand(command);
    },
    [editorState, addCommand]
  );

  const handleRemoveDesign = useCallback(
    (designId: string) => {
      const design = editorState.designsByView[editorState.activeView].find(
        (d) => d.id === designId
      );
      if (!design) return;

      const command = new RemoveDesignCommand(designId, design);
      addCommand(command);
    },
    [editorState, addCommand]
  );

  return {
    handleTransform,
    handleUpdateProperties,
    handleRemoveDesign,
  };
};
