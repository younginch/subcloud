import { Box, useColorModeValue, Text, HStack } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";

export default function EventNotice() {
  const { t } = useTranslation("create");
  return (
    <HStack
      p={1}
      rounded="full"
      fontSize="sm"
      w="max-content"
      bg={useColorModeValue("gray.300", "gray.700")}
      mt="20px !important"
    >
      <Box
        py={1}
        px={2}
        lineHeight={1}
        rounded="full"
        color="white"
        bgGradient="linear(to-l, #0ea5e9,#2563eb)"
      >
        {t("event_front")}
      </Box>
      <HStack spacing={1} alignItems="center" justifyContent="center">
        <Text marginEnd="6px" lineHeight={1}>
          {t("event_back")}
        </Text>
      </HStack>
    </HStack>
  );
}
