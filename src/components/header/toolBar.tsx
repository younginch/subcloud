import {
  Avatar,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import ProfileModal from "./profileModal";

export default function ToolBar(): JSX.Element {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
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
                <ProfileModal />
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
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
