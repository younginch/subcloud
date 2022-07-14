import { Box, useColorModeValue, Text, Icon, HStack } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { GoChevronRight } from "react-icons/go";

export default function EventNotice() {
  const { t } = useTranslation("requestSub");
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
        <Text lineHeight={1}>{t("event_back")}</Text>
        <Icon as={GoChevronRight} w={4} h={4} />
      </HStack>
    </HStack>
  );
}
