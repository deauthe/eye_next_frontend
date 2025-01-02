import { Design, Transform } from "../types/editor.types";
import { EditorCommand } from "../types/command.types";
import { useEditor } from "../store/editorStore";

export class TransformCommand implements EditorCommand {
  private previousTransform: Transform;
  timestamp: number;

  constructor(
    private design: Design,
    private updateTransform: (transform: Partial<Transform>) => void,
    private newTransformValues: Partial<Transform>
  ) {
    // Store the complete current transform before changes
    this.previousTransform = { ...design.transform };
    this.timestamp = Date.now();
  }

  execute() {
    // Merge new transform values with existing ones
    const updatedTransform = {
      ...this.previousTransform,
      ...this.newTransformValues,
    };
    this.updateTransform(updatedTransform);
  }

  undo() {
    this.updateTransform(this.previousTransform);
  }

  get description() {
    const type = Object.keys(this.newTransformValues)[0];
    return `Transform Design: ${type}`;
  }
}

export class UploadDesignCommand implements EditorCommand {
  private previousDesign: Design | null;

  constructor(
    private newDesign: Design,
    private setDesign: (design: Design | null) => void,
    previousDesign: Design | null
  ) {
    this.previousDesign = previousDesign;
  }

  execute() {
    this.setDesign(this.newDesign);
  }

  undo() {
    this.setDesign(this.previousDesign);
  }

  get description() {
    return "Upload Design";
  }
}

export class AddDesignCommand implements EditorCommand {
  timestamp: number;

  constructor(
    private design: Design,
    private addDesign: (design: Design) => void
  ) {
    this.timestamp = Date.now();
  }

  execute() {
    this.addDesign(this.design);
  }

  undo() {
    // This will be handled by the removeDesign command
    useEditor.getState().removeDesign(this.design.id);
  }

  get description() {
    return "Add Design";
  }
}
