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
  Drawer,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import useSWR from "swr";
import relativeTime from "dayjs/plugin/relativeTime";
import useTranslation from "next-translate/useTranslation";
import { NotifyType, Notice, Notification } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";
import Notify from "../notify/notify";
import ProfileModal from "./profileModal";

type NotificationType = {
  id: string;
  notifyType: NotifyType;
  title: string;
  time: string;
  content: string;
  href: string | undefined;
};

export default function ToolBar(): JSX.Element {
  const { data: session, status } = useSession();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const bellColor = useColorModeValue("#6688cc", "#aaaaff");
  const { t } = useTranslation("notify");
  dayjs.extend(relativeTime);
  const { data: notices } = useSWR<
    (Notification & {
      notice: Notice;
    })[]
  >("/api/user/notice");
  const readNotifications: NotificationType[] = [];
  const unreadNotifications: NotificationType[] = [];
  if (notices) {
    for (let i = 0; i < notices.length; i += 1) {
      const notification = notices[i];
      let title = "";
      switch (notification.notice.type) {
        case NotifyType.Announce:
          title = t("notifyType_announce");
          break;
        case NotifyType.Upload:
          title = t("notifyType_newSubtitle");
          break;
        case NotifyType.Review:
          title = t("notifyType_review");
          break;
        case NotifyType.StatusChange:
          title = t("notifyType_statusChange");
          break;
        default:
          title = "";
      }
      const e = {
        id: notification.id,
        notifyType: notification.notice.type,
        title,
        time: dayjs(notification.notice.createdAt).fromNow(),
        content: notification.notice.message ?? "",
        href: notification.notice.url ?? undefined,
      };
      if (notification.checked) {
        readNotifications.push(e);
      } else {
        unreadNotifications.push(e);
      }
    }
  }

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
            onClick={onOpen}
          />
          {unreadNotifications.length > 0 && (
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
              {unreadNotifications.length}
            </Text>
          )}
        </Box>
        <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="lg">
          <DrawerOverlay />
          <Notify
            unreadNotifications={unreadNotifications}
            readNotifications={readNotifications}
          />
        </Drawer>
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
