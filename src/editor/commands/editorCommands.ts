import { Design, Transform } from "../types/editor.types";
import { EditorCommand } from "../types/command.types";
import { useEditor } from "../store/editorStore";

export class TransformCommand implements EditorCommand {
  private previousTransform: Transform;
  timestamp: number;

  constructor(
    private designId: string,
    private newTransform: Partial<Transform>,
    private previousState: Transform
  ) {
    this.previousTransform = { ...previousState };
    this.timestamp = Date.now();
  }

  execute() {
    useEditor
      .getState()
      .updateDesignTransform(this.designId, this.newTransform);
  }

  undo() {
    useEditor
      .getState()
      .updateDesignTransform(this.designId, this.previousTransform);
  }

  get description() {
    return `Transform Design`;
  }
}

export class UpdateDesignCommand implements EditorCommand {
  private previousState: Partial<Design>;
  timestamp: number;

  constructor(
    private designId: string,
    private updates: Partial<Design>,
    previousState: Partial<Design>
  ) {
    this.previousState = { ...previousState };
    this.timestamp = Date.now();
  }

  execute() {
    useEditor.getState().updateDesignProperties(this.designId, this.updates);
  }

  undo() {
    useEditor
      .getState()
      .updateDesignProperties(this.designId, this.previousState);
  }

  get description() {
    return `Update Design Properties`;
  }
}

export class RemoveDesignCommand implements EditorCommand {
  private designData: Design;
  timestamp: number;

  constructor(private designId: string, designData: Design) {
    this.designData = { ...designData };
    this.timestamp = Date.now();
  }

  execute() {
    useEditor.getState().removeDesign(this.designId);
  }

  undo() {
    useEditor.getState().addDesign(this.designData);
  }

  get description() {
    return `Remove Design`;
  }
}
