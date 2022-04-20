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
  Stack,
  Text,
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
                <Stack>
                  <Text>{session.user?.email}</Text>
                  <Link href={`/user/${session.user.id}?tab=request`} passHref>
                    <Button>내 자막 요청</Button>
                  </Link>
                  <Link href={`/user/${session.user.id}?tab=sub`} passHref>
                    <Button>내 영상 자막</Button>
                  </Link>
                  <Link href={`/user/${session.user.id}?tab=file`} passHref>
                    <Button>내 자막 파일</Button>
                  </Link>
                </Stack>
              </PopoverBody>
              <PopoverFooter>
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    signOut();
                  }}
                >
                  Sign Out
                </Button>
              </PopoverFooter>
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
