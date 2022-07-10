import { Box, Text } from "@chakra-ui/react";
import { SRTContent } from "@younginch/subtitle";
import { useContext } from "react";
import { TimeLineContext } from "../../pages/editor";

type contentArray = {
  uuid: string;
  content: SRTContent;
};

type TimelineBoxesProps = {
  contents: contentArray[];
};

export default function TimeLineBoxes({ contents }: TimelineBoxesProps) {
  const { leftTime, rightTime } = useContext(TimeLineContext);

  return (
    <Box w="100%" position="absolute" mt="50px" zIndex={10}>
      {contents.map((item) => (
        <Box key={item.uuid}>
          <Text>{item.content.toText()}</Text>
        </Box>
      ))}
    </Box>
  );
}
