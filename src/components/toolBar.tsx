import {
  Avatar,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import SelectTheme from "./selectTheme";
import SelectTranslation from "./selectTranslation";

type Props = {
  isLarge: boolean;
};

export default function ToolBar({ isLarge }: Props): JSX.Element {
  const { data: session, status } = useSession();

  return (
    <>
      <SelectTranslation isLarge={isLarge} />
      <SelectTheme isLarge={isLarge} />
      {status === "authenticated" ? (
        <Popover>
          <PopoverTrigger>
            <Avatar size="sm" />
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Signed in as {session.user?.name}</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    signOut();
                  }}
                >
                  Sign Out
                </Button>
              </PopoverBody>
              <PopoverFooter>This is the footer</PopoverFooter>
            </PopoverContent>
          </Portal>
        </Popover>
      ) : (
        <>
          <Button
            onClick={() => {
              signIn();
            }}
          >
            Sign In
          </Button>
        </>
      )}
    </>
  );
}
