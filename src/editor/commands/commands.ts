import { Design, ViewType, Transform } from "../types/editor.types";
import { EditorCommand, BatchCommand } from "../types/command.types";
import { nanoid } from "nanoid";

export class ColorChangeCommand implements EditorCommand {
  private previousColor: string;
  timestamp: number;

  constructor(
    private newColor: string,
    private setGarmentColor: (color: string) => void,
    previousColor: string
  ) {
    this.previousColor = previousColor;
    this.timestamp = Date.now();
  }

  execute() {
    this.setGarmentColor(this.newColor);
  }

  undo() {
    this.setGarmentColor(this.previousColor);
  }

  get description() {
    return `Change Color: ${this.previousColor} → ${this.newColor}`;
  }
}

export class ViewChangeCommand implements EditorCommand {
  private previousView: ViewType;
  timestamp: number;

  constructor(
    private newView: ViewType,
    private setActiveView: (view: ViewType) => void,
    previousView: ViewType
  ) {
    this.previousView = previousView;
    this.timestamp = Date.now();
  }

  execute() {
    this.setActiveView(this.newView);
  }

  undo() {
    this.setActiveView(this.previousView);
  }

  get description() {
    return `Change View: ${this.previousView} → ${this.newView}`;
  }
}

export class CompositeCommand implements BatchCommand {
  commands: EditorCommand[];
  timestamp: number;
  batchId: string;

  constructor(commands: EditorCommand[], description?: string) {
    this.commands = commands;
    this.timestamp = Date.now();
    this.batchId = nanoid();
    this._description = description;
  }

  private _description?: string;

  execute() {
    this.commands.forEach((command) => command.execute());
  }

  undo() {
    // Undo in reverse order
    for (let i = this.commands.length - 1; i >= 0; i--) {
      this.commands[i].undo();
    }
  }

  get description() {
    return (
      this._description || `Batch Operation (${this.commands.length} actions)`
    );
  }
}
