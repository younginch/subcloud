import { useContext, WheelEvent } from "react";
import { Box } from "@chakra-ui/react";
import Draggable, { DraggableData } from "react-draggable";
import { EditorContext } from "../../utils/editorCore";
import TimeLine from "./timeLine";
import TimeLineBoxes from "./timeLineBoxes";
import TimeLineMarker from "./timeLineMarker";

export default function TimeLineContainer() {
  const { leftTime, rightTime, changeLRTime, duration } =
    useContext(EditorContext);

  const handleScroll = (e: WheelEvent<HTMLDivElement>) => {
    const mouseRatio = e.screenX / window.screen.width;
    let zoom = 1;
    zoom = 1 + e.deltaY / 1000;
    let left =
      ((mouseRatio - mouseRatio * zoom - zoom) * (rightTime - leftTime) +
        (rightTime + 2 * leftTime)) /
      3;
    let right =
      ((mouseRatio - mouseRatio * zoom + 2 * zoom) * (rightTime - leftTime) +
        (rightTime + 2 * leftTime)) /
      3;
    const timeRange = right - left;

    if (timeRange >= duration * 3) {
      left = -duration;
      right = duration * 2;
    } else if (left + timeRange / 3 < 0) {
      left = -timeRange / 3;
      right = (timeRange * 2) / 3;
    } else if (right - timeRange / 3 > duration) {
      right = duration + timeRange / 3;
      left = duration - (timeRange * 2) / 3;
    }

    changeLRTime(left, right);
  };

  const handleStop = (e: any, data: DraggableData) => {
    const mouseRatio = -data.lastX / 6000;
    changeLRTime(
      leftTime + (rightTime - leftTime) * mouseRatio,
      rightTime + (rightTime - leftTime) * mouseRatio
    );
  };

  const leftBound = Math.min(
    (-leftTime * 6000) / (rightTime - leftTime) - 2000,
    0
  );
  const rightBound = Math.min(
    (6000 * (duration - leftTime)) / (rightTime - leftTime) -
      2000 -
      window.innerWidth
  );

  return (
    <Draggable
      axis="x"
      onStop={handleStop}
      bounds={{ left: -rightBound, right: -leftBound }}
      position={{ x: 0, y: 0 }}
    >
      <Box
        h="100%"
        w="6000px"
        left="-2000px"
        position="relative"
        overflow="hidden"
        onWheel={handleScroll}
      >
        <TimeLine />
        <TimeLineBoxes />
        <TimeLineMarker />
      </Box>
    </Draggable>
  );
}
