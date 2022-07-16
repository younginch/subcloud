import { Button, Text } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import { BsFillDoorOpenFill } from "react-icons/bs";
import Result from "../../components/result";
import { PageOptions } from "../../utils/types";

export default function SignOut() {
  const { t } = useTranslation("auth");
  return (
    <Result>
      <BsFillDoorOpenFill size="100px" />
      <Text fontSize="20px">{t("signout_title")}</Text>
      <Button
        onClick={() => {
          signOut();
        }}
        colorScheme="red"
      >
        {t("signout_button")}
      </Button>
    </Result>
  );
}

SignOut.options = {
  auth: true,
  hideTitle: true,
} as PageOptions;
