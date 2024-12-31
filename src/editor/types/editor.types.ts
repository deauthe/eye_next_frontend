export type ViewType = "front" | "back" | "shoulder";

export interface Position {
  x: number;
  y: number;
}

export interface Transform {
  position: Position;
  scale: number;
  rotation: number;
}

export interface Design {
  id: string;
  imageUrl: string;
  transform: Transform;
  originalSize?: {
    width: number;
    height: number;
  };
}

export interface DesignsByView {
  front: Design[];
  back: Design[];
  shoulder: Design[];
  [key: string]: Design[];
}

export interface EditorState {
  activeView: ViewType;
  garmentColor: string;
  garmentType: "tshirt" | "hoodie" | "sweatshirt";
  designsByView: DesignsByView;
  activeDesignId: string | null;
  isDragging: boolean;
  isEditing: boolean;
}
