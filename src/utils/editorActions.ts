/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
import { SRTContent } from "@younginch/subtitle";

export class CreateAction implements EditorAction {
  index!: number;

  after!: SRTContent;

  execute(): void {
    throw new Error("Method not implemented.");
  }

  undo(): void {
    throw new Error("Method not implemented.");
  }
}

export class EditTimeAction implements EditorAction {
  index!: number;

  type!: "START" | "END";

  before!: number;

  after!: number;

  execute(): void {
    throw new Error("Method not implemented.");
  }

  undo(): void {
    throw new Error("Method not implemented.");
  }
}

export class EditContentAction implements EditorAction {
  index!: number;

  before!: string[];

  after!: string[];

  execute(): void {
    throw new Error("Method not implemented.");
  }

  undo(): void {
    throw new Error("Method not implemented.");
  }
}

export class DeleteAction implements EditorAction {
  index!: number;

  before!: SRTContent;

  execute(): void {
    throw new Error("Method not implemented.");
  }

  undo(): void {
    throw new Error("Method not implemented.");
  }
}

export default interface EditorAction {
  execute(): void;
  undo(): void;
}
