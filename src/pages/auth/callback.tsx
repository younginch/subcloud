import { useEffect } from "react";

export default function Callback() {
  useEffect(() => {
    setTimeout(() => {
      window.open("", "_parent", "");
      window.close();
    }, 5000);
  }, []);

  return <>외부 프로그램 여는 중 - 5초 후에 창이 닫힙니다.</>;
}
