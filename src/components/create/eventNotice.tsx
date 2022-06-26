import { Box, useColorModeValue, Text, Icon, HStack } from "@chakra-ui/react";
import { GoChevronRight } from "react-icons/go";

export default function EventNotice() {
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
        What{"'"}s new?
      </Box>
      <HStack spacing={1} alignItems="center" justifyContent="center">
        <Text lineHeight={1}>Upload subtitles and get reward!</Text>
        <Icon as={GoChevronRight} w={4} h={4} />
      </HStack>
    </HStack>
  );
}
