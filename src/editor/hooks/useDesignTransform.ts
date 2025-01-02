// @ts-nocheck
"use client";
import { useCallback, useEffect } from "react";
import { useEditor } from "./useEditor";
import { Transform } from "../types/editor.types";

export const useDesignTransform = () => {
  const { design, updateDesignTransform } = useEditor();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!design) return;

      switch (e.key) {
        case "ArrowUp":
          updateDesignTransform({
            position: {
              ...design.transform.position,
              y: design.transform.position.y - 1,
            },
          });
          break;
        case "ArrowDown":
          updateDesignTransform({
            position: {
              ...design.transform.position,
              y: design.transform.position.y + 1,
            },
          });
          break;
        case "ArrowLeft":
          updateDesignTransform({
            position: {
              ...design.transform.position,
              x: design.transform.position.x - 1,
            },
          });
          break;
        case "ArrowRight":
          updateDesignTransform({
            position: {
              ...design.transform.position,
              x: design.transform.position.x + 1,
            },
          });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [design, updateDesignTransform]);

  return {
    design,
    updateDesignTransform,
  };
};
