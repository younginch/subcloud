import { Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { RefObject } from "react";
import { BiVideoPlus } from "react-icons/bi";

type Props = {
  urlRef: RefObject<HTMLInputElement>;
};

export default function NoVideo({ urlRef }: Props) {
  return (
    <Stack
      w="100%"
      h="100%"
      alignItems="center"
      justifyContent="center"
      bg={useColorModeValue("gray.100", "#222222")}
      onClick={() => urlRef.current?.focus()}
    >
      <BiVideoPlus size="30%" />
      <Text fontSize="20px" fontWeight="bold">
        자막을 편집할 영상 URL을 입력해 주세요
      </Text>
    </Stack>
  );
}
