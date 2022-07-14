import { Button, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { PageOptions } from "../../utils/types";

export default function SignOut() {
  const bgColor = useColorModeValue("white", "gray.700");
  return (
    <Stack alignItems="center" justifyContent="center" w="100%" h="60vh">
      <Stack
        w="400px"
        alignItems="center"
        bg={bgColor}
        borderRadius="15px"
        boxShadow="2xl"
        p="40px 25px 30px 25px"
        spacing="15px"
      >
        <BsFillDoorOpenFill size="100px" />
        <Text fontSize="20px">정말 로그아웃하실 건가요?</Text>
        <Button
          onClick={() => {
            signOut();
          }}
          colorScheme="red"
        >
          로그아웃
        </Button>
      </Stack>
    </Stack>
  );
}

SignOut.options = {
  auth: true,
  hideTitle: true,
} as PageOptions;
