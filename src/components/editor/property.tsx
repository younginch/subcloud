import { WarningIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import { uuid } from "uuidv4";
import { EditorContext } from "../../pages/editor";

export default function Property() {
  const { contents, focusedIndex } = useContext(EditorContext);

  const headerBg = useColorModeValue("gray.100", "#18161d");

  if (contents[focusedIndex] === undefined) {
    return (
      <Stack p="15px">
        <Text>선택된 자막이 없습니다.</Text>
      </Stack>
    );
  }

  const duration =
    (contents[focusedIndex].endTime - contents[focusedIndex].startTime) / 1000;
  const wordCount = contents[focusedIndex]
    .toText()
    .split(" ")
    .filter(function (str: string) {
      return str != "";
    }).length;

  const errors = [];
  const durationTooShort = duration < 0.7;
  const readingRateSoFast = wordCount / duration > 5;
  if (durationTooShort) {
    errors.push("Duration is too short.");
  }
  if (readingRateSoFast) {
    errors.push("Reading rate shouldn't exceed 5 words / sec.");
  }

  return (
    <Stack>
      <Heading
        fontSize="lg"
        bg={headerBg}
        w="100%"
        borderBottomWidth="2px"
        p="5px"
        textAlign="center"
      >
        자막 속성
      </Heading>
      <Stack p="0px 15px 0px 15px">
        <HStack>
          <Text>{`지속 시간: ${duration}초`}</Text>
          {durationTooShort && <WarningIcon color="red.500" />}
        </HStack>
        <Text>{`단어 수: ${wordCount}자`}</Text>
        <HStack>
          <Text>{`단어수/초: ${(wordCount / duration).toFixed(3)}`}</Text>
          {readingRateSoFast && <WarningIcon color="red.500" />}
        </HStack>
        <Stack>
          {errors.map((error) => {
            return (
              <Text color="red" key={uuid()}>
                {error}
              </Text>
            );
          })}
        </Stack>
        <Button>자막 위치로 이동</Button>
      </Stack>
    </Stack>
  );
}
