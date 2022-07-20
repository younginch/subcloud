import { keyframes } from "@chakra-ui/react";
import { SRTContent } from "@younginch/subtitle";

export function checkOccupation(contents: SRTContent[], time: number): number {
  if (isNaN(time)) return -1;
  for (let i = 0; i < contents.length; i++) {
    if (contents[i].startTime <= time && contents[i].endTime >= time) return i;
  }

  return -1;
}

export function findPosition(contents: SRTContent[], time: number): number {
  if (isNaN(time)) return -1;

  if (contents.length === 0) return 0;
  if (time < contents[0].startTime) return 0;
  if (time > contents[contents.length - 1].endTime) return contents.length;
  for (let i = 0; i < contents.length - 1; i++) {
    if (contents[i].endTime < time && contents[i + 1].startTime > time)
      return i + 1;
  }
  return -1;
}

export function makeLeftAnimation(
  left: number,
  right: number,
  time: number
): string {
  const changeLeft = keyframes`
  0% {
    left: ${left}px;
  }
  100% {
    left: ${right}px;
  }
  `;
  return `${time}s ${changeLeft} linear`;
}
