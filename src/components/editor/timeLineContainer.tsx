import { useContext, WheelEvent } from "react";
import { contentArray, TimeLineContext } from "../../pages/editor";
import TimeLine from "./timeLine";
import { Box, Text } from "@chakra-ui/react";

type Props = {
  contents: contentArray[];
};

export default function TimeLineContainer({ contents }: Props) {
  const { leftTime, rightTime, changeLRTime } = useContext(TimeLineContext);

  const handleScroll = (e: WheelEvent<HTMLDivElement>) => {
    const fixedPos = e.screenX + 2000;
    const fixedTime = (fixedPos / 6000) * (rightTime - leftTime) + leftTime;
    let newInterval;
    if (e.deltaY > 0) newInterval = (rightTime - leftTime) * 1.1;
    else newInterval = (rightTime - leftTime) * 0.9;
    if (newInterval > 3600000) return;
    if (newInterval < 5760) return;

    const newLeft = fixedTime - (newInterval * fixedPos) / 6000;
    const newRight = fixedTime + (newInterval * (6000 - fixedPos)) / 6000;
    if (newLeft < 0) changeLRTime(0, newInterval);
    else changeLRTime(newLeft, newRight);
  };

  return (
    <Box
      h="100%"
      w="6000px"
      left="-2000px"
      position="relative"
      overflow="hidden"
      onWheel={handleScroll}
    >
      <TimeLine />
      <Box w="100%" position="absolute" mt="50px">
        {contents.map((item) => (
          <Box key={item.uuid}>{item.content.toText()}</Box>
        ))}
      </Box>
      <Text position="absolute" mt="50px" ml="150px">
        이게 current time thumb
      </Text>
    </Box>
  );
}
