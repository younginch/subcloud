import { BellIcon } from "@chakra-ui/icons";
import {
  Stack,
  Text,
  HStack,
  Divider,
  Spacer,
  useColorModeValue,
  DrawerHeader,
  DrawerContent,
  DrawerBody,
} from "@chakra-ui/react";
import { NotifyType, Notice, Notification } from "@prisma/client";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useTranslation from "next-translate/useTranslation";
import { FiBox } from "react-icons/fi";
import useSWR from "swr";
import NotifyCard from "./notifyCard";

type NotificationType = {
  id: string;
  notifyType: NotifyType;
  title: string;
  time: string;
  content: string;
  href: string | undefined;
};

export default function Notify() {
  const { t } = useTranslation("notify");
  dayjs.extend(relativeTime);
  const titleColor = useColorModeValue("gray.600", "gray.300");
  const { data: notices, mutate } = useSWR<
    (Notification & {
      notice: Notice;
    })[]
  >("/api/user/notice");
  const readNotifications: NotificationType[] = [];
  const unreadNotifications: NotificationType[] = [];
  const deleteItem = (id: string) => {
    axios.delete(`/api/user/notice`, { data: { id } }).then(() => {
      mutate();
    });
  };
  const changeItem = (id: string) => {
    axios.patch(`/api/user/notice`, { id }).then(() => {
      mutate();
    });
  };
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

  if (unreadNotifications.length === 0 && readNotifications.length === 0) {
    return (
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">{t("notification")}</DrawerHeader>
        <DrawerBody>
          <Stack alignItems="center" spacing={5} h="100%" pt="20%">
            <FiBox size={150} />
            <Text fontSize="25px">{t("no_review")}</Text>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    );
  }

  return (
    <DrawerContent>
      <DrawerHeader borderBottomWidth="1px">{t("notification")}</DrawerHeader>
      <DrawerBody>
        <Stack pt="20px">
          <HStack w="100%">
            <BellIcon w="30px" h="30px" color="red.200" />
            <Text fontWeight="bold" fontSize={{ base: "17px", sm: "23px" }}>
              {t("unchecked_title")} ({unreadNotifications.length})
            </Text>
            <Spacer />
            <Text
              fontSize={{ base: "12px", sm: "16px" }}
              textAlign="center"
              color={titleColor}
            >
              {t("detail")}
            </Text>
          </HStack>
          <Stack
            w="100%"
            spacing="20px"
            alignItems="center"
            mt="30px !important"
          >
            {unreadNotifications.map((notify) => (
              <NotifyCard
                key={notify.id}
                id={notify.id}
                notifyType={notify.notifyType}
                title={notify.title}
                time={notify.time}
                content={notify.content}
                href={notify.href}
                onRemove={() => changeItem(notify.id)}
              />
            ))}
          </Stack>
          <Divider
            w="100%"
            mt="30px !important"
            mb="10px !important"
            h="3px"
            borderColor="gray.400"
            bgColor="gray.400"
          />
          <HStack w="100%">
            <BellIcon w="30px" h="30px" />
            <Text fontWeight="bold" fontSize={{ base: "17px", sm: "23px" }}>
              {t("checked_title")} ({readNotifications.length})
            </Text>
          </HStack>
          <Stack
            w="100%"
            spacing="20px"
            alignItems="center"
            mt="30px !important"
          >
            {readNotifications.map((notify) => (
              <NotifyCard
                key={notify.id}
                id={notify.id}
                notifyType={notify.notifyType}
                title={notify.title}
                time={notify.time}
                content={notify.content}
                href={notify.href}
                onRemove={() => deleteItem(notify.id)}
              />
            ))}
          </Stack>
        </Stack>
      </DrawerBody>
    </DrawerContent>
  );
}
