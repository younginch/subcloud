import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

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
