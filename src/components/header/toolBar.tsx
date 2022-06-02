import {
  Avatar,
  Button,
  HStack,
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
  ButtonProps,
  Flex,
  useColorMode,
} from "@chakra-ui/react";
import { Role } from "@prisma/client";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
type Props = {
  isLarge: boolean;
};

export default function ToolBar({ isLarge }: Props): JSX.Element {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <>
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
                </Stack>
              </PopoverBody>
              <PopoverFooter>
                <HStack>
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Sign Out
                  </Button>
                  {session?.user.role === Role.Admin ||
                  process.env.NODE_ENV !== "production" ? (
                    <Button
                      onClick={async () => {
                        if (process.env.NODE_ENV !== "production") {
                          await axios.patch("/api/user/debug", {
                            id: session.user.id,
                          });
                        }
                        router.push("/admin");
                      }}
                    >
                      Admin
                    </Button>
                  ) : (
                    <></>
                  )}
                </HStack>
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
