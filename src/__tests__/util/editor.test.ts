import { SRTContent } from "@younginch/subtitle";
import { checkOccupation, findPosition } from "../../utils/editorCore";
import { testRes } from "../../utils/jest";

describe("/utils/editorCore", () => {
  it("checkOccupation return -1 if time is NaN", () => {
    const res = checkOccupation([], NaN);
    expect(res).toEqual(-1);
  });

  it("checkOccupation return -1 if no occupation", () => {
    const res = checkOccupation([], 0);
    expect(res).toEqual(-1);
  });

  it("checkOccupation return 0 if occupied by 0", () => {
    const res = checkOccupation(
      [new SRTContent("", "00:00:00,000 --> 00:00:10,000", [])],
      5000
    );
    expect(res).toEqual(0);
  });

  it("findPosition return -1 if time is NaN", () => {
    const res = findPosition([], NaN);
    expect(res).toEqual(-1);
  });

  it("findPosition return 0 if contents is empty", () => {
    const res = findPosition([], 0);
    expect(res).toEqual(0);
  });

  it("findPosition return 0", () => {
    const res = findPosition(
      [new SRTContent("", "00:00:05,000 --> 00:00:10,000", [])],
      1000
    );
    expect(res).toEqual(0);
  });

  it("findPosition return end", () => {
    const res = findPosition(
      [new SRTContent("", "00:00:05,000 --> 00:00:10,000", [])],
      20000
    );
    expect(res).toEqual(1);
  });

  it("findPosition return between two subtitle", () => {
    const res = findPosition(
      [
        new SRTContent("", "00:00:05,000 --> 00:00:10,000", []),
        new SRTContent("", "00:00:15,000 --> 00:00:20,000", []),
      ],
      12500
    );
    expect(res).toEqual(1);
  });
});
