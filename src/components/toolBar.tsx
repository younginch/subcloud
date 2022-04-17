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
import Link from "next/link";
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
            <Avatar size="sm" src={session.user.image ?? undefined} />
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Signed in as {session.user?.name}</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Link href="/video/create?next=request" passHref>
                  <Button>New request</Button>
                </Link>
                <Link href="/video/create?next=sub" passHref>
                  <Button>New subtitle</Button>
                </Link>
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
            variant="solid"
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
