/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
import { SRTContent } from "@younginch/subtitle";

export class CreateAction implements EditorAction {
  index!: number;

  after!: SRTContent;

  constructor(index: number, after: SRTContent) {
    this.index = index;
    this.after = after;
  }

  execute(contents: SRTContent[]): SRTContent[] {
    return [
      ...contents.slice(0, this.index),
      this.after,
      ...contents.slice(this.index),
    ];
  }

  undo(contents: SRTContent[]): SRTContent[] {
    return [
      ...contents.slice(0, this.index),
      ...contents.slice(this.index + 1),
    ];
  }
}

export class EditTimeAction implements EditorAction {
  index!: number;

  type!: "start" | "end";

  before!: number;

  after!: number;

  constructor(index: number, type: "start" | "end", after: number) {
    this.index = index;
    this.type = type;
    this.after = after;
  }

  execute(contents: SRTContent[]): SRTContent[] {
    this.before = contents[this.index][`${this.type}Time`];
    const newContents = [...contents];
    newContents[this.index][`${this.type}Time`] = this.after;
    return newContents;
  }

  undo(contents: SRTContent[]): SRTContent[] {
    const newContents = [...contents];
    newContents[this.index][`${this.type}Time`] = this.before;
    return newContents;
  }
}

export class MoveTimeAction implements EditorAction {
  index!: number;

  delta!: number;

  constructor(index: number, delta: number) {
    this.index = index;
    this.delta = delta;
  }

  execute(contents: SRTContent[]): SRTContent[] {
    const newContents = [...contents];
    newContents[this.index].startTime += this.delta;
    newContents[this.index].endTime += this.delta;
    return newContents;
  }

  undo(contents: SRTContent[]): SRTContent[] {
    const newContents = [...contents];
    newContents[this.index].startTime -= this.delta;
    newContents[this.index].endTime -= this.delta;
    return newContents;
  }
}

export class EditContentAction implements EditorAction {
  index!: number;

  before!: string[];

  after!: string[];

  constructor(index: number, textArray: string[]) {
    this.index = index;
    this.after = textArray;
  }

  execute(contents: SRTContent[]): SRTContent[] {
    this.before = contents[this.index].textArray;
    const newContents = [...contents];
    newContents[this.index].textArray = this.after;
    return newContents;
  }

  undo(contents: SRTContent[]): SRTContent[] {
    const newContents = [...contents];
    newContents[this.index].textArray = this.before;
    return newContents;
  }
}

export class DeleteAction implements EditorAction {
  index!: number;

  before!: SRTContent;

  constructor(index: number) {
    this.index = index;
  }

  execute(contents: SRTContent[]): SRTContent[] {
    this.before = contents[this.index];
    return [
      ...contents.slice(0, this.index),
      ...contents.slice(this.index + 1),
    ];
  }

  undo(contents: SRTContent[]): SRTContent[] {
    return [
      ...contents.slice(0, this.index),
      this.before,
      ...contents.slice(this.index),
    ];
  }
}

export class DeleteAllAction implements EditorAction {
  before!: SRTContent[];

  execute(contents: SRTContent[]): SRTContent[] {
    this.before = contents;
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  undo(contents: SRTContent[]): SRTContent[] {
    return this.before;
  }
}

export default interface EditorAction {
  execute(contents: SRTContent[]): SRTContent[];
  undo(contents: SRTContent[]): SRTContent[];
}
