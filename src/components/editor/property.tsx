import { WarningIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { v4 as uuid } from "uuid";
import { EditorContext } from "../../utils/editorCore";

function PropertyContainer({ children }: { children: React.ReactNode }) {
  const headerBg = useColorModeValue("gray.100", "#181818");
  const bodyBg = useColorModeValue("transparent", "#222222");

  return (
    <Stack bg={bodyBg} h="100%">
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
      <Stack p="0px 15px 0px 15px">{children}</Stack>
    </Stack>
  );
}

export default function Property() {
  const { contents, focusedIndex, commandHandlers } = useContext(EditorContext);

  if (contents[focusedIndex] === undefined) {
    return (
      <PropertyContainer>
        <Text>선택된 자막이 없습니다.</Text>
      </PropertyContainer>
    );
  }

  const duration =
    (contents[focusedIndex].endTime - contents[focusedIndex].startTime) / 1000;
  const wordCount = contents[focusedIndex]
    .toText()
    .split(" ")
    .filter((str: string) => str !== "").length;

  const errors = [];
  const durationTooShort = duration < 0.7;
  const readingRateSoFast = wordCount / duration > 5;
  const { textArray } = contents[focusedIndex];
  if (durationTooShort) {
    errors.push("Duration is too short.");
  }
  if (readingRateSoFast) {
    errors.push("Reading rate shouldn't exceed 5 words / sec.");
  }
  if (contents[focusedIndex].toText().trim() === "") {
    errors.push("Text is empty.");
  }
  if (textArray.length > 3) {
    errors.push("Text should be less than 4 lines.");
  }
  if (textArray.filter((line) => line.length > 70).length > 0) {
    errors.push("Each line should not exceed 70 characters");
  }

  return (
    <PropertyContainer>
      <HStack>
        <Text>{`지속 시간: ${duration}초`}</Text>
        {durationTooShort && <WarningIcon color="red.500" />}
      </HStack>
      <Text>{`단어 수: ${wordCount}자`}</Text>
      <HStack>
        <Text>{`초당 단어 수: ${(wordCount / duration).toFixed(3)}`}</Text>
        {readingRateSoFast && <WarningIcon color="red.500" />}
      </HStack>
      <Stack>
        {errors.map((error) => (
          <Text color="red.400" key={uuid()}>
            {error}
          </Text>
        ))}
      </Stack>
      <Button onClick={commandHandlers.GOTO_TIMELINE}>
        타임라인 위치로 이동
      </Button>
    </PropertyContainer>
  );
}
