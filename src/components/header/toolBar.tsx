import { BellIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ProfileModal from "./profileModal";

export default function ToolBar(): JSX.Element {
  const { data: session, status } = useSession();
  const notifyCount = 0;
  const bellColor = useColorModeValue("#6688cc", "#aaaaff");
  const router = useRouter();

  if (status === "authenticated") {
    return (
      <>
        <Box w="fit-content" h="fit-content" position="relative">
          <BellIcon
            color={bellColor}
            w="32px"
            h="32px"
            mr="10px !important"
            cursor="pointer"
            onClick={() => {
              router.push("/user/my/notify");
            }}
          />
          {notifyCount > 0 && (
            <Text
              bg="red"
              fontSize="12px"
              borderRadius="6px"
              position="absolute"
              pl="3px"
              pr="3px"
              ml="15px"
              mt="-36px"
              color="white"
              textAlign="center"
            >
              10
            </Text>
          )}
        </Box>
        <Popover placement="bottom-start">
          <PopoverTrigger>
            <Avatar size="sm" src={session.user.image ?? undefined} />
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverCloseButton />
              <PopoverBody p={0}>
                <Stack p={0}>
                  <ProfileModal />
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </>
    );
  }

  return (
    <Button
      variant="solid"
      onClick={() => {
        signIn();
      }}
    >
      Sign In
    </Button>
  );
}
