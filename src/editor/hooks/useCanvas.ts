// @ts-nocheck
"use client";

import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { CurvatureFilter } from "../filters/CurvatureFilter";
import { useEditor } from "../store/editorStore";
import { ViewType, Design } from "../types/editor.types";

// Register the custom filter with fabric.js
fabric.Image.filters.Curvature = CurvatureFilter;

// Define mockup images for different views and garment types
const MOCKUP_IMAGES = {
  tshirt: {
    front: "/mockups/tshirt_front.png",
    back: "/mockups/tshirt_back.png",
    left: "/mockups/tshirt_front.png",
    right: "/mockups/tshirt_front.png",
  },
  hoodie: {
    front: "/mockups/tshirt_front.png",
    back: "/mockups/tshirt_back.png",
    left: "/mockups/tshirt_front.png",
    right: "/mockups/tshirt_front.png",
  },
};

const BLEND_MODES = {
  light: {
    mode: "multiply",
    alpha: 1,
  },
  dark: {
    mode: "screen",
    alpha: 0.8,
  },
  normal: {
    mode: "overlay",
    alpha: 0.9,
  },
};

// Define design placement areas for each view
export const DESIGN_AREAS = {
  tshirt: {
    front: {
      top: 200,
      left: 200,
      width: 200,
      height: 250,
      maxWidth: 280,
      maxHeight: 350,
    },
    back: {
      top: 200,
      left: 200,
      width: 200,
      height: 250,
      maxWidth: 280,
      maxHeight: 350,
    },
    left: {
      top: 200,
      left: 150,
      width: 100,
      height: 150,
      maxWidth: 140,
      maxHeight: 200,
    },
    right: {
      top: 200,
      left: 150,
      width: 100,
      height: 150,
      maxWidth: 140,
      maxHeight: 200,
    },
  },
  hoodie: {
    front: {
      top: 200,
      left: 200,
      width: 200,
      height: 250,
      maxWidth: 280,
      maxHeight: 350,
    },
    back: {
      top: 200,
      left: 200,
      width: 200,
      height: 250,
      maxWidth: 280,
      maxHeight: 350,
    },
    left: {
      top: 200,
      left: 150,
      width: 100,
      height: 150,
      maxWidth: 140,
      maxHeight: 200,
    },
    right: {
      top: 200,
      left: 150,
      width: 100,
      height: 150,
      maxWidth: 140,
      maxHeight: 200,
    },
  },
};

export const useCanvas = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const mockupRef = useRef<fabric.Image | null>(null);
  const designRefsMap = useRef<Map<string, fabric.Image>>(new Map());
  const isInitializedRef = useRef(false);
  const isModifyingRef = useRef(false);
  const previousViewRef = useRef<ViewType | null>(null);

  const {
    designsByView,
    activeView,
    activeDesignId,
    garmentColor,
    garmentType,
    updateDesignTransform,
    setActiveDesign,
  } = useEditor();

  // Helper function to determine color brightness
  const getBrightness = (color: string): number => {
    // Remove # if present
    color = color.replace("#", "");

    // Convert hex to RGB
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);

    // Calculate perceived brightness (ITU-R BT.709)
    return (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255;
  };

  // Apply color to mockup
  const applyGarmentColor = (mockup: fabric.Image, color: string) => {
    const colorBrightness = getBrightness(color);
    const blendMode =
      colorBrightness > 0.5 ? BLEND_MODES.light : BLEND_MODES.dark;

    mockup.filters = [
      new fabric.Image.filters.BlendColor({
        color: color,
        mode: blendMode.mode,
        alpha: blendMode.alpha,
      }),
    ];

    mockup.applyFilters();
  };

  const applyCurvatureToObject = (
    fabricObject: fabric.Image,
    design: Design
  ) => {
    if (!design.curvature?.enabled) {
      fabricObject.filters =
        fabricObject.filters?.filter((f) => f.type !== "Curvature") || [];
      fabricObject.applyFilters();
      return;
    }

    // Find existing curvature filter or create new one
    let curvatureFilter = fabricObject.filters?.find(
      (f) => f instanceof CurvatureFilter
    ) as CurvatureFilter;

    if (!curvatureFilter) {
      curvatureFilter = new CurvatureFilter({
        intensity: design.curvature.intensity,
        direction: design.curvature.direction,
        perspective: design.curvature.perspective,
        waveform: design.curvature.waveform,
        adaptiveEdges: design.curvature.adaptiveEdges,
        meshDensity: design.curvature.meshDensity,
      });

      // Add to filters array
      if (!fabricObject.filters) {
        fabricObject.filters = [];
      }
      fabricObject.filters.push(curvatureFilter);
    } else {
      // Update existing filter
      Object.assign(curvatureFilter, {
        intensity: design.curvature.intensity,
        direction: design.curvature.direction,
        perspective: design.curvature.perspective,
        waveform: design.curvature.waveform,
        adaptiveEdges: design.curvature.adaptiveEdges,
        meshDensity: design.curvature.meshDensity,
      });
    }

    fabricObject.applyFilters();
  };

  //  function for blend modes
  const applyBlendMode = (fabricObject: fabric.Image, design: Design) => {
    // Set opacity
    const currentOpacity = design.opacity ?? 1;

    // Apply blend mode
    const blendMode = design.blendMode || "normal";
    let compositeOperation = "source-over";

    switch (blendMode) {
      case "multiply":
        compositeOperation = "multiply";
        break;
      case "screen":
        compositeOperation = "screen";
        break;
      case "overlay":
        compositeOperation = "overlay";
        break;
      case "darken":
        compositeOperation = "darken";
        break;
      case "lighten":
        compositeOperation = "lighten";
        break;
    }

    fabricObject.set({
      globalCompositeOperation: compositeOperation,
      opacity: currentOpacity,
    });
  };

  const handleObjectModification = (obj: fabric.Image) => {
    if (!obj || isModifyingRef.current) return;

    let designId: string | null = null;
    designRefsMap.current.forEach((fabricObj, id) => {
      if (fabricObj === obj) designId = id;
    });

    if (!designId) return;

    isModifyingRef.current = true;
    try {
      updateDesignTransform(designId, {
        position: {
          x: obj.left || 0,
          y: obj.top || 0,
        },
        scale: obj.scaleX || 1,
        rotation: obj.angle || 0,
      });
    } finally {
      isModifyingRef.current = false;
    }
  };

  const setupCanvasEventHandlers = (canvas: fabric.Canvas) => {
    // Selection events
    canvas.on("selection:created", (e) => {
      if (isModifyingRef.current) return;
      const selectedObject = e.selected?.[0];
      if (selectedObject) {
        designRefsMap.current.forEach((fabricObj, designId) => {
          if (fabricObj === selectedObject) {
            setActiveDesign(designId);
          }
        });
      }
    });

    canvas.on("selection:cleared", () => {
      if (!isModifyingRef.current) {
        setActiveDesign(null);
        // Ensure all designs remain visible after deselection
        designsByView[activeView].forEach((design) => {
          const obj = designRefsMap.current.get(design.id);
          if (obj) {
            obj.set({
              opacity: design.opacity || 1,
              visible: design.visible !== false,
            });
          }
        });
        canvas.renderAll();
      }
    });

    // Object modification events
    canvas.on("object:modified", (e) => {
      const obj = e.target as fabric.Image;
      handleObjectModification(obj);
    });

    // Real-time transform events
    const handleTransform = (e: fabric.IEvent) => {
      const obj = e.target as fabric.Image;
      if (obj) {
        handleObjectModification(obj);
      }
    };

    canvas.on("object:scaling", handleTransform);
    canvas.on("object:rotating", handleTransform);
    canvas.on("object:moving", handleTransform);
  };

  const renderView = async (view: ViewType): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        if (!canvasRef.current) {
          reject(new Error("Canvas not initialized"));
          return;
        }

        const canvas = canvasRef.current;

        // Store current view state
        const currentView = activeView;
        const currentDesigns = [...designsByView[currentView]];

        // Switch to requested view
        loadMockup(view, garmentType);

        // Wait for mockup to load
        setTimeout(() => {
          try {
            // Update canvas with designs for this view
            updateCanvasObjects();

            // Render the canvas
            canvas.renderAll();

            // Restore original view
            loadMockup(currentView, garmentType);
            setTimeout(() => {
              updateCanvasObjects();
              canvas.renderAll();
              resolve();
            }, 100);
          } catch (error) {
            reject(error);
          }
        }, 100);
      } catch (error) {
        reject(error);
      }
    });
  };

  const updateCanvasObjects = () => {
    if (
      !canvasRef.current ||
      !isInitializedRef.current ||
      isModifyingRef.current
    )
      return;

    const canvas = canvasRef.current;
    const currentDesigns = designsByView[activeView];

    // Sort designs by zIndex (if available) or keep original order
    const sortedDesigns = [...currentDesigns].sort(
      (a, b) => (a.zIndex || 0) - (b.zIndex || 0)
    );

    isModifyingRef.current = true;
    try {
      // Remove deleted designs
      const designIdsInStore = new Set(currentDesigns.map((d) => d.id));
      const objectsToRemove: fabric.Image[] = [];

      designRefsMap.current.forEach((fabricObj, designId) => {
        if (!designIdsInStore.has(designId)) {
          objectsToRemove.push(fabricObj);
          designRefsMap.current.delete(designId);
        }
      });

      objectsToRemove.forEach((obj) => {
        canvas.remove(obj);
      });
      // Ensure mockup stays at the bottom
      if (mockupRef.current) {
        canvas.sendToBack(mockupRef.current);
      }

      // Update or add designs with blend modes
      sortedDesigns.forEach((design, index) => {
        const existingObject = designRefsMap.current.get(design.id);

        if (existingObject) {
          // Update existing design
          existingObject.set({
            left: design.transform.position.x,
            top: design.transform.position.y,
            scaleX: design.transform.scale,
            scaleY: design.transform.scale,
            angle: design.transform.rotation,
            visible: design.visible !== false,
            selectable: !design.locked,
            evented: !design.locked,
            originX: "center",
            originY: "center",
            opacity: design.opacity || 1,
          });

          // Apply curvature filter
          applyCurvatureToObject(existingObject, design);

          applyBlendMode(existingObject, design);
          existingObject.setCoords();

          // Ensure design stays above mockup
          existingObject.bringToFront();
          canvas.bringForward(existingObject, true);
        } else {
          // Add new design
          fabric.Image.fromURL(design.imageUrl, (img) => {
            if (!canvas || !isInitializedRef.current) return;

            img.set({
              left: design.transform.position.x,
              top: design.transform.position.y,
              scaleX: design.transform.scale,
              scaleY: design.transform.scale,
              angle: design.transform.rotation,
              visible: design.visible !== false,
              selectable: !design.locked,
              evented: !design.locked,
              originX: "center",
              originY: "center",
              opacity: design.opacity || 1,
            });

            // Apply curvature filter
            applyCurvatureToObject(img, design);

            applyBlendMode(img, design);
            designRefsMap.current.set(design.id, img);
            canvas.add(img);
            canvas.moveTo(img, index);

            // Ensure new design stays above mockup
            img.bringToFront();
            canvas.bringForward(img, true);

            if (design.id === activeDesignId) {
              canvas.setActiveObject(img);
            }

            img.setCoords();
          });
        }
      });

      canvas.renderAll();
    } finally {
      isModifyingRef.current = false;
    }
  };

  const loadMockup = (view: ViewType, type: string) => {
    const canvas = canvasRef.current;
    if (!canvas || !isInitializedRef.current) return;

    fabric.Image.fromURL(MOCKUP_IMAGES[type][view], (img) => {
      if (!canvas || !isInitializedRef.current) return;

      try {
        // Safely remove old mockup
        if (mockupRef.current) {
          canvas.remove(mockupRef.current);
          mockupRef.current = null;
        }

        // Setup new mockup
        mockupRef.current = img;
        img.set({
          selectable: false,
          evented: false,
          left: 0,
          top: 0,
          scaleX: canvas.width! / img.width!,
          scaleY: canvas.height! / img.height!,
        });

        applyGarmentColor(img, garmentColor);

        // Safely update canvas
        const objects = [...canvas.getObjects()];
        objects.forEach((obj) => canvas.remove(obj));

        canvas.add(img);
        canvas.sendToBack(img);
        img.moveTo(0);

        // Re-add all designs
        designsByView[activeView].forEach((design) => {
          const designObject = designRefsMap.current.get(design.id);
          if (designObject) {
            canvas.add(designObject);
            designObject.bringToFront();
            if (design.id === activeDesignId) {
              canvas.setActiveObject(designObject);
            }
          }
        });

        canvas.renderAll();
      } catch (error) {
        console.error("Error updating mockup:", error);
      }
    });
  };

  // Initialize canvas
  const initCanvas = (htmlCanvas: HTMLCanvasElement) => {
    if (canvasRef.current || !htmlCanvas) return;

    try {
      const canvas = new fabric.Canvas(htmlCanvas, {
        width: 500,
        height: 600,
        backgroundColor: "#f5f5f5",
      });

      canvasRef.current = canvas;
      isInitializedRef.current = true;
      previousViewRef.current = activeView;

      setupCanvasEventHandlers(canvas);
      loadMockup(activeView, garmentType);
    } catch (error) {
      console.error("Error initializing canvas:", error);
    }
  };

  // Effects

  // Handle view changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || previousViewRef.current === activeView) return;

    try {
      // Save the new view reference first
      previousViewRef.current = activeView;

      // Clear design refs for new view
      designRefsMap.current = new Map();

      // Load the new mockup
      loadMockup(activeView, garmentType);
    } catch (error) {
      console.error("Error switching views:", error);
    }
  }, [activeView, garmentType]);

  // Sync designs
  useEffect(() => {
    if (!isModifyingRef.current) {
      try {
        updateCanvasObjects();
      } catch (error) {
        console.error("Error updating canvas objects:", error);
      }
    }
  }, [designsByView, activeView]);

  // Cleanup
  useEffect(() => {
    return () => {
      const canvas = canvasRef.current;
      if (canvas) {
        try {
          canvas.getObjects().forEach((obj) => canvas.remove(obj));
          canvas.dispose();
          canvasRef.current = null;
          mockupRef.current = null;
          designRefsMap.current.clear();
          isInitializedRef.current = false;
        } catch (error) {
          console.error("Error cleaning up canvas:", error);
        }
      }
    };
  }, []);

  return {
    initCanvas,
    renderView,
    cleanupCanvas: () => {},
    canvasRef,
  };
};
