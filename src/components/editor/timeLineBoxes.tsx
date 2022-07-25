/* eslint-disable no-param-reassign */
import { Box, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { SRTContent } from "@younginch/subtitle";
import { useContext } from "react";
import { DraggableData, Rnd } from "react-rnd";
import { v4 as uuid } from "uuid";
import { EditTimeAction, MoveTimeAction } from "../../utils/editorActions";
import { EditorContext } from "../../utils/editorCore";

type TimeLineBoxProps = {
  item: SRTContent;
  index: number;
};

function TimeLineBox({ item, index }: TimeLineBoxProps) {
  const { contents, execute, leftTime, rightTime, focusedIndex } =
    useContext(EditorContext);
  const normalColor = useColorModeValue("#ffffff", "#333333");
  const focusedColor = useColorModeValue("#f0f0ff", "#444466");
  const resizePositiveColor = useColorModeValue("#ccffcc", "#113311");
  const resizeNegativeColor = useColorModeValue("#ffcccc", "#331111");
  const moveColor = useColorModeValue("#fff0ff", "#111133");

  return (
    <Rnd
      key={uuid()}
      style={{
        position: "absolute",
        borderWidth: "1px",
        borderRadius: "6px",
        overflow: "hidden",
        backgroundColor: index === focusedIndex ? focusedColor : normalColor,
      }}
      default={{
        x: ((item.startTime - leftTime) / (rightTime - leftTime)) * 6000,
        y: 0,
        width:
          ((item.endTime - item.startTime) / (rightTime - leftTime)) * 6000,
        height: "100%",
      }}
      enableResizing={{
        top: false,
        right: true,
        bottom: false,
        left: true,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      dragAxis="x"
      onResize={(_e, direction, ref, delta) => {
        if (delta.width > 0) ref.style.backgroundColor = resizePositiveColor;
        else if (delta.width < 0)
          ref.style.backgroundColor = resizeNegativeColor;
        else ref.style.backgroundColor = normalColor;

        if (direction === "left" && index > 0) {
          const leftLimit =
            ((item.startTime - contents[index - 1].endTime) /
              (rightTime - leftTime)) *
            6000;
          if (delta.width > leftLimit) {
            const newTime =
              contents[index].startTime -
              (leftLimit * (rightTime - leftTime)) / 6000;
            execute(new EditTimeAction(index, "start", newTime));
          }
        } else if (direction === "right" && index + 1 < contents.length) {
          const rightLimit =
            ((contents[index + 1].startTime - item.endTime) /
              (rightTime - leftTime)) *
            6000;
          if (delta.width > rightLimit) {
            const newTime =
              contents[index].endTime +
              (rightLimit * (rightTime - leftTime)) / 6000;
            execute(new EditTimeAction(index, "end", newTime));
          }
        }
      }}
      onResizeStop={(_e, direction, _ref, delta) => {
        if (direction === "left") {
          const newTime =
            contents[index].startTime -
            (delta.width * (rightTime - leftTime)) / 6000;
          execute(new EditTimeAction(index, "start", newTime));
        } else if (direction === "right") {
          const newTime =
            contents[index].endTime +
            (delta.width * (rightTime - leftTime)) / 6000;
          execute(new EditTimeAction(index, "end", newTime));
        }
      }}
      onDragStart={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrag={(_e, data: DraggableData) => {
        const deltaT =
          leftTime + (data.x * (rightTime - leftTime)) / 6000 - item.startTime;
        data.node.style.backgroundColor = moveColor;
        if (index > 0) {
          const leftLimit = item.startTime - contents[index - 1].endTime;
          if (-deltaT > leftLimit) {
            execute(new MoveTimeAction(index, -leftLimit));
          }
        }
        if (index + 1 < contents.length) {
          const rightLimit = contents[index + 1].startTime - item.endTime;
          if (deltaT > rightLimit) {
            execute(new MoveTimeAction(index, rightLimit));
          }
        }
      }}
      onDragStop={(e, data: DraggableData) => {
        e.preventDefault();
        e.stopPropagation();
        const deltaX =
          data.x -
          ((item.startTime - leftTime) / (rightTime - leftTime)) * 6000;
        execute(
          new MoveTimeAction(index, (deltaX * (rightTime - leftTime)) / 6000)
        );
      }}
    >
      <HStack w="100%" h="100%" cursor="move">
        <Box w="7px" h="100%" bg="green.400" m="0px !important" />
        <Text m="0px !important" w="calc(100% - 14px)" textAlign="center">
          {item.toText()}
        </Text>
        <Box w="7px" h="100%" bg="green.400" m="0px !important" />
      </HStack>
    </Rnd>
  );
}

export default function TimeLineBoxes() {
  const { contents, leftTime, rightTime } = useContext(EditorContext);

  return (
    <Box
      w="100%"
      h="calc(100% - 45px)"
      zIndex={10}
      position="relative"
      mt="-38px"
    >
      {contents.map((item, index) => {
        if (
          item.endTime <= leftTime ||
          item.startTime >= rightTime ||
          item.endTime < item.startTime
        ) {
          return;
        }
        // eslint-disable-next-line consistent-return
        return <TimeLineBox key={uuid()} item={item} index={index} />;
      })}
    </Box>
  );
}
