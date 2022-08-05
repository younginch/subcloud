import { WarningIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React, { useContext } from "react";
import { v4 as uuid } from "uuid";
import { EditorContext } from "../../utils/editorCore";

function PropertyContainer({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation("editor");
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
        {t("property")}
      </Heading>
      <Stack p="0px 15px 0px 15px">{children}</Stack>
    </Stack>
  );
}

export default function Property() {
  const { t } = useTranslation("editor");
  const { contents, focusedIndex, commandHandlers } = useContext(EditorContext);

  if (contents[focusedIndex] === undefined) {
    return (
      <PropertyContainer>
        <Text>{t("property_noSub")}</Text>
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
    errors.push(t("property_duration_short"));
  }
  if (readingRateSoFast) {
    errors.push(t("property_duration_short"));
  }
  if (contents[focusedIndex].toText().trim() === "") {
    errors.push(t("property_empty"));
  }
  if (textArray.length > 3) {
    errors.push(t("property_less"));
  }
  if (textArray.filter((line) => line.length > 70).length > 0) {
    errors.push(t("property_character"));
  }

  return (
    <PropertyContainer>
      <HStack>
        <Text>
          {t("property_duration")}: {duration}
          {t("property_sec")}
        </Text>
        {durationTooShort && <WarningIcon color="red.500" />}
      </HStack>
      <Text>{`${t("property_tot_word")}: ${wordCount}${t(
        "property_word_unit"
      )}`}</Text>
      <HStack>
        <Text>{`${t("property_sec_word")}: ${(wordCount / duration).toFixed(
          3
        )}`}</Text>
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
        {t("property_timeLine")}
      </Button>
    </PropertyContainer>
  );
}
