import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useContext, useEffect, useRef } from "react";
import { EditorContext } from "../../utils/editorCore";

const breakPointConfig = [
  {
    num: 5,
    unitTime: 12000,
    unitPx: 40,
  },
  {
    num: 5,
    unitTime: 6000,
    unitPx: 40,
  },
  {
    num: 5,
    unitTime: 3000,
    unitPx: 40,
  },
  {
    num: 5,
    unitTime: 1500,
    unitPx: 40,
  },
  {
    num: 10,
    unitTime: 750,
    unitPx: 40,
  },
  {
    num: 5,
    unitTime: 300,
    unitPx: 40,
  },
  {
    num: 10,
    unitTime: 150,
    unitPx: 40,
  },
  {
    num: 5,
    unitTime: 60,
    unitPx: 40,
  },
  {
    num: 10,
    unitTime: 30,
    unitPx: 40,
  },
];

function drawLine(
  ctx: CanvasRenderingContext2D,
  begin: [number, number],
  end: [number, number],
  stroke = "black",
  width = 1
) {
  if (stroke) {
    ctx.strokeStyle = stroke;
  }
  if (width) {
    ctx.lineWidth = width;
  }

  ctx.beginPath();
  ctx.moveTo(...begin);
  ctx.lineTo(...end);
  ctx.stroke();
}

function getBreakPoint(intervalSize: number) {
  let index = breakPointConfig.length - 1;
  for (let i = 0; i < breakPointConfig.length; i++) {
    const timeContain =
      (12000 / breakPointConfig[i].unitPx) * breakPointConfig[i].unitTime;
    if (intervalSize > timeContain) {
      index = i - 1;
      break;
    }
  }
  return index < 0 ? 0 : index;
}

export default function TimeLine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { colorMode } = useColorMode();

  const canvasHeight = 80;
  const canvasWidth = 12000;
  const mainRulerHeight = 25;
  const mainRulerWidth = 4.6;
  const subRulerHeight = 18;
  const subRulerWidth = 3;

  const bgColor = useColorModeValue("#dddddd", "#18161d");
  const textColor = useColorModeValue("black", "white");
  const mainRulerColor = useColorModeValue("black", "white");
  const subRulerColor = useColorModeValue("black", "white");

  const { leftTime, rightTime } = useContext(EditorContext);

  const currentBreakPoint = getBreakPoint(rightTime - leftTime);
  const config = breakPointConfig[currentBreakPoint];
  const unitSize = (canvasWidth * config.unitTime) / (rightTime - leftTime);
  const formatNumber = (mili: number) => {
    return dayjs.duration(mili).format("mm:ss:SSS").substring(0, 9);
  };

  const render = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (
      let i = Math.ceil(leftTime / config.unitTime);
      i <= Math.round(rightTime / config.unitTime);
      i++
    ) {
      const x = ((i * config.unitTime - leftTime) * unitSize) / config.unitTime;

      ctx.font = "34px Consolas";
      ctx.fillStyle = textColor;
      if (i % config.num == 0) {
        ctx.fillText(formatNumber(i * config.unitTime), x - 90, 38);
        drawLine(
          ctx,
          [x, canvasHeight - mainRulerHeight],
          [x, canvasHeight],
          mainRulerColor,
          mainRulerWidth
        );
      } else {
        drawLine(
          ctx,
          [x, canvasHeight - subRulerHeight],
          [x, canvasHeight],
          subRulerColor,
          subRulerWidth
        );
      }
    }

    drawLine(
      ctx,
      [0, canvasHeight],
      [ctx.canvas.width, canvasHeight],
      "red",
      8
    );
  };

  const handleResize = () => {
    const ctx = canvasRef.current?.getContext("2d", { alpha: false });
    if (ctx) render(ctx);
  };

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d", { alpha: false });
    if (ctx) render(ctx);
    window.addEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorMode, leftTime, rightTime]);

  return (
    <canvas
      ref={canvasRef}
      className="canvas"
      height={`${canvasHeight}px`}
      width={`${canvasWidth}px`}
      style={{
        transformOrigin: "left top",
        transform: "scale(0.5)",
        cursor: "grab",
      }}
    >
      브라우저가 HTML5 canvas를 지원하지 않아 Timeline을 불러올 수 없습니다.
    </canvas>
  );
}
