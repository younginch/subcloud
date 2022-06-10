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
  Spacer,
} from "@chakra-ui/react";
import { Role } from "@prisma/client";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import ProfileModal from "./profileModal";
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
              <PopoverCloseButton />
              <PopoverBody p={0}>
                <Stack p={0}>
                  <ProfileModal
                    profileImageUrl={session.user.image ?? undefined}
                    userName={session.user?.name}
                    userEmail={session.user?.email}
                    userId={session.user.id}
                  >
                    <HStack mt={4}>
                      <Button
                        colorScheme="blue"
                        onClick={() => {
                          signOut();
                        }}
                      >
                        Sign Out
                      </Button>
                      <Spacer />
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
                  </ProfileModal>
                </Stack>
              </PopoverBody>
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
