import { number } from "joi";
import { useEffect, useRef } from "react";
import { RiArchiveDrawerLine } from "react-icons/ri";

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

export default function TimeLine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasHeight = 50;
  const mainRulerHeight = 20;
  const mainRulerWidth = 2.3;
  const subRulerHeight = 12;
  const subRulerWidth = 1.5;

  const formatNumber = (num: number) => {
    if (num < 10) return "0" + num;
    else return num;
  };
  const render = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "red";
    for (let x = 0; x < ctx.canvas.width; x += 100) {
      drawLine(
        ctx,
        [x, canvasHeight - mainRulerHeight],
        [x, canvasHeight],
        "white",
        mainRulerWidth
      );
      ctx.font = "16px Consolas";
      ctx.fillStyle = "white";
      ctx.fillText(
        `00:${formatNumber(Math.floor(x / 500))}:${formatNumber(
          (x % 500) / 5
        )}`,
        x - 35,
        19
      );
    }
    for (let x = 0; x < ctx.canvas.width; x += 20) {
      drawLine(
        ctx,
        [x, canvasHeight - subRulerHeight],
        [x, canvasHeight],
        "white",
        subRulerWidth
      );
    }
    drawLine(
      ctx,
      [0, canvasHeight],
      [ctx.canvas.width, canvasHeight],
      "red",
      4
    );
  };

  useEffect(() => {
    const handleResize = () => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      ctx.canvas.height = canvasHeight;
      ctx.canvas.width = window.innerWidth;
      render(ctx);
    };
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="canvas"
      style={{
        position: "absolute",
        height: `${canvasHeight}px`,
        width: "100%",
      }}
    />
  );
}
