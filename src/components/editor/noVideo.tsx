import { Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { BiVideoPlus } from "react-icons/bi";

export default function NoVideo() {
  return (
    <Stack
      w="100%"
      h="100%"
      alignItems="center"
      justifyContent="center"
      bg={useColorModeValue("gray.100", "#222222")}
    >
      <BiVideoPlus size="30%" />
      <Text fontSize="20px" fontWeight="bold">
        자막을 편집할 영상 URL을 입력해 주세요
      </Text>
    </Stack>
  );
}
