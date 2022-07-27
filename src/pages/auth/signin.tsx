import { Heading, Stack, Center } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import OAuthButtonGroup from "../../components/signin/oAuthButtonGroup";
import { PageOptions } from "../../utils/types";

export default function SignIn() {
  const { t } = useTranslation("auth");

  return (
    <Stack
      w="100vw"
      h="calc(100vh - 53px)"
      borderRadius="12px"
      alignItems="center"
      position="relative"
    >
      <Stack alignItems="center" w="400px" maxW="80vw" mt="16vh" spacing="1vh">
        <Center mb="4vh">
          <Heading size={{ base: "lg", lg: "xl" }}>{t("login_title")}</Heading>
        </Center>
        <OAuthButtonGroup />
      </Stack>
    </Stack>
  );
}

SignIn.options = {
  auth: false,
  hideHeader: true,
  hideTitle: true,
} as PageOptions;
