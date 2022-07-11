import { Box, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { EditorContext } from "../../pages/editor";

export default function TimeLineBoxes() {
  const { contents } = useContext(EditorContext);

  return (
    <Box w="100%" position="absolute" mt="50px" zIndex={10}>
      {contents.map((item) => (
        <Box key={item.uuid} left={2000}>
          <Text>{item.content.toText()}</Text>
        </Box>
      ))}
    </Box>
  );
}
