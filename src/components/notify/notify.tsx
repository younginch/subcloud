import { BellIcon } from "@chakra-ui/icons";
import {
  Stack,
  Text,
  HStack,
  Divider,
  Spacer,
  DrawerHeader,
  DrawerContent,
  DrawerBody,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { mutate } from "swr";
import useTranslation from "next-translate/useTranslation";
import { FiBox } from "react-icons/fi";
import { NotifyType } from "@prisma/client";
import NotifyCard from "./notifyCard";

type NotificationType = {
  id: string;
  notifyType: NotifyType;
  title: string;
  time: string;
  content: string;
  href: string | undefined;
};

type Props = {
  unreadNotifications: NotificationType[];
  readNotifications: NotificationType[];
};

export default function Notify({
  unreadNotifications,
  readNotifications,
}: Props) {
  const titleColor = useColorModeValue("gray.600", "gray.300");
  const { t } = useTranslation("notify");

  const deleteItem = (id: string) => {
    axios.delete(`/api/user/notice`, { data: { id } }).then(() => {
      mutate("/api/user/notice");
    });
  };
  const changeItem = (id: string) => {
    axios.patch(`/api/user/notice`, { id }).then(() => {
      mutate("/api/user/notice");
    });
  };

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
                isRead={false}
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
                isRead
              />
            ))}
          </Stack>
        </Stack>
      </DrawerBody>
    </DrawerContent>
  );
}
