"use client";

import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { useEditor } from "../store/editorStore";
import { ViewType } from "../types/editor.types";

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
  const previousViewRef = useRef<ViewType | null>(null);

  const {
    designsByView,
    activeView,
    activeDesignId,
    garmentColor,
    garmentType,
    updateDesignTransform,
  } = useEditor();

  // Initialize canvas
  const initCanvas = (htmlCanvas: HTMLCanvasElement) => {
    if (canvasRef.current || !htmlCanvas) return;

    const canvas = new fabric.Canvas(htmlCanvas, {
      width: 600,
      height: 800,
      backgroundColor: "#f5f5f5",
    });

    canvasRef.current = canvas;
    isInitializedRef.current = true;
    previousViewRef.current = activeView;

    // Load initial mockup only after canvas is initialized
    loadMockup(activeView, garmentType);
  };

  // Save design states before view change
  const saveDesignStates = () => {
    if (!canvasRef.current || !previousViewRef.current) return;

    designRefsMap.current.forEach((fabricObj, designId) => {
      const transform = {
        position: {
          x: fabricObj.left || 0,
          y: fabricObj.top || 0,
        },
        scale: fabricObj.scaleX || 1,
        rotation: fabricObj.angle || 0,
      };

      // Save the current transform state
      updateDesignTransform(designId, transform);
    });
  };

  // Handle view changes
  useEffect(() => {
    if (previousViewRef.current && previousViewRef.current !== activeView) {
      // Save states of current view before switching
      saveDesignStates();

      // Update previous view reference
      previousViewRef.current = activeView;

      // Clear current design refs as we're switching views
      designRefsMap.current.clear();

      // Load new view
      if (canvasRef.current) {
        loadMockup(activeView, garmentType);
      }
    }
  }, [activeView]);

  // Load mockup image with safety checks
  const loadMockup = (view: ViewType, type: string) => {
    if (!canvasRef.current || !isInitializedRef.current) return;

    const canvas = canvasRef.current;

    fabric.Image.fromURL(MOCKUP_IMAGES[type][view], (img) => {
      if (!canvas || !isInitializedRef.current) return;

      // Remove existing mockup if it exists
      if (mockupRef.current) {
        canvas.remove(mockupRef.current);
        mockupRef.current = null;
      }

      mockupRef.current = img;

      // Set mockup properties
      img.set({
        selectable: false,
        evented: false,
        left: 0,
        top: 0,
        scaleX: canvas.width! / img.width!,
        scaleY: canvas.height! / img.height!,
      });

      // Apply garment color
      applyGarmentColor(img, garmentColor);

      // Safely clear and update canvas
      try {
        canvas.clear();
        canvas.add(img);
        img.moveTo(0);

        // Re-add all designs for the current view
        const currentDesigns = designsByView[activeView];
        currentDesigns.forEach((design) => {
          const designObject = designRefsMap.current.get(design.id);
          if (designObject) {
            canvas.add(designObject);
            if (design.id === activeDesignId) {
              canvas.setActiveObject(designObject);
            }
          }
        });

        canvas.renderAll();
      } catch (error) {
        console.error("Error updating canvas:", error);
      }
    });
  };

  // Load designs for current view
  const loadDesignsForView = (canvas: fabric.Canvas) => {
    const currentDesigns = designsByView[activeView];

    // Clear existing designs
    designRefsMap.current.forEach((fabricObj) => {
      canvas.remove(fabricObj);
    });
    designRefsMap.current.clear();

    // Load designs for current view
    currentDesigns.forEach((design) => {
      fabric.Image.fromURL(design.imageUrl, (img) => {
        if (!canvas || !isInitializedRef.current) return;

        img.set({
          left: design.transform.position.x,
          top: design.transform.position.y,
          scaleX: design.transform.scale,
          scaleY: design.transform.scale,
          angle: design.transform.rotation,
          originX: "center",
          originY: "center",
        });

        designRefsMap.current.set(design.id, img);
        canvas.add(img);

        if (design.id === activeDesignId) {
          canvas.setActiveObject(img);
        }
      });
    });
  };

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
  // Handle design updates
  useEffect(() => {
    if (!canvasRef.current || !isInitializedRef.current) return;

    const canvas = canvasRef.current;
    const currentDesigns = designsByView[activeView];

    // Update or add designs
    currentDesigns.forEach((design) => {
      const existingObject = designRefsMap.current.get(design.id);

      if (existingObject) {
        // Update existing design
        existingObject.set({
          left: design.transform.position.x,
          top: design.transform.position.y,
          scaleX: design.transform.scale,
          scaleY: design.transform.scale,
          angle: design.transform.rotation,
          originX: "center",
          originY: "center",
        });
      } else {
        // Load new design
        fabric.Image.fromURL(design.imageUrl, (img) => {
          if (!canvas || !isInitializedRef.current) return;

          img.set({
            left: design.transform.position.x,
            top: design.transform.position.y,
            scaleX: design.transform.scale,
            scaleY: design.transform.scale,
            angle: design.transform.rotation,
            originX: "center",
            originY: "center",
          });

          designRefsMap.current.set(design.id, img);
          canvas.add(img);

          if (design.id === activeDesignId) {
            canvas.setActiveObject(img);
          }
        });
      }
    });

    canvas.renderAll();
  }, [designsByView, activeView]);

  // Handle object modifications
  useEffect(() => {
    if (!canvasRef.current || !isInitializedRef.current) return;

    const canvas = canvasRef.current;

    const handleObjectModified = (e: fabric.IEvent) => {
      const obj = e.target;
      if (!obj) return;

      // Find the corresponding design ID
      let modifiedDesignId: string | null = null;
      designRefsMap.current.forEach((fabricObj, designId) => {
        if (fabricObj === obj) {
          modifiedDesignId = designId;
        }
      });

      if (!modifiedDesignId) return;

      const updatedTransform = {
        position: {
          x: obj.left || 0,
          y: obj.top || 0,
        },
        scale: obj.scaleX || 1,
        rotation: obj.angle || 0,
      };

      updateDesignTransform(modifiedDesignId, updatedTransform);
    };

    // Add event listeners
    canvas.on("object:modified", handleObjectModified);
    canvas.on("object:moving", handleObjectModified);
    canvas.on("object:scaling", handleObjectModified);
    canvas.on("object:rotating", handleObjectModified);

    return () => {
      canvas.off("object:modified", handleObjectModified);
      canvas.off("object:moving", handleObjectModified);
      canvas.off("object:scaling", handleObjectModified);
      canvas.off("object:rotating", handleObjectModified);
    };
  }, [updateDesignTransform]);

  // Enhanced cleanup
  useEffect(() => {
    return () => {
      if (canvasRef.current) {
        saveDesignStates(); // Save states before unmounting
        try {
          canvasRef.current.dispose();
        } catch (error) {
          console.error("Error disposing canvas:", error);
        }
        canvasRef.current = null;
      }
      mockupRef.current = null;
      designRefsMap.current.clear();
      isInitializedRef.current = false;
      previousViewRef.current = null;
    };
  }, []);

  return { initCanvas, canvasRef };
};
