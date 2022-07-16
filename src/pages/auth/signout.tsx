import { Button, Text } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { BsFillDoorOpenFill } from "react-icons/bs";
import Result from "../../components/result";
import { PageOptions } from "../../utils/types";

export default function SignOut() {
  return (
    <Result>
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
    </Result>
  );
}

SignOut.options = {
  auth: true,
  hideTitle: true,
} as PageOptions;
