import { useColorModeValue } from "@chakra-ui/react";
import dayjs from "dayjs";
import { number } from "joi";
import { useEffect, useRef } from "react";
import { RiArchiveDrawerLine } from "react-icons/ri";

const breakPointConfig = [
  {
    num: 5,
    unitTime: 12000,
    unitPx: 35,
  },
  {
    num: 10,
    unitTime: 6000,
    unitPx: 35,
  },
  {
    num: 5,
    unitTime: 2400,
    unitPx: 35,
  },
  {
    num: 10,
    unitTime: 1200,
    unitPx: 35,
  },
  {
    num: 5,
    unitTime: 480,
    unitPx: 35,
  },
  {
    num: 10,
    unitTime: 240,
    unitPx: 35,
  },
  {
    num: 5,
    unitTime: 96,
    unitPx: 35,
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

  const canvasHeight = 80;
  const canvasWidth = 12000;
  const mainRulerHeight = 25;
  const mainRulerWidth = 4.6;
  const subRulerHeight = 18;
  const subRulerWidth = 3;

  const bgColor = useColorModeValue("white", "black");
  const textColor = useColorModeValue("black", "white");
  const mainRulerColor = useColorModeValue("black", "white");
  const subRulerColor = useColorModeValue("black", "white");

  const startTime = 0;
  const endTime = 1000 * 10;

  const currentBreakPoint = getBreakPoint(endTime - startTime);
  const unitSize = Math.round(
    (12000 * breakPointConfig[currentBreakPoint].unitTime) /
      (endTime - startTime)
  );

  const formatNumber = (mili: number) => {
    return dayjs.duration(mili).format("mm:ss:SSS").substring(0, 9);
  };

  const render = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    let currentTime = startTime;
    for (let x = 0; x < ctx.canvas.width; x += unitSize * 5) {
      drawLine(
        ctx,
        [x, canvasHeight - mainRulerHeight],
        [x, canvasHeight],
        mainRulerColor,
        mainRulerWidth
      );
      ctx.font = "34px Consolas";
      ctx.fillStyle = textColor;
      ctx.fillText(formatNumber(currentTime), x - 90, 38);
      currentTime +=
        breakPointConfig[currentBreakPoint].unitTime *
        breakPointConfig[currentBreakPoint].num;
    }
    for (let x = 0; x < ctx.canvas.width; x += unitSize) {
      drawLine(
        ctx,
        [x, canvasHeight - subRulerHeight],
        [x, canvasHeight],
        subRulerColor,
        subRulerWidth
      );
    }
    drawLine(
      ctx,
      [0, canvasHeight],
      [ctx.canvas.width, canvasHeight],
      "red",
      8
    );
  };

  useEffect(() => {
    const handleResize = () => {
      const ctx = canvasRef.current?.getContext("2d", { alpha: false });
      if (!ctx) return;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      render(ctx);
    };
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="canvas"
      height={`${canvasHeight}px`}
      width={`${canvasWidth}px`}
      style={{
        position: "absolute",
        transformOrigin: "left top",
        transform: "scale(0.5)",
      }}
    >
      브라우저가 HTML5 canvas를 지원하지 않아 Timeline을 불러올 수 없습니다.
    </canvas>
  );
}
