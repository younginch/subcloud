import { Box, HStack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { DraggableData, Rnd } from "react-rnd";
import { uuid } from "uuidv4";
import { EditorContext } from "../../pages/editor";

export default function TimeLineBoxes() {
  const { contents, setContents, leftTime, rightTime, focusedIndex } =
    useContext(EditorContext);

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
        return (
          <Rnd
            key={uuid()}
            style={{
              position: "absolute",
              borderWidth: "1px",
              borderRadius: "6px",
              overflow: "hidden",
            }}
            default={{
              x: ((item.startTime - leftTime) / (rightTime - leftTime)) * 6000,
              y: 0,
              width:
                ((item.endTime - item.startTime) / (rightTime - leftTime)) *
                6000,
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
            onResizeStop={(e, direction, ref, delta, position) => {
              if (direction === "left") {
                const newContents = [...contents];
                newContents[index].startTime -=
                  (delta.width * (rightTime - leftTime)) / 6000;
                setContents(newContents);
              } else if (direction === "right") {
                const newContents = [...contents];
                newContents[index].endTime +=
                  (delta.width * (rightTime - leftTime)) / 6000;
                setContents(newContents);
              }
            }}
            onDragStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDragStop={(e, data: DraggableData) => {
              e.preventDefault();
              e.stopPropagation();
              const newContents = [...contents];
              const deltaX =
                data.x -
                ((item.startTime - leftTime) / (rightTime - leftTime)) * 6000;
              newContents[index].endTime +=
                (deltaX * (rightTime - leftTime)) / 6000;
              newContents[index].startTime +=
                (deltaX * (rightTime - leftTime)) / 6000;
              setContents(newContents);
            }}
          >
            <HStack
              w="100%"
              h="100%"
              cursor="move"
              color={focusedIndex === index ? "white" : undefined}
            >
              <Box w="7px" h="100%" bg="red.400" m="0px !important" />
              <Text m="0px !important" w="calc(100% - 14px)" textAlign="center">
                {focusedIndex === index ? "Focused" : index + 1}
                {item.toText()}
              </Text>
              <Box w="7px" h="100%" bg="green.400" m="0px !important" />
            </HStack>
          </Rnd>
        );
      })}
    </Box>
  );
}
