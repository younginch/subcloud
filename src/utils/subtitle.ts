import { useEffect, useRef } from "react";

/**
 * 문자 형식의 time을 초 단위로 변환
 * @param  {String} sTime "00:00:34,282" 형식의 string
 * @return {Number}       34.282 형태의 Number(double) data.
 */
function timeParse(sTime: string): number {
  const h = Number(sTime.substring(0, 2));
  const m = Number(sTime.substring(3, 5));
  const s = Number(sTime.substring(6, 8));
  const ms = Number(sTime.substring(9, 12));
  return h * 3600 + m * 60 + s + ms / 1000;
}

function toLineObj(group: string[]) {
  return {
    line: group[1],
    startTime: timeParse(group[2]),
    endTime: timeParse(group[3]),
    text: group[4],
  };
}

export function parseSrt(f: string) {
  const pattern =
    /(\d+)\n([\d:,]+)\s+-{2}\>\s+([\d:,]+)\n([\s\S]*?(?=\n{2}|$))/gm;
  if (typeof f != "string") throw "Sorry, Parser accept string only.";

  const result = [];
  f = f.replace(/\r\n|\r|\n/g, "\n");
  while (true) {
    const matches = pattern.exec(f);
    if (matches === null || matches === undefined) break;
    result.push(toLineObj(matches));
  }
  return result;
}

export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };
    const timerId = setInterval(tick, delay);
    return () => clearInterval(timerId);
  }, [delay]);
}
