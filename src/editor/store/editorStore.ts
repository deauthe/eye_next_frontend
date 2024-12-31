"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { nanoid } from "nanoid";
import {
  EditorState,
  ViewType,
  Transform,
  Design,
  Position,
  DesignsByView,
} from "../types/editor.types";

// Separate interface for actions
interface EditorActions {
  // View Management
  setActiveView: (view: ViewType) => void;

  // Garment Management
  setGarmentColor: (color: string) => void;
  setGarmentType: (type: "tshirt" | "hoodie" | "sweatshirt") => void;

  // Design Management
  addDesign: (design: Design) => void;
  removeDesign: (designId: string) => void;
  updateDesign: (designId: string, updates: Partial<Design>) => void;
  setActiveDesign: (designId: string | null) => void;
  updateDesignTransform: (
    designId: string,
    transform: Partial<Transform>
  ) => void;

  // Position Management
  updateDesignPosition: (designId: string, position: Position) => void;
  updateDesignScale: (designId: string, scale: number) => void;
  updateDesignRotation: (designId: string, rotation: number) => void;
  resetDesignTransform: (designId: string) => void;

  // State Management
  setIsDragging: (dragging: boolean) => void;
  setIsEditing: (editing: boolean) => void;

  // Batch Operations
  duplicateDesign: (designId: string) => void;
  clearDesigns: () => void;
  moveDesignToView: (designId: string, targetView: ViewType) => void;
}

// Combine state and actions
interface EditorStore extends EditorState, EditorActions {}

const initialTransform: Transform = {
  position: { x: 0, y: 0 },
  scale: 1,
  rotation: 0,
};

const initialState: EditorState = {
  activeView: "front",
  garmentColor: "#ffffff",
  garmentType: "tshirt",
  designsByView: {
    front: [],
    back: [],
    shoulder: [],
  },
  activeDesignId: null,
  isDragging: false,
  isEditing: false,
};

export const useEditor = create<EditorStore>()(
  devtools(
    immer((set, get) => ({
      ...initialState,

      // View Management
      setActiveView: (view) =>
        set(
          (state) => {
            state.activeView = view;
            // Clear active design if no designs in new view
            if (state.designsByView[view].length === 0) {
              state.activeDesignId = null;
            } else if (
              !state.designsByView[view].find(
                (d) => d.id === state.activeDesignId
              )
            ) {
              // Set first design in new view as active if current active design isn't in this view
              state.activeDesignId = state.designsByView[view][0].id;
            }
          },
          false,
          "setActiveView"
        ),

      // Garment Management
      setGarmentColor: (color) =>
        set(
          (state) => {
            state.garmentColor = color;
          },
          false,
          "setGarmentColor"
        ),

      setGarmentType: (type) =>
        set(
          (state) => {
            state.garmentType = type;
          },
          false,
          "setGarmentType"
        ),

      // Design Management
      addDesign: (design) =>
        set(
          (state) => {
            const designWithDefaults = {
              ...design,
              transform: design.transform || { ...initialTransform },
            };
            state.designsByView[state.activeView].push(designWithDefaults);
            state.activeDesignId = design.id;
          },
          false,
          "addDesign"
        ),

      removeDesign: (designId) =>
        set(
          (state) => {
            const currentView = state.activeView;
            state.designsByView[currentView] = state.designsByView[
              currentView
            ].filter((d) => d.id !== designId);

            // Update active design if needed
            if (state.activeDesignId === designId) {
              const remainingDesigns = state.designsByView[currentView];
              state.activeDesignId =
                remainingDesigns.length > 0 ? remainingDesigns[0].id : null;
            }
          },
          false,
          "removeDesign"
        ),

      updateDesign: (designId, updates) =>
        set(
          (state) => {
            const design = state.designsByView[state.activeView].find(
              (d) => d.id === designId
            );
            if (design) {
              Object.assign(design, updates);
            }
          },
          false,
          "updateDesign"
        ),

      setActiveDesign: (designId) =>
        set(
          (state) => {
            state.activeDesignId = designId;
          },
          false,
          "setActiveDesign"
        ),

      updateDesignTransform: (designId, transform) =>
        set(
          (state) => {
            const design = state.designsByView[state.activeView].find(
              (d) => d.id === designId
            );
            if (design) {
              design.transform = {
                ...design.transform,
                ...transform,
              };
            }
          },
          false,
          "updateDesignTransform"
        ),

      updateDesignPosition: (designId, position) =>
        set(
          (state) => {
            const design = state.designsByView[state.activeView].find(
              (d) => d.id === designId
            );
            if (design) {
              design.transform.position = position;
            }
          },
          false,
          "updateDesignPosition"
        ),

      updateDesignScale: (designId, scale) =>
        set(
          (state) => {
            const design = state.designsByView[state.activeView].find(
              (d) => d.id === designId
            );
            if (design) {
              design.transform.scale = scale;
            }
          },
          false,
          "updateDesignScale"
        ),

      updateDesignRotation: (designId, rotation) =>
        set(
          (state) => {
            const design = state.designsByView[state.activeView].find(
              (d) => d.id === designId
            );
            if (design) {
              design.transform.rotation = rotation;
            }
          },
          false,
          "updateDesignRotation"
        ),

      resetDesignTransform: (designId) =>
        set(
          (state) => {
            const design = state.designsByView[state.activeView].find(
              (d) => d.id === designId
            );
            if (design) {
              design.transform = { ...initialTransform };
            }
          },
          false,
          "resetDesignTransform"
        ),

      // State Management
      setIsDragging: (dragging) =>
        set(
          (state) => {
            state.isDragging = dragging;
          },
          false,
          "setIsDragging"
        ),

      setIsEditing: (editing) =>
        set(
          (state) => {
            state.isEditing = editing;
          },
          false,
          "setIsEditing"
        ),

      // Batch Operations
      duplicateDesign: (designId) =>
        set(
          (state) => {
            const designToDuplicate = state.designsByView[
              state.activeView
            ].find((d) => d.id === designId);

            if (designToDuplicate) {
              const duplicatedDesign = {
                ...designToDuplicate,
                id: nanoid(),
                transform: {
                  ...designToDuplicate.transform,
                  position: {
                    x: designToDuplicate.transform.position.x + 20,
                    y: designToDuplicate.transform.position.y + 20,
                  },
                },
              };

              state.designsByView[state.activeView].push(duplicatedDesign);
              state.activeDesignId = duplicatedDesign.id;
            }
          },
          false,
          "duplicateDesign"
        ),

      clearDesigns: () =>
        set(
          (state) => {
            state.designsByView[state.activeView] = [];
            state.activeDesignId = null;
          },
          false,
          "clearDesigns"
        ),

      moveDesignToView: (designId, targetView) =>
        set(
          (state) => {
            const sourceView = state.activeView;
            const designToMove = state.designsByView[sourceView].find(
              (d) => d.id === designId
            );

            if (designToMove) {
              // Remove from current view
              state.designsByView[sourceView] = state.designsByView[
                sourceView
              ].filter((d) => d.id !== designId);

              // Add to target view
              state.designsByView[targetView].push(designToMove);

              // Update active design if needed
              if (state.activeDesignId === designId) {
                const remainingDesigns = state.designsByView[sourceView];
                state.activeDesignId =
                  remainingDesigns.length > 0 ? remainingDesigns[0].id : null;
              }
            }
          },
          false,
          "moveDesignToView"
        ),
    }))
  )
);
