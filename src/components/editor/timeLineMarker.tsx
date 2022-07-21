import { Box, createIcon, useInterval } from "@chakra-ui/react";
import { useContext, useEffect, useRef } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import {
  EditorContext,
  PlayerState,
  makeLeftAnimation,
} from "../../utils/editorCore";

export const TimeLineMarkerSVG = createIcon({
  displayName: "SubCloud Logo ",
  viewBox: "4 4 56 920",
  path: (
    <g
      xmlns="http://www.w3.org/2000/svg"
      clipPath="url(#clip0)"
      transform="translate(-2314 -907)"
    >
      <path
        d="M2373 910 2373 949 2345 977 2317 949 2317 910Z"
        fill="#FF0000"
        fillRule="evenodd"
        fillOpacity="1"
      />
      <rect
        x="2337"
        y="962"
        width="15.9998"
        height="920"
        fill="#FF0000"
        fillOpacity="1"
      />
    </g>
  ),
});

export default function TimeLineMarker() {
  const {
    leftTime,
    rightTime,
    changeLRTime,
    getPlayerTime,
    setPlayerTime,
    state,
    setState,
    forceRerender,
    duration,
  } = useContext(EditorContext);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.style.marginLeft = `0px`;
  }, [state, forceRerender]);

  const initialLeft =
    ((getPlayerTime() - leftTime) / (rightTime - leftTime)) * 6000;

  const animation = makeLeftAnimation(
    initialLeft,
    state === PlayerState.PLAYING ? 6000 : initialLeft,
    state === PlayerState.PLAYING
      ? (rightTime - getPlayerTime()) / 1000
      : 10000000
  );

  const onDragStart = (e: DraggableEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setState(PlayerState.PAUSED);
  };

  const onDragStop = (e: DraggableEvent, data: DraggableData) => {
    const { x } = data;

    e.stopPropagation();
    e.preventDefault();
    setPlayerTime(getPlayerTime() + (x * (rightTime - leftTime)) / 6000);

    let marginLeft = 0;
    if (data.node.style.marginLeft) {
      const marginLeftStr = data.node.style.marginLeft;
      marginLeft = Number(marginLeftStr.substring(0, marginLeftStr.length - 2));
    }
    if (ref.current) ref.current.style.marginLeft = `${marginLeft + x}px`;
  };

  // Swipe all when the timeline bar reaches the end of the screen
  useInterval(() => {
    if (
      state === PlayerState.PLAYING &&
      (6000 * (getPlayerTime() - leftTime)) / (rightTime - leftTime) - 2000 >
        window.screen.width
    ) {
      let deltaTime = (window.screen.width / 6000) * (rightTime - leftTime);
      const maxTime =
        duration +
        ((rightTime - leftTime) * (4000 - window.screen.width)) / 6000;
      deltaTime = Math.min(deltaTime, maxTime - rightTime);
      changeLRTime(leftTime + deltaTime, rightTime + deltaTime);
    }
  }, 30);

  return (
    <Draggable
      axis="x"
      onStart={onDragStart}
      onStop={onDragStop}
      position={{ x: -8, y: 0 }}
    >
      <Box
        top="26px"
        zIndex={12}
        animation={animation}
        transform="translateX(-50%)"
        cursor="ew-resize"
        position="absolute"
        ref={ref}
      >
        <TimeLineMarkerSVG h="200px" />
      </Box>
    </Draggable>
  );
}
