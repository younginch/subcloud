import { Heading, Stack, Center } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import OAuthButtonGroup from "../../components/signin/oAuthButtonGroup";
import { PageOptions } from "../../utils/types";

export default function SignIn() {
  const { t } = useTranslation("auth");
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/user/my");
    }
  }, [router, status]);

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
