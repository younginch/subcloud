import { Box, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { EditorContext } from "../../pages/editor";

export default function TimeLineBoxes() {
  const { contents, leftTime, rightTime } = useContext(EditorContext);

  return (
    <Box w="100%" position="absolute" mt="50px" zIndex={10}>
      {contents.map((item) => {
        if (
          item.content.endTime <= leftTime ||
          item.content.startTime >= rightTime
        ) {
          return;
        }
        console.log({
          a: item.content.startTime - leftTime,
          b: rightTime - leftTime,
        });
        return (
          <Box
            key={item.uuid}
            position="absolute"
            left={`${
              ((item.content.startTime - leftTime) / (rightTime - leftTime)) *
              6000
            }px`}
            w={`${
              ((item.content.endTime - item.content.startTime) /
                (rightTime - leftTime)) *
              6000
            }px`}
            h="60px"
            borderWidth="1px"
            borderRadius="6px"
            padding="3px"
            overflow="hidden"
          >
            <Text>{item.content.toText()}</Text>
          </Box>
        );
      })}
    </Box>
  );
}
