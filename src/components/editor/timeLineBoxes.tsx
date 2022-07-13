import { Box, HStack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { EditorContext } from "../../pages/editor";

export default function TimeLineBoxes() {
  const { contents, leftTime, rightTime } = useContext(EditorContext);

  return (
    <Box w="100%" position="absolute" mt="50px" zIndex={10}>
      {contents.map((item) => {
        if (
          item.content.endTime * 1000 <= leftTime ||
          item.content.startTime * 1000 >= rightTime
        ) {
          return;
        }
        console.log({
          a: item.content.startTime * 1000 - leftTime,
          b: rightTime - leftTime,
        });
        return (
          <Box
            key={item.uuid}
            position="absolute"
            left={`${
              ((item.content.startTime * 1000 - leftTime) /
                (rightTime - leftTime)) *
              6000
            }px`}
            w={`${
              ((item.content.endTime * 1000 - item.content.startTime * 1000) /
                (rightTime - leftTime)) *
              6000
            }px`}
            h="60px"
            borderWidth="1px"
            borderRadius="6px"
            overflow="hidden"
          >
            <HStack w="100%" h="100%" cursor="move">
              <Box
                w="7px"
                h="100%"
                bg="red.400"
                m="0px !important"
                cursor="ew-resize"
              />
              <Text m="0px !important" w="calc(100% - 14px)">
                {item.content.toText()}
              </Text>
              <Box
                w="7px"
                h="100%"
                bg="green.400"
                m="0px !important"
                cursor="ew-resize"
              />
            </HStack>
          </Box>
        );
      })}
    </Box>
  );
}
