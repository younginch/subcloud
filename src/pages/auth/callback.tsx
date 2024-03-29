import { CheckCircleIcon } from "@chakra-ui/icons";
import { Text, Heading, Stack } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { PageOptions } from "../../utils/types";

export default function Callback() {
  const { t } = useTranslation("auth");
  return (
    <Stack alignItems="center">
      <CheckCircleIcon w={20} h={20} color="green.400" mt="20vh" />
      <Heading mt="5vh !important">{t("login_callback_title")}</Heading>
      <Text mt="2vh !important" fontSize="20px">
        {t("login_callback_message")}
      </Text>
    </Stack>
  );
}

Callback.options = { auth: true, hideTitle: true } as PageOptions;
