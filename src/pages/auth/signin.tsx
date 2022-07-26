import {
  Heading,
  HStack,
  Stack,
  Center,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import OAuthButtonGroup from "../../components/signin/oAuthButtonGroup";
import { PageOptions } from "../../utils/types";
import { SubcloudIcon } from "../../components/icons/customIcons";

export default function SignIn() {
  const [isPc] = useMediaQuery("(min-width: 850px)");

  return (
    <Stack
      w="100vw"
      h="calc(100vh - 53px)"
      borderRadius="12px"
      alignItems="center"
      position="relative"
    >
      <Stack alignItems="center" w="400px" maxW="80vw" mt="16vh">
        <Center mb="4vh">
          <Heading size="lg">SubCloud에 로그인</Heading>
        </Center>
        <OAuthButtonGroup />
      </Stack>
      <HStack
        position="absolute"
        bottom="0"
        bg="#7f90ad"
        w="100vw"
        justifyContent="center"
      >
        <SubcloudIcon size={isPc ? 100 : 50} fill="gray.200" />
        <Heading fontSize={isPc ? "40px" : "20px"} color="white">
          무료 자막은 SubCloud에서
        </Heading>
      </HStack>
    </Stack>
  );
}

SignIn.options = {
  auth: false,
  hideHeader: true,
  hideTitle: true,
} as PageOptions;
