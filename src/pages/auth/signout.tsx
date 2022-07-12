import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { PageOptions } from "../../utils/types";

export default function SignOut() {
  return (
    <>
      <Button
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </Button>
    </>
  );
}

SignOut.options = {
  auth: true,
} as PageOptions;
